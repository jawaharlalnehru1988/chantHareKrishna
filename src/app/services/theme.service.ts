import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'theme-ocean' | 'theme-sunset' | 'theme-forest' | 'theme-cyberpunk' | 'theme-royal' | 'theme-midnight';

export interface ThemeOption {
  key: ThemeType;
  name: string;
  description: string;
  emoji: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<ThemeType>('theme-ocean');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  public themes: ThemeOption[] = [
    {
      key: 'theme-ocean',
      name: 'Ocean Breeze',
      description: 'Calm ocean blues and purples',
      emoji: '🌊'
    },
    {
      key: 'theme-sunset',
      name: 'Sunset Vibes',
      description: 'Warm sunset colors',
      emoji: '🌅'
    },
    {
      key: 'theme-forest',
      name: 'Forest Mystic',
      description: 'Nature greens and blues',
      emoji: '🌲'
    },
    {
      key: 'theme-cyberpunk',
      name: 'Cyberpunk Neon',
      description: 'Digital green matrix style',
      emoji: '🔮'
    },
    {
      key: 'theme-royal',
      name: 'Royal Purple',
      description: 'Elegant purple and gold',
      emoji: '👑'
    },
    {
      key: 'theme-midnight',
      name: 'Midnight Blue',
      description: 'Deep blues and grays',
      emoji: '🌙'
    }
  ];

  constructor() {
    // Load saved theme from localStorage
    this.loadTheme();
  }

  getCurrentTheme(): ThemeType {
    return this.currentThemeSubject.value;
  }

  setTheme(theme: ThemeType): void {
    // Remove previous theme classes from body
    this.themes.forEach(t => {
      document.body.classList.remove(t.key);
    });
    
    // Add new theme class to body
    document.body.classList.add(theme);
    
    // Update subject
    this.currentThemeSubject.next(theme);
    
    // Save to localStorage
    this.saveTheme(theme);
  }

  private saveTheme(theme: ThemeType): void {
    localStorage.setItem('selected-theme', theme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('selected-theme') as ThemeType;
    if (savedTheme && this.themes.some(t => t.key === savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      // Set default theme
      this.setTheme('theme-ocean');
    }
  }

  getThemeByKey(key: ThemeType): ThemeOption | undefined {
    return this.themes.find(theme => theme.key === key);
  }
}
