import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageType = 'english' | 'tamil' | 'hindi' | 'telugu' | 'kannada' | 'malayalam' | 'marathi' | 'gujarati' | 'bengali' | 'punjabi' | 'urdu';

export interface LanguageOption {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
}

export interface AppContent {
  // Menu items
  chantMenuItem: string;
  prabhupadaMenuItem: string;
  howToChantMenuItem: string;
  articleMenuItem: string;
  benefitsMenuItem: string;
  settingsMenuItem: string;
  
  // Quick actions
  quickActionsLabel: string;
  familyLabel: string;
  friendsLabel: string;
  notesLabel: string;
  workLabel: string;
  travelLabel: string;
  remindersLabel: string;
  
  // App header
  appTitle: string;
  appSubtitle: string;
}

export interface LanguageData {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
  content: AppContent;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<LanguageType>('english');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  // Language data array
  private languageData: LanguageData[] = [
    {
      key: 'english',
      flag: '🇺🇸',
      name: 'English',
      description: 'English',
      content: {
        chantMenuItem: 'Chant',
        prabhupadaMenuItem: 'Prabhupada on Chanting',
        howToChantMenuItem: 'How to Chant',
        articleMenuItem: 'Articles',
        benefitsMenuItem: 'Benefits of Chanting',
        settingsMenuItem: 'Settings',
        quickActionsLabel: 'Quick Actions',
        familyLabel: 'Family',
        friendsLabel: 'Friends',
        notesLabel: 'Notes',
        workLabel: 'Work',
        travelLabel: 'Travel',
        remindersLabel: 'Reminders',
        appTitle: 'Chanting App',
        appSubtitle: 'Hare Krishna 🙏'
      }
    },
    {
      key: 'tamil',
      flag: '🇮🇳',
      name: 'Tamil',
      description: 'தமிழ்',
      content: {
        chantMenuItem: 'ஜபம்',
        prabhupadaMenuItem: 'ஜபத்தில் பிரபுபாதர்',
        howToChantMenuItem: 'எப்படி ஜபிப்பது',
        articleMenuItem: 'கட்டுரைகள்',
        benefitsMenuItem: 'ஜபத்தின் பயன்கள்',
        settingsMenuItem: 'அமைப்புகள்',
        quickActionsLabel: 'விரைவு நடவடிக்கைகள்',
        familyLabel: 'குடும்பம்',
        friendsLabel: 'நண்பர்கள்',
        notesLabel: 'குறிப்புகள்',
        workLabel: 'வேலை',
        travelLabel: 'பயணம்',
        remindersLabel: 'நினைவூட்டல்கள்',
        appTitle: 'ஜப பயன்பாடு',
        appSubtitle: 'ஹரே கிருஷ்ணா 🙏'
      }
    },
    {
      key: 'hindi',
      flag: '🇮🇳',
      name: 'Hindi',
      description: 'हिन्दी',
      content: {
        chantMenuItem: 'जप',
        prabhupadaMenuItem: 'जप पर प्रभुपाद',
        howToChantMenuItem: 'जप कैसे करें',
        articleMenuItem: 'लेख',
        benefitsMenuItem: 'जप के फायदे',
        settingsMenuItem: 'सेटिंग्स',
        quickActionsLabel: 'तत्काल क्रियाएं',
        familyLabel: 'परिवार',
        friendsLabel: 'मित्र',
        notesLabel: 'नोट्स',
        workLabel: 'काम',
        travelLabel: 'यात्रा',
        remindersLabel: 'रिमाइंडर',
        appTitle: 'जप एप्प',
        appSubtitle: 'हरे कृष्ण 🙏'
      }
    }
  ];

  // Language options for dropdown
  public languageOptions: LanguageOption[] = this.languageData.map(lang => ({
    key: lang.key,
    flag: lang.flag,
    name: lang.name,
    description: lang.description
  }));

  // Current content
  public currentContent: AppContent = this.languageData[0].content;

  constructor() {}

  /**
   * Set the current language
   * @param language The language key to set
   */
  setLanguage(language: LanguageType): void {
    const languageData = this.languageData.find(lang => lang.key === language);
    if (languageData) {
      this.currentContent = languageData.content;
      this.currentLanguageSubject.next(language);
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage(): LanguageType {
    return this.currentLanguageSubject.value;
  }

  /**
   * Get content for a specific language
   * @param language The language key
   * @returns The content for the language
   */
  getContent(language: LanguageType): AppContent {
    const languageData = this.languageData.find(lang => lang.key === language);
    return languageData ? languageData.content : this.languageData[0].content;
  }
}
