import { Component, OnInit, OnDestroy, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonCard, 
  IonCardContent, 
  IonSpinner, 
  IonIcon, 
  IonButton,
  IonChip,
  IonLabel,
  IonModal
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  refreshOutline,
  timeOutline,
  personOutline,
  languageOutline,
  eyeOutline,
  documentTextOutline,
  close,
  person,
  language,
  time,
  eye
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { ArticleStateService } from '../services/article-state.service';
import { Article } from '../models/article.interface';
import { LanguageService, LanguageType } from '../services/language.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonIcon,
    IonButton,
    IonChip,
    IonLabel,
    IonModal,
    CommonModule, 
    FormsModule
  ]
})
export class ArticlePage implements OnInit, OnDestroy {
  currentLanguage: LanguageType = 'english';
  
  // Modal properties
  isModalOpen = false;
  selectedArticle: Article | null = null;
  
  // Computed signals for reactive data
  readonly articles = this.articleStateService.articles;
  readonly isLoading = this.articleStateService.isLoading;
  readonly error = this.articleStateService.error;
  readonly hasData = this.articleStateService.hasData;
  
  // Computed filtered articles based on current language
  readonly filteredArticles = computed(() => 
    this.articleStateService.getFilteredArticles(this.currentLanguage)
  );
  
  private subscription: Subscription = new Subscription();

  constructor(
    private articleService: ArticleService,
    private articleStateService: ArticleStateService,
    private languageService: LanguageService
  ) {
    // Add required icons
    addIcons({
      warningOutline,
      refreshOutline,
      timeOutline,
      personOutline,
      languageOutline,
      eyeOutline,
      documentTextOutline,
      close,
      person,
      language,
      time,
      eye
    });
  }

  ngOnInit() {
    // Subscribe to language changes
    const languageSub = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      // The filteredArticles computed signal will automatically update
    });
    this.subscription.add(languageSub);

    // Load articles initially (uses caching)
    this.loadArticles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Load articles from the API or cache
   */
  loadArticles(): void {
    const articlesSub = this.articleService.getArticles().subscribe({
      next: (articles) => {
        // Data is automatically stored in the state service
        console.log(`Loaded ${articles.length} articles`);
      },
      error: (err) => {
        console.error('Error in component:', err);
        // Error is automatically handled in the state service
      }
    });

    this.subscription.add(articlesSub);
  }

  /**
   * Refresh articles (force reload from API)
   */
  refreshArticles(): void {
    const refreshSub = this.articleService.refreshArticles().subscribe({
      next: (articles) => {
        console.log(`Refreshed ${articles.length} articles`);
      },
      error: (err) => {
        console.error('Error refreshing articles:', err);
      }
    });

    this.subscription.add(refreshSub);
  }

  /**
   * Get cache information for debugging/display
   */
  getCacheInfo() {
    return this.articleService.getCacheInfo();
  }

  /**
   * Open article in modal
   * @param article Article to display
   */
  openArticle(article: Article): void {
    this.selectedArticle = article;
    this.isModalOpen = true;
  }

  /**
   * Close the article modal
   */
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedArticle = null;
  }

  /**
   * Format duration in seconds to readable format
   * @param duration Duration in seconds
   * @returns Formatted duration string
   */
  formatDuration(duration: number): string {
    if (duration < 60) {
      return `${duration}s`;
    } else if (duration < 3600) {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    } else {
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration % 3600) / 60);
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  }

  /**
   * Format date to readable format
   * @param dateString ISO date string
   * @returns Formatted date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Get color for language chip based on language
   * @param language Language string
   * @returns Ionic color
   */
  getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'english': 'primary',
      'tamil': 'secondary',
      'hindi': 'tertiary',
      'sanskrit': 'success',
      'bengali': 'warning',
      'gujarati': 'danger',
      'telugu': 'dark',
      'malayalam': 'medium'
    };
    
    return colors[language.toLowerCase()] || 'medium';
  }

  /**
   * Handle image load error
   * @param event Error event
   */
  onImageError(event: any): void {
    // Set a default placeholder image
    event.target.src = 'assets/icon/favicon.png';
  }
}
