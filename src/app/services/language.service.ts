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
    },
    {
      key: 'telugu',
      flag: '🇮🇳',
      name: 'Telugu',
      description: 'తెలుగు',
      content: {
        chantMenuItem: 'జపం',
        prabhupadaMenuItem: 'జపంపై ప్రభుపాద్',
        howToChantMenuItem: 'ఎలా జపించాలి',
        benefitsMenuItem: 'జపం యొక్క ప్రయోజనాలు',
        settingsMenuItem: 'సెట్టింగులు',
        quickActionsLabel: 'త్వరిత చర్యలు',
        familyLabel: 'కుటుంబం',
        friendsLabel: 'స్నేహితులు',
        notesLabel: 'గమనికలు',
        workLabel: 'పని',
        travelLabel: 'ప్రయాణం',
        remindersLabel: 'రిమైండర్లు',
        appTitle: 'జప యాప్',
        appSubtitle: 'హరే కృష్ణ 🙏'
      }
    },
    {
      key: 'kannada',
      flag: '🇮🇳',
      name: 'Kannada',
      description: 'ಕನ್ನಡ',
      content: {
        chantMenuItem: 'ಜಪ',
        prabhupadaMenuItem: 'ಜಪದಲ್ಲಿ ಪ್ರಭುಪಾದ',
        howToChantMenuItem: 'ಹೇಗೆ ಜಪಿಸುವುದು',
        benefitsMenuItem: 'ಜಪದ ಪ್ರಯೋಜನಗಳು',
        settingsMenuItem: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
        quickActionsLabel: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
        familyLabel: 'ಕುಟುಂಬ',
        friendsLabel: 'ಸ್ನೇಹಿತರು',
        notesLabel: 'ಟಿಪ್ಪಣಿಗಳು',
        workLabel: 'ಕೆಲಸ',
        travelLabel: 'ಪ್ರಯಾಣ',
        remindersLabel: 'ಜ್ಞಾಪನೆಗಳು',
        appTitle: 'ಜಪ ಅಪ್ಲಿಕೇಶನ್',
        appSubtitle: 'ಹರೇ ಕೃಷ್ಣ 🙏'
      }
    },
    {
      key: 'malayalam',
      flag: '🇮🇳',
      name: 'Malayalam',
      description: 'മലയാളം',
      content: {
        chantMenuItem: 'ജപം',
        prabhupadaMenuItem: 'ജപത്തിൽ പ്രഭുപാദ്',
        howToChantMenuItem: 'എങ്ങനെ ജപിക്കാം',
        benefitsMenuItem: 'ജപത്തിന്റെ ഗുണങ്ങൾ',
        settingsMenuItem: 'ക്രമീകരണങ്ങൾ',
        quickActionsLabel: 'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ',
        familyLabel: 'കുടുംബം',
        friendsLabel: 'സുഹൃത്തുക്കൾ',
        notesLabel: 'കുറിപ്പുകൾ',
        workLabel: 'ജോലി',
        travelLabel: 'യാത്ര',
        remindersLabel: 'ഓർമ്മപ്പെടുത്തലുകൾ',
        appTitle: 'ജപ ആപ്പ്',
        appSubtitle: 'ഹരേ കൃഷ്ണ 🙏'
      }
    },
    {
      key: 'marathi',
      flag: '🇮🇳',
      name: 'Marathi',
      description: 'मराठी',
      content: {
        chantMenuItem: 'जप',
        prabhupadaMenuItem: 'जपावर प्रभुपाद',
        howToChantMenuItem: 'जप कसा करावा',
        benefitsMenuItem: 'जपाचे फायदे',
        settingsMenuItem: 'सेटिंग्ज',
        quickActionsLabel: 'त्वरित क्रिया',
        familyLabel: 'कुटुंब',
        friendsLabel: 'मित्र',
        notesLabel: 'नोट्स',
        workLabel: 'काम',
        travelLabel: 'प्रवास',
        remindersLabel: 'स्मरणपत्रे',
        appTitle: 'जप अ‍ॅप',
        appSubtitle: 'हरे कृष्ण 🙏'
      }
    },
    {
      key: 'gujarati',
      flag: '🇮🇳',
      name: 'Gujarati',
      description: 'ગુજરાતી',
      content: {
        chantMenuItem: 'જપ',
        prabhupadaMenuItem: 'જપ પર પ્રભુપાદ',
        howToChantMenuItem: 'કેવી રીતે જપ કરવું',
        benefitsMenuItem: 'જપના ફાયદા',
        settingsMenuItem: 'સેટિંગ્સ',
        quickActionsLabel: 'ઝડપી ક્રિયાઓ',
        familyLabel: 'કુટુંબ',
        friendsLabel: 'મિત્રો',
        notesLabel: 'નોંધો',
        workLabel: 'કામ',
        travelLabel: 'પ્રવાસ',
        remindersLabel: 'રીમાઇન્ડર',
        appTitle: 'જપ એપ',
        appSubtitle: 'હરે કૃષ્ણ 🙏'
      }
    },
    {
      key: 'bengali',
      flag: '🇮🇳',
      name: 'Bengali',
      description: 'বাংলা',
      content: {
        chantMenuItem: 'জপ',
        prabhupadaMenuItem: 'জপে প্রভুপাদ',
        howToChantMenuItem: 'কীভাবে জপ করবেন',
        benefitsMenuItem: 'জপের উপকারিতা',
        settingsMenuItem: 'সেটিংস',
        quickActionsLabel: 'দ্রুত ক্রিয়া',
        familyLabel: 'পরিবার',
        friendsLabel: 'বন্ধুরা',
        notesLabel: 'নোট',
        workLabel: 'কাজ',
        travelLabel: 'ভ্রমণ',
        remindersLabel: 'অনুস্মারক',
        appTitle: 'জপ অ্যাপ',
        appSubtitle: 'হরে কৃষ্ণ 🙏'
      }
    },
    {
      key: 'punjabi',
      flag: '🇮🇳',
      name: 'Punjabi',
      description: 'ਪੰਜਾਬੀ',
      content: {
        chantMenuItem: 'ਜਪ',
        prabhupadaMenuItem: 'ਜਪ ਉੱਤੇ ਪ੍ਰਭੁਪਾਦ',
        howToChantMenuItem: 'ਜਪ ਕਿਵੇਂ ਕਰੀਏ',
        benefitsMenuItem: 'ਜਪ ਦੇ ਫਾਇਦੇ',
        settingsMenuItem: 'ਸੈਟਿੰਗਾਂ',
        quickActionsLabel: 'ਤੇਜ਼ ਕਿਰਿਆਵਾਂ',
        familyLabel: 'ਪਰਿਵਾਰ',
        friendsLabel: 'ਦੋਸਤ',
        notesLabel: 'ਨੋਟਸ',
        workLabel: 'ਕੰਮ',
        travelLabel: 'ਯਾਤਰਾ',
        remindersLabel: 'ਯਾਦਦਿਹਾਨੀਆਂ',
        appTitle: 'ਜਪ ਐਪ',
        appSubtitle: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ 🙏'
      }
    },
    {
      key: 'urdu',
      flag: '🇵🇰',
      name: 'Urdu',
      description: 'اردو',
      content: {
        chantMenuItem: 'جاپ',
        prabhupadaMenuItem: 'جاپ پر پرابھوپاد',
        howToChantMenuItem: 'جاپ کیسے کریں',
        benefitsMenuItem: 'جاپ کے فوائد',
        settingsMenuItem: 'سیٹنگز',
        quickActionsLabel: 'فوری اعمال',
        familyLabel: 'خاندان',
        friendsLabel: 'دوست',
        notesLabel: 'نوٹس',
        workLabel: 'کام',
        travelLabel: 'سفر',
        remindersLabel: 'یاد دہانیاں',
        appTitle: 'جاپ ایپ',
        appSubtitle: 'ہرے کرشنا 🙏'
      }
    }
  ];

  constructor() {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') as LanguageType;
    if (savedLanguage && this.isValidLanguage(savedLanguage)) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  // Get all available language options
  get languageOptions(): LanguageOption[] {
    return this.languageData.map(lang => ({
      key: lang.key,
      flag: lang.flag,
      name: lang.name,
      description: lang.description
    }));
  }

  // Get current language
  get currentLanguage(): LanguageType {
    return this.currentLanguageSubject.value;
  }

  // Get current content based on selected language
  get currentContent(): AppContent {
    const currentLang = this.languageData.find(lang => lang.key === this.currentLanguage);
    return currentLang ? currentLang.content : this.languageData[0].content;
  }

  // Set language
  setLanguage(language: LanguageType): void {
    if (this.isValidLanguage(language)) {
      this.currentLanguageSubject.next(language);
      localStorage.setItem('selectedLanguage', language);
    }
  }

  // Check if language is valid
  private isValidLanguage(language: string): language is LanguageType {
    return this.languageData.some(lang => lang.key === language);
  }

  // Get language data by key
  getLanguageData(language: LanguageType): LanguageData | undefined {
    return this.languageData.find(lang => lang.key === language);
  }
}
