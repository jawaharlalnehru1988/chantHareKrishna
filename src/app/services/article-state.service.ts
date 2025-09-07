import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Article } from '../models/article.interface';

export interface ArticleState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;
  hasData: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleStateService {
  private readonly API_URL = 'https://dats-backend.vercel.app/chanting';
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

  // Signal-based state
  private readonly _state = signal<ArticleState>({
    articles: [],
    isLoading: false,
    error: null,
    lastFetched: null,
    hasData: false
  });

  // Computed signals for reactive data access
  readonly articles = computed(() => this._state().articles);
  readonly publishedArticles = computed(() => 
    this._state().articles.filter(article => article.isPublished)
  );
  readonly isLoading = computed(() => this._state().isLoading);
  readonly error = computed(() => this._state().error);
  readonly hasData = computed(() => this._state().hasData);
  readonly lastFetched = computed(() => this._state().lastFetched);

  // Computed signal for articles filtered by language
  readonly getArticlesByLanguage = computed(() => {
    return (language: string) => this.publishedArticles().filter(
      article => article.language.toLowerCase() === language.toLowerCase()
    );
  });

  constructor(private http: HttpClient) {}

  /**
   * Load articles from API or return cached data
   */
  loadArticles(forceRefresh: boolean = false): Observable<Article[]> {
    const currentState = this._state();
    
    // Check if we have cached data and it's still fresh
    if (!forceRefresh && currentState.hasData && this.isCacheValid()) {
      console.log('Using cached articles');
      return of(currentState.articles);
    }

    // Set loading state
    this._state.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));

    return this.http.get<Article[]>(this.API_URL).pipe(
      tap(articles => {
        console.log(`Fetched ${articles.length} articles from API`);
        this._state.update(state => ({
          ...state,
          articles,
          isLoading: false,
          error: null,
          lastFetched: new Date(),
          hasData: true
        }));
      }),
      catchError(error => {
        console.error('Error fetching articles:', error);
        this._state.update(state => ({
          ...state,
          isLoading: false,
          error: 'Failed to load articles. Please check your internet connection and try again.',
          hasData: state.articles.length > 0 // Keep hasData true if we have some cached articles
        }));
        
        // Return cached articles if available, otherwise empty array
        return of(currentState.articles);
      })
    );
  }

  /**
   * Get articles filtered by language
   */
  getFilteredArticles(language: string): Article[] {
    return this.getArticlesByLanguage()(language);
  }

  /**
   * Get article by ID
   */
  getArticleById(id: string): Article | null {
    return this.articles().find(article => article._id === id) || null;
  }

  /**
   * Refresh articles (force reload from API)
   */
  refreshArticles(): Observable<Article[]> {
    return this.loadArticles(true);
  }

  /**
   * Clear cache and reset state
   */
  clearCache(): void {
    this._state.set({
      articles: [],
      isLoading: false,
      error: null,
      lastFetched: null,
      hasData: false
    });
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid(): boolean {
    const lastFetched = this._state().lastFetched;
    if (!lastFetched) return false;
    
    const now = new Date().getTime();
    const cacheTime = lastFetched.getTime();
    const isValid = (now - cacheTime) < this.CACHE_DURATION;
    
    if (!isValid) {
      console.log('Cache expired, will fetch fresh data');
    }
    
    return isValid;
  }

  /**
   * Get cache status information
   */
  getCacheInfo(): { 
    hasCache: boolean; 
    isValid: boolean; 
    articleCount: number;
    lastFetched: Date | null;
    cacheAge?: number;
  } {
    const state = this._state();
    const hasCache = state.hasData;
    const isValid = this.isCacheValid();
    const cacheAge = state.lastFetched ? 
      Math.floor((new Date().getTime() - state.lastFetched.getTime()) / 1000) : 
      undefined;

    return {
      hasCache,
      isValid,
      articleCount: state.articles.length,
      lastFetched: state.lastFetched,
      cacheAge
    };
  }
}
