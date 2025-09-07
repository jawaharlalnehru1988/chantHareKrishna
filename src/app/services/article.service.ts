import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.interface';
import { ArticleStateService } from './article-state.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private articleStateService: ArticleStateService) {}

  /**
   * Get all articles (uses caching via state service)
   * @param forceRefresh Force refresh from API
   * @returns Observable<Article[]>
   */
  getArticles(forceRefresh: boolean = false): Observable<Article[]> {
    return this.articleStateService.loadArticles(forceRefresh);
  }

  /**
   * Get articles filtered by language
   * @param language Language to filter by
   * @returns Article[]
   */
  getArticlesByLanguage(language: string): Article[] {
    return this.articleStateService.getFilteredArticles(language);
  }

  /**
   * Get article by ID from cache
   * @param id Article ID
   * @returns Article | null
   */
  getArticleById(id: string): Article | null {
    return this.articleStateService.getArticleById(id);
  }

  /**
   * Refresh articles from API
   * @returns Observable<Article[]>
   */
  refreshArticles(): Observable<Article[]> {
    return this.articleStateService.refreshArticles();
  }

  /**
   * Get cache information
   */
  getCacheInfo() {
    return this.articleStateService.getCacheInfo();
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.articleStateService.clearCache();
  }
}
