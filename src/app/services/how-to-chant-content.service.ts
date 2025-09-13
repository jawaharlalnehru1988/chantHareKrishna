import { Injectable } from '@angular/core';
import { LanguageType } from './language.service';

export interface ChantGuideContent {
  language: LanguageType;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class HowToChantContentService {

  private contentCache: Map<LanguageType, string> = new Map();

  constructor() { }

  /**
   * Get the chanting guide content for a specific language
   * Uses lazy loading to only load content when needed
   */
  async getContent(language: LanguageType): Promise<string> {
    // Check cache first
    if (this.contentCache.has(language)) {
      return this.contentCache.get(language)!;
    }

    // Load content dynamically
    try {
      const content = await this.loadContent(language);
      this.contentCache.set(language, content);
      return content;
    } catch (error) {
      console.warn(`Failed to load content for ${language}, falling back to English`);
      // Fallback to English if specific language fails
      if (language !== 'english') {
        return this.getContent('english');
      }
      throw error;
    }
  }

  /**
   * Dynamically import content based on language
   * This enables code splitting and lazy loading
   */
  private async loadContent(language: LanguageType): Promise<string> {
    try {
      switch (language) {
        case 'english':
          const englishModule = await import('../content/how-to-chant/english');
          return englishModule.content;
        case 'tamil':
          // Tamil content module not found, fallback to English
          const fallbackModule = await import('../content/how-to-chant/english');
          return fallbackModule.content;
        default:
          // For other languages, fallback to English for now
          // Content can be added later following the same pattern
          const defaultModule = await import('../content/how-to-chant/english');
          return defaultModule.content;
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      // Ultimate fallback - return empty content
      return '<p>Content not available</p>';
    }
  }

  /**
   * Preload content for faster access
   * Can be called during app initialization for frequently used languages
   */
  async preloadContent(languages: LanguageType[]): Promise<void> {
    const promises = languages.map(lang => this.getContent(lang).catch(err => {
      console.warn(`Failed to preload content for ${lang}:`, err);
      return ''; // Return empty string on error
    }));
    // Use Promise.all with error handling instead of allSettled for compatibility
    try {
      await Promise.all(promises);
    } catch (error) {
      console.warn('Some content failed to preload:', error);
    }
  }

  /**
   * Clear content cache to free memory
   */
  clearCache(): void {
    this.contentCache.clear();
  }

  /**
   * Get cache statistics for debugging
   */
  getCacheInfo(): { size: number; languages: LanguageType[] } {
    return {
      size: this.contentCache.size,
      languages: Array.from(this.contentCache.keys())
    };
  }
}