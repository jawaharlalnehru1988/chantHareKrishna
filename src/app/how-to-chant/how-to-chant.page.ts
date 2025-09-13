import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { LanguageService, LanguageType } from '../services/language.service';
import { ThemeService } from '../services/theme.service';
import { HowToChantContentService } from '../services/how-to-chant-content.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-how-to-chant',
  templateUrl: './how-to-chant.page.html',
  styleUrls: ['./how-to-chant.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonMenuButton, IonButtons]
})
export class HowToChantPage implements OnInit, OnDestroy {
  
  // Current language and theme using signals
  currentLanguage: LanguageType = 'english';
  themeClass = signal<string>('');
  currentContent = signal<string>('');
  isLoading = signal<boolean>(true);
  
  // Subscriptions
  private languageSubscription?: Subscription;
  private themeSubscription?: Subscription;

  constructor(
    private languageService: LanguageService, 
    private themeService: ThemeService,
    private contentService: HowToChantContentService
  ) {
    addIcons({ checkmarkCircleOutline, informationCircleOutline });
  }

  async ngOnInit() {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(async (language) => {
      this.currentLanguage = language;
      await this.loadContent();
    });
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass.set(`theme-${theme}`);
    });

    // Load initial content
    await this.loadContent();
  }

  private async loadContent(): Promise<void> {
    try {
      this.isLoading.set(true);
      const content = await this.contentService.getContent(this.currentLanguage);
      this.currentContent.set(content);
    } catch (error) {
      console.error('Failed to load content:', error);
      // Set fallback content
      this.currentContent.set('<p>Failed to load content. Please try again later.</p>');
    } finally {
      this.isLoading.set(false);
    }
  }
  
  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
    this.themeSubscription?.unsubscribe();
  }
  
  // Get current language content
  get currentGuide() {
    return {
      language: this.currentLanguage,
      content: this.currentContent()
    };
  }
}