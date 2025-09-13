import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageType = 'english' | 'tamil' | 'hindi' | 'telugu' | 'kannada' | 'malayalam' | 'marathi' | 'gujarati' | 'bengali' | 'punjabi' | 'urdu' | 'odia' | 'sanskrit' | 'chinese' | 'japanese' | 'spanish' | 'french' | 'german' | 'russian' | 'arabic';

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

  // Chant page content
  pageTitle: string;
  currentRound: string;
  roundsCompleted: string;
  mahaRounds: string;
  progressText: string;
  dailyGoal: string;
  dailyGoalProgress: string;
  chantText: string;
  chantSubtext: string;
  mahamantra1: string;
  mahamantra2: string;
  sriKrishnaCaitanyaMantra: string;
  prabhupadaMantra1: string;
  prabhupadaMantra2: string;
  resetCurrentRoundToast: string;
  resetRoundsCompletedToast: string;
  resetMahaRoundsToast: string;
  resetAllProgressToast: string;
  roundCompleteToast: string;
  mahaRoundCompleteToast: string;
  resetAllConfirmTitle: string;
  resetAllConfirmMessage: string;
  // Sound options translations
  soundOptions: {
    none: { name: string; description: string; };
    tick: { name: string; description: string; };
    prabhupada: { name: string; description: string; };
    continuous: { name: string; description: string; };
  };

  // Progress Tracker translations
  progressTracker: {
    title: string;
    progressOverview: string;
    addEditRecord: string;
    date: string;
    rounds: string;
    roundsCompleted: string;
    selectDate: string;
    selectRounds: string;
    noChantingToday: string;
    oneRound: string;
    multipleRounds: string;
    suggested: string;
    fromTodaysSession: string;
    use: string;
    saveRecord: string;
    updateRecord: string;
    edit: string;
    delete: string;
    viewAllRecords: string;
    progressReports: string;
    streakAchievements: string;
    currentRecord: string;
    autoSynced: string;
    manualEntry: string;
    confirmAction: string;
    
    // Messages
    cannotSelectFutureDates: string;
    enterValidRounds: string;
    cannotSaveFutureData: string;
    recordSavedSuccess: string;
    recordUpdatedSuccess: string;
    usingRoundsFromToday: string;
    noChantingDataToday: string;
    readyToEditRecord: string;
    recordDeletedSuccess: string;
    progressSavedLocally: string;
    
    // Statistics
    totalDays: string;
    totalRounds: string;
    currentStreak: string;
    averageRounds: string;
    bestDay: string;
    consistency: string;
    daysChanted: string;
    
    // Time periods
    today: string;
    thisWeek: string;
    thisMonth: string;
    thisYear: string;
    weekly: string;
    monthly: string;
    yearly: string;
    
    // Actions
    close: string;
    save: string;
    cancel: string;
    export: string;
    share: string;
    
    // Registration
    registration: {
      title: string;
      name: string;
      email: string;
      phoneNumber: string;
      location: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      locationPlaceholder: string;
      register: string;
      alreadyRegistered: string;
      registrationSuccess: string;
      registrationError: string;
    };
    
    // Achievements
    achievements: {
      beginner: string;
      starter: string;
      bronze: string;
      silver: string;
      gold: string;
      diamond: string;
      streakSafe: string;
      streakAtRisk: string;
      nextMilestone: string;
    };
  };
}

export interface LanguageData {
  key: LanguageType;
  flag: string;
  name: string;
  description: string;
  content: AppContent;
}

// Default progress tracker translations (English fallback)
const defaultProgressTracker = {
  title: 'Progress Tracker',
  progressOverview: 'Progress Overview',
  addEditRecord: 'Add/Edit Record',
  date: 'Date',
  rounds: 'Rounds Completed',
  roundsCompleted: 'Rounds Completed',
  selectDate: 'Select Date',
  selectRounds: 'Select rounds',
  noChantingToday: 'No chanting today',
  oneRound: 'round',
  multipleRounds: 'rounds',
  suggested: 'Suggested',
  fromTodaysSession: "From today's chanting session",
  use: 'Use',
  saveRecord: 'Save Record',
  updateRecord: 'Update Record',
  edit: 'Edit',
  delete: 'Delete',
  viewAllRecords: 'View All Records',
  progressReports: 'Progress Reports',
  streakAchievements: 'Streak Achievements',
  currentRecord: 'Current Record',
  autoSynced: 'Auto-synced from chanting session',
  manualEntry: 'Manual entry',
  confirmAction: 'Confirm Action',
  totalDays: 'Total Days',
  totalRounds: 'Total Rounds',
  currentStreak: 'Current Streak',
  averageRounds: 'Avg Rounds',
  bestDay: 'Best Day',
  consistency: 'Consistency',
  daysChanted: 'Days Chanted',
  today: 'Today',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  thisYear: 'This Year',
  weekly: 'Weekly',
  monthly: 'Monthly',
  yearly: 'Yearly',
  close: 'Close',
  save: 'Save',
  cancel: 'Cancel',
  export: 'Export',
  share: 'Share',
  registration: {
    title: 'User Registration',
    name: 'Full Name',
    email: 'Email Address',
    phoneNumber: 'Phone Number',
    location: 'Location',
    namePlaceholder: 'Enter your full name',
    emailPlaceholder: 'Enter your email address',
    phonePlaceholder: 'Enter your phone number',
    locationPlaceholder: 'Enter your location',
    register: 'Register',
    alreadyRegistered: 'Already Registered',
    registrationSuccess: 'Registration successful!',
    registrationError: 'Registration failed. Please try again.'
  },
  achievements: {
    beginner: 'Beginner',
    starter: 'Starter',
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    diamond: 'Diamond',
    streakSafe: 'Streak is safe for today!',
    streakAtRisk: 'Complete your rounds to maintain streak!',
    nextMilestone: 'Next Milestone'
  },
  
  // Messages
  cannotSelectFutureDates: 'Cannot select future dates',
  enterValidRounds: 'Please enter valid rounds (0-128)',
  cannotSaveFutureData: 'Cannot save data for future dates',
  recordSavedSuccess: 'Record saved successfully!',
  recordUpdatedSuccess: 'Record updated successfully!',
  usingRoundsFromToday: 'Using {0} rounds from today\'s chanting',
  noChantingDataToday: 'No chanting data available for today',
  readyToEditRecord: 'Ready to edit record',
  recordDeletedSuccess: 'Record deleted successfully',
  progressSavedLocally: 'Your progress will be saved locally on this browser'
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<LanguageType>('english');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  // Language data array - Complete data with all languages
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
        appSubtitle: 'Hare Krishna 🙏',
        pageTitle: '🕉️ Mahamantra Chanting',
        currentRound: 'Current Round',
        roundsCompleted: 'Rounds Completed',
        mahaRounds: 'Maha Rounds',
        progressText: 'Chants in Current Round',
        dailyGoal: 'Daily Goal (16 Rounds)',
        dailyGoalProgress: 'Rounds Completed',
        chantText: 'Chant',
        chantSubtext: 'Hare Krishna',
        mahamantra1: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare',
        mahamantra2: 'Hare Rama Hare Rama Rama Rama Hare Hare',
        sriKrishnaCaitanyaMantra: 'Jai Sri Krishna Chaitanya prabhu Nithyananda Sri Advaita Gadhadara Sri Vasadi Goura Bhaktha Vrinda',
        prabhupadaMantra1: "Namah om Vishnupadaya Krishna Presthaya Bhootale Srimate Bhaktivedanta Swamin iti Namine",
        prabhupadaMantra2: "Namaste Saraswate Deve Goura Vani Pracharine nirvishesha Shunyavadim Paschatya Desa Tarine",
        resetCurrentRoundToast: '🔄 Current round reset! 🙏',
        resetRoundsCompletedToast: '🔄 Rounds completed reset! 🙏',
        resetMahaRoundsToast: '🔄 Maha rounds reset! 🙏',
        resetAllProgressToast: '🔄 All progress reset successfully! 🙏',
        roundCompleteToast: '🎉 Congratulations! Lord Krishna is pleased with you!! 🙏',
        mahaRoundCompleteToast: '🌟 Congratulations! Sri Prabhupada is pleased with you!! 🙏✨',
        resetAllConfirmTitle: 'Reset All Progress',
        resetAllConfirmMessage: 'Are you sure you want to reset ALL your chanting progress? This will reset Current Round, Rounds Completed, and Maha Rounds. This action cannot be undone.',
        soundOptions: {
          none: { name: 'No Sound', description: 'Silent chanting' },
          tick: { name: 'Tick Sound', description: 'Chant with tick sound' },
          prabhupada: { name: 'Prabhupada', description: 'Chant with Prabhupada' },
          continuous: { name: '108 Continues Chanting', description: 'Continuous Prabhupada chanting until 108' }
        },

        progressTracker: {
          title: 'Progress Tracker',
          progressOverview: 'Progress Overview',
          addEditRecord: 'Add/Edit Record',
          date: 'Date',
          rounds: 'Rounds Completed',
          roundsCompleted: 'Rounds Completed',
          selectDate: 'Select Date',
          selectRounds: 'Select rounds',
          noChantingToday: 'No chanting today',
          oneRound: 'round',
          multipleRounds: 'rounds',
          suggested: 'Suggested',
          fromTodaysSession: "From today's chanting session",
          use: 'Use',
          saveRecord: 'Save Record',
          updateRecord: 'Update Record',
          edit: 'Edit',
          delete: 'Delete',
          viewAllRecords: 'View All Records',
          progressReports: 'Progress Reports',
          streakAchievements: 'Streak Achievements',
          currentRecord: 'Current Record',
          autoSynced: 'Auto-synced from chanting session',
          manualEntry: 'Manual entry',
          confirmAction: 'Confirm Action',
          
          // Statistics
          totalDays: 'Total Days',
          totalRounds: 'Total Rounds',
          currentStreak: 'Current Streak',
          averageRounds: 'Avg Rounds',
          bestDay: 'Best Day',
          consistency: 'Consistency',
          daysChanted: 'Days Chanted',
          
          // Time periods
          today: 'Today',
          thisWeek: 'This Week',
          thisMonth: 'This Month',
          thisYear: 'This Year',
          weekly: 'Weekly',
          monthly: 'Monthly',
          yearly: 'Yearly',
          
          // Actions
          close: 'Close',
          save: 'Save',
          cancel: 'Cancel',
          export: 'Export',
          share: 'Share',
          
          // Registration
          registration: {
            title: 'User Registration',
            name: 'Full Name',
            email: 'Email Address',
            phoneNumber: 'Phone Number',
            location: 'Location',
            namePlaceholder: 'Enter your full name',
            emailPlaceholder: 'Enter your email address',
            phonePlaceholder: 'Enter your phone number',
            locationPlaceholder: 'Enter your location',
            register: 'Register',
            alreadyRegistered: 'Already Registered',
            registrationSuccess: 'Registration successful!',
            registrationError: 'Registration failed. Please try again.'
          },
          
          // Achievements
          achievements: {
            beginner: 'Beginner',
            starter: 'Starter',
            bronze: 'Bronze',
            silver: 'Silver',
            gold: 'Gold',
            diamond: 'Diamond',
            streakSafe: 'Streak is safe for today!',
            streakAtRisk: 'Complete your rounds to maintain streak!',
            nextMilestone: 'Next Milestone'
          },
          
          // Messages
          cannotSelectFutureDates: 'Cannot select future dates',
          enterValidRounds: 'Please enter valid rounds (0-128)',
          cannotSaveFutureData: 'Cannot save data for future dates',
          recordSavedSuccess: 'Record saved successfully!',
          recordUpdatedSuccess: 'Record updated successfully!',
          usingRoundsFromToday: 'Using {0} rounds from today\'s chanting',
          noChantingDataToday: 'No chanting data available for today',
          readyToEditRecord: 'Ready to edit record',
          recordDeletedSuccess: 'Record deleted successfully',
          progressSavedLocally: 'Your progress will be saved locally on this browser'
        }
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
        appSubtitle: 'ஹரே கிருஷ்ணா 🙏',
        pageTitle: '🕉️ மகாமந்திர ஜபம்',
        currentRound: 'தற்போதைய சுற்று',
        roundsCompleted: 'முடிந்த சுற்றுகள்',
        mahaRounds: 'மகா சுற்றுகள்',
        progressText: 'தற்போதைய சுற்றில் ஜபங்கள்',
        dailyGoal: 'தினசரி இலக்கு (16 சுற்றுகள்)',
        dailyGoalProgress: 'சுற்றுகள் முடிந்தது',
        chantText: 'ஜபம்',
        chantSubtext: 'ஹரே கிருஷ்ணா',
        mahamantra1: 'ஹரே கிருஷ்ணா ஹரே கிருஷ்ணா கிருஷ்ணா கிருஷ்ணா ஹரே ஹரே',
        mahamantra2: 'ஹரே ராமா ஹரே ராமா ராமா ராமா ஹரே ஹரே',
        sriKrishnaCaitanyaMantra: 'ஜெய் ஸ்ரீ கிருஷ்ண சைதன்ய பிரபு நித்யானந்த ஸ்ரீ அத்வைத கதாதர ஸ்ரீவாசாதி கௌர பக்த வ்ருந்த',
        prabhupadaMantra1: "நம: ஓம் விஷ்ணுபாதாய கிருஷ்ண ப்ரேஷ்தாய பூதலே ஸ்ரீமதே பக்திவேதாந்த ஸ்வாமின் இதி நாமினே",
        prabhupadaMantra2: "நமஸ்தே ஸாரஸ்வதே தேவே கௌர வாணி ப்ராசாரிணே நிர்விஷேஷ ஸூன்யவாதிம் பாஷ்ஸாத்ய தேஷ தாரிணே",
        resetCurrentRoundToast: '🔄 தற்போதைய சுற்று மீட்டமைக்கப்பட்டது! 🙏',
        resetRoundsCompletedToast: '🔄 முடிந்த சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
        resetMahaRoundsToast: '🔄 மகா சுற்றுகள் மீட்டமைக்கப்பட்டது! 🙏',
        resetAllProgressToast: '🔄 அனைத்து முன்னேற்றமும் வெற்றிகரமாக மீட்டமைக்கப்பட்டது! 🙏',
        roundCompleteToast: '🎉 வாழ்த்துக்கள்! கிருஷ்ண பகவான் உங்களை மகிழ்வித்துள்ளார்!! 🙏',
        mahaRoundCompleteToast: '🌟 வாழ்த்துக்கள்! ஸ்ரீல பிரபுபாதர் உங்களை மகிழ்வித்துள்ளார்!! 🙏✨',
        resetAllConfirmTitle: 'அனைத்து முன்னேற்றத்தையும் மீட்டமை',
        resetAllConfirmMessage: 'உங்கள் அனைத்து ஜப முன்னேற்றத்தையும் மீட்டமைக்க நீங்கள் உறுதியாக இருக்கிறீர்களா? இது தற்போதைய சுற்று, முடிந்த சுற்றுகள் மற்றும் மகா சுற்றுகளை மீட்டமைக்கும். இந்த செயலை செயல்தவிர்க்க முடியாது.',
        soundOptions: {
          none: { name: 'ஒலி இல்லை', description: 'அமைதியான ஜபம்' },
          tick: { name: 'டிக் ஒலி', description: 'டிக் ஒலியுடன் ஜபம்' },
          prabhupada: { name: 'பிரபுபாதர்', description: 'பிரபுபாதருடன் ஜபம்' },
          continuous: { name: '108 தொடர்ச்சியான ஜபம்', description: '108 வரை தொடர்ச்சியான பிரபுபாதர் ஜபம்' }
        },

        progressTracker: {
          title: 'முன்னேற்ற டிராக்கர்',
          progressOverview: 'முன்னேற்ற கண்ணோட்டம்',
          addEditRecord: 'பதிவு சேர்/திருத்து',
          date: 'தேதி',
          rounds: 'முடிந்த சுற்றுகள்',
          roundsCompleted: 'முடிந்த சுற்றுகள்',
          selectDate: 'தேதி தேர்வு செய்',
          selectRounds: 'சுற்றுகள் தேர்வு செய்',
          noChantingToday: 'இன்று ஜபம் இல்லை',
          oneRound: 'சுற்று',
          multipleRounds: 'சுற்றுகள்',
          suggested: 'பரிந்துரை',
          fromTodaysSession: 'இன்றைய ஜப அமர்விலிருந்து',
          use: 'பயன்படுத்து',
          saveRecord: 'பதிவு சேமி',
          updateRecord: 'பதிவு புதுப்பி',
          edit: 'திருத்து',
          delete: 'நீக்கு',
          viewAllRecords: 'எல்லா பதிவுகளும் காண்க',
          progressReports: 'முன்னேற்ற அறிக்கைகள்',
          streakAchievements: 'தொடர் சாதனைகள்',
          currentRecord: 'தற்போதைய பதிவு',
          autoSynced: 'ஜப அமர்விலிருந்து தானாக ஒத்திசைக்கப்பட்டது',
          manualEntry: 'கைமுறை பதிவு',
          confirmAction: 'செயலை உறுதிப்படுத்து',
          
          // Statistics
          totalDays: 'மொத்த நாட்கள்',
          totalRounds: 'மொத்த சுற்றுகள்',
          currentStreak: 'தற்போதைய தொடர்',
          averageRounds: 'சராசரி சுற்றுகள்',
          bestDay: 'சிறந்த நாள்',
          consistency: 'நிலைத்தன்மை',
          daysChanted: 'ஜபித்த நாட்கள்',
          
          // Time periods
          today: 'இன்று',
          thisWeek: 'இந்த வாரம்',
          thisMonth: 'இந்த மாதம்',
          thisYear: 'இந்த ஆண்டு',
          weekly: 'வாராந்திர',
          monthly: 'மாதாந்திர',
          yearly: 'ஆண்டாந்திர',
          
          // Actions
          close: 'மூடு',
          save: 'சேமி',
          cancel: 'ரத்து செய்',
          export: 'ஏற்றுமதி',
          share: 'பகிர்',
          
          // Registration
          registration: {
            title: 'பயனர் பதிவு',
            name: 'முழு பெயர்',
            email: 'மின்னஞ்சல் முகவரி',
            phoneNumber: 'தொலைபேசி எண்',
            location: 'இடம்',
            namePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
            emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
            phonePlaceholder: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
            locationPlaceholder: 'உங்கள் இடத்தை உள்ளிடவும்',
            register: 'பதிவு செய்',
            alreadyRegistered: 'ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது',
            registrationSuccess: 'பதிவு வெற்றிகரமானது!',
            registrationError: 'பதிவு தோல்வி. மீண்டும் முயற்சிக்கவும்.'
          },
          
          // Achievements
          achievements: {
            beginner: 'தொடக்கம்',
            starter: 'ஆரம்பம்',
            bronze: 'வெண்கலம்',
            silver: 'வெள்ளி',
            gold: 'தங்கம்',
            diamond: 'வைரம்',
            streakSafe: 'இன்றைக்கு தொடர் பாதுகாப்பானது!',
            streakAtRisk: 'தொடரை பராமரிக்க உங்கள் சுற்றுகளை முடிக்கவும்!',
            nextMilestone: 'அடுத்த மைல்கல்'
          },
          
          // Messages
          cannotSelectFutureDates: 'எதிர்கால தேதிகளைத் தேர்ந்தெடுக்க முடியாது',
          enterValidRounds: 'தயவுசெய்து சரியான சுற்றுகளை உள்ளிடவும் (0-128)',
          cannotSaveFutureData: 'எதிர்கால தேதிகளுக்கு தரவைச் சேமிக்க முடியாது',
          recordSavedSuccess: 'பதிவு வெற்றிகரமாகச் சேமிக்கப்பட்டது!',
          recordUpdatedSuccess: 'பதிவு வெற்றிகரமாக மேம்படுத்தப்பட்டது!',
          usingRoundsFromToday: 'இன்றைய ஜபத்திலிருந்து {0} சுற்றுகளைப் பயன்படுத்துகிறோம்',
          noChantingDataToday: 'இன்றைய நாளுக்கு ஜப தரவு எதுவும் கிடைக்கவில்லை',
          readyToEditRecord: 'பதிவைத் திருத்தத் தயார்',
          recordDeletedSuccess: 'பதிவு வெற்றிகரமாக நீக்கப்பட்டது',
          progressSavedLocally: 'உங்கள் முன்னேற்றம் இந்த உலாவியில் உள்ளூரில் சேமிக்கப்படும்'
        }
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
        appSubtitle: 'हरे कृष्ण 🙏',
        pageTitle: '🕉️ महामंत्र जप',
        currentRound: 'वर्तमान चक्र',
        roundsCompleted: 'पूर्ण चक्र',
        mahaRounds: 'महा चक्र',
        progressText: 'वर्तमान चक्र में जप',
        dailyGoal: 'दैनिक लक्ष्य (16 चक्र)',
        dailyGoalProgress: 'चक्र पूर्ण',
        chantText: 'जप',
        chantSubtext: 'हरे कृष्ण',
        mahamantra1: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
        mahamantra2: 'हरे राम हरे राम राम राम हरे हरे',
        sriKrishnaCaitanyaMantra: 'जय श्री कृष्ण चैतन्य प्रभु नित्यानंद श्री अद्वैत गदाधर श्रीवासादि गौर भक्त वृंदा',
        prabhupadaMantra1: 'नमः ओं विष्णुपादाय कृष्ण प्रेष्ठाय भूतले श्रीमते भक्तिवेदान्त स्वामिन इति नामिन',
        prabhupadaMantra2: 'नमस्ते सारस्वते देवे गौर वाणी प्रचारिणे निर्विशेष शून्यवादिम पाश्चात्य देश तारिणे',
        resetCurrentRoundToast: '🔄 वर्तमान चक्र रीसेट हो गया! 🙏',
        resetRoundsCompletedToast: '🔄 पूर्ण चक्र रीसेट हो गए! 🙏',
        resetMahaRoundsToast: '🔄 महा चक्र रीसेट हो गए! 🙏',
        resetAllProgressToast: '🔄 सभी प्रगति सफलतापूर्वक रीसेट हो गई! 🙏',
        roundCompleteToast: '🎉 बधाई हो! भगवान कृष्ण आपसे प्रसन्न हैं!! 🙏',
        mahaRoundCompleteToast: '🌟 बधाई हो! श्रील प्रभुपाद आपसे प्रसन्न हैं!! 🙏✨',
        resetAllConfirmTitle: 'सभी प्रगति रीसेट करें',
        resetAllConfirmMessage: 'क्या आप वाकई अपनी सभी जप प्रगति को रीसेट करना चाहते हैं? यह वर्तमान चक्र, पूर्ण चक्र और महा चक्र को रीसेट कर देगा। यह क्रिया पूर्ववत नहीं की जा सकती।',
        soundOptions: {
          none: { name: 'कोई आवाज नहीं', description: 'मौन जप' },
          tick: { name: 'टिक ध्वनि', description: 'टिक ध्वनि के साथ जप' },
          prabhupada: { name: 'प्रभुपाद', description: 'प्रभुपाद के साथ जप' },
          continuous: { name: '108 निरंतर जप', description: '108 तक निरंतर प्रभुपाद जप' }
        },

        progressTracker: {
          title: 'प्रगति ट्रैकर',
          progressOverview: 'प्रगति अवलोकन',
          addEditRecord: 'रिकॉर्ड जोड़ें/संपादित करें',
          date: 'तारीख',
          rounds: 'पूर्ण चक्र',
          roundsCompleted: 'पूर्ण चक्र',
          selectDate: 'तारीख चुनें',
          selectRounds: 'चक्र चुनें',
          noChantingToday: 'आज जप नहीं',
          oneRound: 'चक्र',
          multipleRounds: 'चक्र',
          suggested: 'सुझाव',
          fromTodaysSession: 'आज के जप सत्र से',
          use: 'उपयोग करें',
          saveRecord: 'रिकॉर्ड सहेजें',
          updateRecord: 'रिकॉर्ड अपडेट करें',
          edit: 'संपादित करें',
          delete: 'हटाएं',
          viewAllRecords: 'सभी रिकॉर्ड देखें',
          progressReports: 'प्रगति रिपोर्ट',
          streakAchievements: 'निरंतरता उपलब्धियां',
          currentRecord: 'वर्तमान रिकॉर्ड',
          autoSynced: 'जप सत्र से स्वत: सिंक किया गया',
          manualEntry: 'मैनुअल प्रविष्टि',
          confirmAction: 'क्रिया की पुष्टि करें',
          
          // Statistics
          totalDays: 'कुल दिन',
          totalRounds: 'कुल चक्र',
          currentStreak: 'वर्तमान निरंतरता',
          averageRounds: 'औसत चक्र',
          bestDay: 'सर्वोत्तम दिन',
          consistency: 'निरंतरता',
          daysChanted: 'जप किए गए दिन',
          
          // Time periods
          today: 'आज',
          thisWeek: 'इस सप्ताह',
          thisMonth: 'इस महीने',
          thisYear: 'इस वर्ष',
          weekly: 'साप्ताहिक',
          monthly: 'मासिक',
          yearly: 'वार्षिक',
          
          // Actions
          close: 'बंद करें',
          save: 'सहेजें',
          cancel: 'रद्द करें',
          export: 'निर्यात करें',
          share: 'साझा करें',
          
          // Registration
          registration: {
            title: 'उपयोगकर्ता पंजीकरण',
            name: 'पूरा नाम',
            email: 'ईमेल पता',
            phoneNumber: 'फोन नंबर',
            location: 'स्थान',
            namePlaceholder: 'अपना पूरा नाम दर्ज करें',
            emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
            phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
            locationPlaceholder: 'अपना स्थान दर्ज करें',
            register: 'पंजीकरण करें',
            alreadyRegistered: 'पहले से पंजीकृत',
            registrationSuccess: 'पंजीकरण सफल!',
            registrationError: 'पंजीकरण असफल। कृपया पुनः प्रयास करें।'
          },
          
          // Achievements
          achievements: {
            beginner: 'शुरुआती',
            starter: 'प्रारंभिक',
            bronze: 'कांस्य',
            silver: 'रजत',
            gold: 'स्वर्ण',
            diamond: 'हीरा',
            streakSafe: 'आज के लिए निरंतरता सुरक्षित है!',
            streakAtRisk: 'निरंतरता बनाए रखने के लिए अपने चक्र पूरे करें!',
            nextMilestone: 'अगला मील का पत्थर'
          },
          
          // Messages
          cannotSelectFutureDates: 'भविष्य की तारीखों का चयन नहीं किया जा सकता',
          enterValidRounds: 'कृपया मान्य राउंड दर्ज करें (0-128)',
          cannotSaveFutureData: 'भविष्य की तारीखों के लिए डेटा सहेजा नहीं जा सकता',
          recordSavedSuccess: 'रिकॉर्ड सफलतापूर्वक सहेजा गया!',
          recordUpdatedSuccess: 'रिकॉर्ड सफलतापूर्वक अपडेट किया गया!',
          usingRoundsFromToday: 'आज के जप से {0} राउंड का उपयोग कर रहे हैं',
          noChantingDataToday: 'आज के लिए कोई जप डेटा उपलब्ध नहीं है',
          readyToEditRecord: 'रिकॉर्ड संपादित करने के लिए तैयार',
          recordDeletedSuccess: 'रिकॉर्ड सफलतापूर्वक हटाया गया',
          progressSavedLocally: 'आपकी प्रगति इस ब्राउज़र में स्थानीय रूप से सहेजी जाएगी'
        }
      }
    },
    // Add placeholder entries for other languages - to be completed
    {
      key: 'telugu',
      flag: '🇮🇳',
      name: 'Telugu', 
      description: 'తెలుగు',
      content: {
        // Use English content as default for now - can be translated later
        chantMenuItem: 'జపం',
        prabhupadaMenuItem: 'ప్రభుపాద్‌పై జపం',
        howToChantMenuItem: 'జపం ఎలా చేయాలి',
        articleMenuItem: 'ఆర్టికల్స్',
        benefitsMenuItem: 'జపం యొక్క ప్రయోజనాలు',
        settingsMenuItem: 'సెట్టింగ్స్',
        quickActionsLabel: 'తక్షణ చర్యలు',
        familyLabel: 'కుటుంబం',
        friendsLabel: 'మిత్రులు',
        notesLabel: 'గమనికలు',
        workLabel: 'పని',
        travelLabel: 'ప్రయాణం',
        remindersLabel: 'రిమైండర్లు',
        appTitle: 'జపం యాప్',
        appSubtitle: 'హరే కృష్ణ 🙏',
        pageTitle: '🕉️ మహామంత్ర జపం',
        currentRound: 'ప్రస్తుత చక్రం',
        roundsCompleted: 'పూర్తయిన చక్రాలు',
        mahaRounds: 'మహా చక్రాలు',
        progressText: 'ప్రస్తుత చక్రంలో జపాలు',
        dailyGoal: 'దైనందిన లక్ష్యం (16 చక్రాలు)',
        dailyGoalProgress: 'చక్రాలు పూర్తయింది',
        chantText: 'జపం',
        chantSubtext: 'హరే కృష్ణ',
        mahamantra1: 'హరే కృష్ణ హరే కృష్ణ కృష్ణ కృష్ణ హరే హరే',
        mahamantra2: 'హరే రామ హరే రామ రామ రామ హరే హరే',
        sriKrishnaCaitanyaMantra: 'జై శ్రీ కృష్ణ చైతన్య ప్రభు నిత్యానంద శ్రీ అద్వైత గదాధర శ్రీవాసాది గౌర భక్త వృందా',
        prabhupadaMantra1: 'నమః ఓం విష్ణుపాదాయ కృష్ణ ప్రేష్థాయ భూతలే శ్రీమతే భక్తివేదాంత స్వామిన్ ఇతి నామినే',
        prabhupadaMantra2: 'నమస్తే సారస్వతే దేవే గౌర వాణి ప్రచారిణే నిర్విషేష శూన్యవాదిం పాశ్చాత్య దేశ తారిణే',
        resetCurrentRoundToast: '🔄 ప్రస్తుత చక్రం రీసెట్ అయింది! 🙏',
        resetRoundsCompletedToast: '🔄 పూర్తయిన చక్రాలు రీసెట్ అయ్యాయి! 🙏',
        resetMahaRoundsToast: '🔄 మహా చక్రాలు రీసెట్ అయ్యాయి! 🙏',
        resetAllProgressToast: '🔄 అన్ని ప్రగతి విజయవంతంగా రీసెట్ అయింది! 🙏',
        roundCompleteToast: '🎉 అభినందనలు! శ్రీ కృష్ణ భగవాన్ మీతో సంతోషంగా ఉన్నారు!! 🙏',
        mahaRoundCompleteToast: '🌟 అభినందనలు! శ్రీ ప్రభుపాద్ మీతో సంతోషంగా ఉన్నారు!! 🙏✨',
        resetAllConfirmTitle: 'అన్ని ప్రగతిని రీసెట్ చేయండి',
        resetAllConfirmMessage: 'మీరు మీ అన్ని జప ప్రగతిని రీసెట్ చేయాలనుకుంటున్నారా? ఇది ప్రస్తుత చక్రం, పూర్తయిన చక్రాలు మరియు మహా చక్రాలను రీసెట్ చేస్తుంది. ఈ చర్యను తిరిగి తీసుకోలేము.',
        soundOptions: {
          none: { name: 'శబ్దం లేదు', description: 'నిశ్శబ్ద జపం' },
          tick: { name: 'టిక్ శబ్దం', description: 'టిక్ శబ్దంతో జపం' },
          prabhupada: { name: 'ప్రభుపాద్', description: 'ప్రభుపాద్‌తో జపం' },
          continuous: { name: '108 నిరంతర జపం', description: '108 వరకు నిరంతర ప్రభుపాద్ జపం' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'kannada',
      flag: '🇮🇳',
      name: 'Kannada',
      description: 'ಕನ್ನಡ',
      content: {
        // Use English content as default for now - can be translated later
        chantMenuItem: 'ಜಪ',
        prabhupadaMenuItem: 'ಪ್ರಭುಪಾದ್ ಮೇಲೆ ಜಪ',
        howToChantMenuItem: 'ಜಪ ಹೇಗೆ ಮಾಡುವುದು',
        articleMenuItem: 'ಲೇಖನಗಳು',
        benefitsMenuItem: 'ಜಪದ ಪ್ರಯೋಜನಗಳು',
        settingsMenuItem: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
        quickActionsLabel: 'ತಕ್ಷಣದ ಕ್ರಿಯೆಗಳು',
        familyLabel: 'ಕುಟುಂಬ',
        friendsLabel: 'ಮಿತ್ರರು',
        notesLabel: 'ಗಮನಿಕೆಗಳು',
        workLabel: 'ಕೆಲಸು',
        travelLabel: 'ಪ್ರಯಾಣ',
        remindersLabel: 'ಸ್ಮರಣೆಗಳು',
        appTitle: 'ಜಪ ಅಪ್ಲಿಕೇಶನ್',
        appSubtitle: 'ಹರೆ ಕೃಷ್ಣ 🙏',
        pageTitle: '🕉️ ಮಹಾಮಂತ್ರ ಜಪ',
        currentRound: 'ಪ್ರಸ್ತುತ ಸುತ್ತು',
        roundsCompleted: 'ಪೂರ್ಣಗೊಂಡ ಸುತ್ತುಗಳು',
        mahaRounds: 'ಮಹಾ ಸುತ್ತುಗಳು',
        progressText: 'ಪ್ರಸ್ತುತ ಸುತ್ತಿನಲ್ಲಿ ಜಪಗಳು',
        dailyGoal: 'ದೈನಂದಿನ ಗುರಿ (16 ಸುತ್ತುಗಳು)',
        dailyGoalProgress: 'ಸುತ್ತುಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ',
        chantText: 'ಜಪ',
        chantSubtext: 'ಹರೆ ಕೃಷ್ಣ',
        mahamantra1: 'ಹರೆ ಕೃಷ್ಣ ಹರೆ ಕೃಷ್ಣ ಕೃಷ್ಣ ಕೃಷ್ಣ ಹರೆ ಹರೆ',
        mahamantra2: 'ಹರೆ ರಾಮ ಹರೆ ರಾಮ ರಾಮ ರಾಮ ಹರೆ ಹರೆ',
        sriKrishnaCaitanyaMantra: 'ಜೈ ಶ್ರೀ ಕೃಷ್ಣ ಚೈತನ್ಯ ಪ್ರಭು ನಿತ್ಯಾನಂದ ಶ್ರೀ ಅದ್ವೈತ ಗದಾಧರ ಶ್ರೀವಾಸಾದಿ ಗೌರ ಭಕ್ತ ವೃಂದಾ',
        prabhupadaMantra1: 'ನಮಃ ಓಂ ವಿಷ್ಣುಪಾದಾಯ ಕೃಷ್ಣ ಪ್ರೇಷ್ಠಾಯ ಭೂತಲೇ ಶ್ರೀಮತೇ ಭಕ್ತಿವೇದಾಂತ ಸ್ವಾಮಿನ್ ಇತಿ ನಾಮಿನೇ',
        prabhupadaMantra2: 'ನಮಸ್ತೇ ಸಾರಸ್ವತೇ ದೇವೇ ಗೌರ ವಾಣಿ ಪ್ರಚಾರಿಣೇ ನಿರ್ವಿಶೇಷ ಶೂನ್ಯವಾದಿಂ ಪಾಶ್ಚಾತ್ಯ ದೇಶ ತಾರಿಣೇ',
        resetCurrentRoundToast: '🔄 ಪ್ರಸ್ತುತ ಸುತ್ತು ಮರುಹೊಂದಿಸಲಾಗಿದೆ! 🙏',
        resetRoundsCompletedToast: '🔄 ಪೂರ್ಣಗೊಂಡ ಸುತ್ತುಗಳು ಮರುಹೊಂದಿಸಲಾಗಿದೆ! 🙏',
        resetMahaRoundsToast: '🔄 ಮಹಾ ಸುತ್ತುಗಳು ಮರುಹೊಂದಿಸಲಾಗಿದೆ! 🙏',
        resetAllProgressToast: '🔄 ಎಲ್ಲಾ ಪ್ರಗತಿ ಯಶಸ್ವಿಯಾಗಿ ಮರುಹೊಂದಿಸಲಾಗಿದೆ! 🙏',
        roundCompleteToast: '🎉 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀ ಕೃಷ್ಣ ಭಗವಾನ್ ನಿಮಗೆ ಸಂತೋಷಪಟ್ಟಿದ್ದಾರೆ!! 🙏',
        mahaRoundCompleteToast: '🌟 ಅಭಿನಂದನೆಗಳು! ಶ್ರೀಲ ಪ್ರಭುಪಾದ್ ನಿಮಗೆ ಸಂತೋಷಪಟ್ಟಿದ್ದಾರೆ!! 🙏✨',
        resetAllConfirmTitle: 'ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಮರುಹೊಂದಿಸಿ',
        resetAllConfirmMessage: 'ನೀವು ನಿಮ್ಮ ಎಲ್ಲಾ ಜಪ ಪ್ರಗತಿಯನ್ನು ಮರುಹೊಂದಿಸಲು ಖಚಿತವಾಗಿದ್ದೀರಾ? ಇದು ಪ್ರಸ್ತುತ ಸುತ್ತು, ಪೂರ್ಣಗೊಂಡ ಸುತ್ತುಗಳು ಮತ್ತು ಮಹಾ ಸುತ್ತುಗಳನ್ನು ಮರುಹೊಂದಿಸುತ್ತದೆ. ಈ ಕ್ರಿಯೆಯನ್ನು ಹಿಂದಿರುಗಿಸಲಾಗುವುದಿಲ್ಲ.',
        soundOptions: {
          none: { name: 'ಶಬ್ದವಿಲ್ಲ', description: 'ನಿಶ್ಶಬ್ದ ಜಪ' },
          tick: { name: 'ಟಿಕ್ ಶಬ್ದ', description: 'ಟಿಕ್ ಶಬ್ದದೊಂದಿಗೆ ಜಪ' },
          prabhupada: { name: 'ಪ್ರಭುಪಾದ್', description: 'ಪ್ರಭುಪಾದ್ ಜೊತೆಗೆ ಜಪ' },
          continuous: { name: '108 ನಿರಂತರ ಜಪ', description: '108 ರವರೆಗೆ ನಿರಂತರ ಪ್ರಭುಪಾದ್ ಜಪ' }
        },
        progressTracker: defaultProgressTracker
      },
    },
    {
      key: 'malayalam',
      flag: '🇮🇳',
      name: 'Malayalam',
      description: 'മലയാളം',
      content: {
        chantMenuItem: 'ജപം',
        prabhupadaMenuItem: 'ജപത്തെക്കുറിച്ച് പ്രഭുപാദ',
        howToChantMenuItem: 'ജപം എങ്ങനെ ചെയ്യാം',
        articleMenuItem: 'ലേഖനങ്ങൾ',
        benefitsMenuItem: 'ജപത്തിന്റെ ഗുണങ്ങൾ',
        settingsMenuItem: 'സജ്ജീകരണങ്ങൾ',
        quickActionsLabel: 'ത്വരിത പ്രവർത്തനങ്ങൾ',
        familyLabel: 'കുടുംബം',
        friendsLabel: 'സുഹൃത്തുക്കൾ',
        notesLabel: 'കുറിപ്പുകൾ',
        workLabel: 'ജോലി',
        travelLabel: 'യാത്ര',
        remindersLabel: 'ഓർമ്മപ്പെടുത്തലുകൾ',
        appTitle: 'ജപം ആപ്പ്',
        appSubtitle: 'ഹരേ കൃഷ്ണ 🙏',
        pageTitle: '🕉️ മഹാമന്ത്ര ജപം',
        currentRound: 'നിലവിലെ റൗണ്ട്',
        roundsCompleted: 'പൂർത്തിയാക്കിയ റൗണ്ടുകൾ',
        mahaRounds: 'മഹാ റൗണ്ടുകൾ',
        progressText: 'നിലവിലെ റൗണ്ടിലെ ജപങ്ങൾ',
        dailyGoal: 'ദൈനംദിന ലക്ഷ്യം (16 റൗണ്ടുകൾ)',
        dailyGoalProgress: 'പൂർത്തിയാക്കിയ റൗണ്ടുകൾ',
        chantText: 'ജപം',
        chantSubtext: 'ഹരേ കൃഷ്ണ',
        mahamantra1: 'ഹരേ കൃഷ്ണ ഹരേ കൃഷ്ണ കൃഷ്ണ കൃഷ്ണ ഹരേ ഹരേ',
        mahamantra2: 'ഹരേ രാമ ഹരേ രാമ രാമ രാമ ഹരേ ഹരേ',
        sriKrishnaCaitanyaMantra: 'ജയ് ശ്രീ കൃഷ്ണ ചൈതന്യ പ്രഭു നിത്യാനന്ദ ശ്രീ അദ്വൈത ഗദാധര ശ്രീവാസാദി ഗൗര ഭക്ത വൃന്ദാ',
        prabhupadaMantra1: 'ನಮಃ ಓಂ ವಿಷ್ಣುಪಾದಾಯ ಕೃಷ್ಣ ಪ್ರೇಷ್ಠಾಯ ಭೂತಲೇ ಶ್ರೀಮತೇ ಭಕ್ತಿವೇದಾಂತ ಸ್ವಾಮಿನ್ ಇತಿ ನಾಮಿನೇ',
        prabhupadaMantra2: 'ನಮಸ್ತೇ ಸಾರಸ್ವತೇ ದೇವೇ ಗೌರ ವಾಣಿ ಪ್ರಚಾರಿಣೇ ನಿರ್ವಿಶೇಷ ಶೂನ್ಯವಾದಿಂ ಪಾಶ್ಚಾತ್ಯ ದೇಶ ತಾರಿಣೇ',
        resetCurrentRoundToast: '🔄 നിലവിലെ റൗണ്ട് റീസെറ്റ് ചെയ്തു! 🙏',
        resetRoundsCompletedToast: '🔄 പൂർത്തിയാക്കിയ റൗണ്ടുകൾ റീസെറ്റ് ചെയ്തു! 🙏',
        resetMahaRoundsToast: '🔄 മഹാ റൗണ്ടുകൾ റീസെറ്റ് ചെയ്തു! 🙏',
        resetAllProgressToast: '🔄 എല്ലാ പുരോഗതിയും വിജയകരമായി റീസെറ്റ് ചെയ്തു! 🙏',
        roundCompleteToast: '🎉 അഭിനന്ദനങ്ങൾ! ശ്രീ കൃഷ്ണ ഭഗവാൻ നിങ്ങളോട് സന്തോഷത്തിലാണ്!! 🙏',
        mahaRoundCompleteToast: '🌟 അഭിനന്ദനങ്ങൾ! ശ്രീല പ്രഭുപാദ് നിങ്ങളോട് സന്തോഷത്തിലാണ്!! 🙏✨',
        resetAllConfirmTitle: 'എല്ലാ പുരോഗതിയും റീസെറ്റ് ചെയ്യുക',
        resetAllConfirmMessage: 'നിങ്ങളുടെ എല്ലാ ജപ പുരോഗതിയും റീസെറ്റ് ചെയ്യാൻ നിങ്ങൾ ഉറപ്പാണോ? ഇത് നിലവിലെ റൗണ്ട്, പൂർത്തിയാക്കിയ റൗണ്ടുകൾ, മഹാ റൗണ്ടുകൾ എന്നിവയെല്ലാം റീസെറ്റ് ചെയ്യും. ഈ പ്രവർത്തി തിരികെ എടുക്കാനാകില്ല.',
        soundOptions: {
          none: { name: 'ശബ്ദമില്ല', description: 'നിശ്ശബ്ദ ജപം' },
          tick: { name: 'ടിക്ക് ശബ്ദം', description: 'ടിക്ക് ശബ്ദത്തോടെ ജപം' },
          prabhupada: { name: 'പ്രഭുപാദ്', description: 'പ്രഭുപാദിനൊപ്പം ജപം' },
          continuous: { name: '108 തുടർച്ചയായ ജപം', description: '108 വരെ തുടർച്ചയായ പ്രഭുപാദ് ജപം' }
        },
        progressTracker: defaultProgressTracker
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
        articleMenuItem: 'लेख',
        benefitsMenuItem: 'जपाचे फायदे',
        settingsMenuItem: 'सेटिंग्ज',
        quickActionsLabel: 'त्वरित क्रिया',
        familyLabel: 'कुटुंब',
        friendsLabel: 'मित्र',
        notesLabel: 'नोंदी',
        workLabel: 'काम',
        travelLabel: 'प्रवास',
        remindersLabel: 'स्मरणपत्रे',
        appTitle: 'जप अॅप',
        appSubtitle: 'हरे कृष्ण 🙏',
        pageTitle: '🕉️ महामंत्र जप',
        currentRound: 'सध्याचा फेरी',
        roundsCompleted: 'पूर्ण झालेल्या फेरी',
        mahaRounds: 'महाफेरी',
        progressText: 'सध्याच्या फेरीतील जप',
        dailyGoal: 'दैनंदिन लक्ष्य (16 फेरी)',
        dailyGoalProgress: 'पूर्ण झालेल्या फेरी',
        chantText: 'जप',
        chantSubtext: 'हरे कृष्ण',
        mahamantra1: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
        mahamantra2: 'हरे राम हरे राम राम राम हरे हरे',
        sriKrishnaCaitanyaMantra: 'जय श्री कृष्ण चैतन्य प्रभु नित्यानंद श्री अद्वैत गदाधर श्रीवासादि गौर भक्त वृंदा',
        prabhupadaMantra1: 'नमः ओं विष्णुपादाय कृष्ण प्रेष्ठाय भूतले श्रीमते भक्तिवेदान्त स्वामिन इति नामिने',
        prabhupadaMantra2: 'नमस्ते सारस्वते देवे गौर वाणी प्रचारिणे निर्विशेष शून्यवादिम पाश्चात्य देश तारिणे',
        resetCurrentRoundToast: '🔄 सध्याचा फेरी रीसेट झाला! 🙏',
        resetRoundsCompletedToast: '🔄 पूर्ण झालेल्या फेरी रीसेट झाली! 🙏',
        resetMahaRoundsToast: '🔄 महाफेरी रीसेट झाली! 🙏',
        resetAllProgressToast: '🔄 सर्व प्रगती यशस्वीरीत्या रीसेट झाली! 🙏',
        roundCompleteToast: '🎉 अभिनंदन! श्री कृष्ण भगवंत तुमच्याशी समाधानी आहेत!! 🙏',
        mahaRoundCompleteToast: '🌟 अभिनंदन! श्रील प्रभुपाद तुमच्याशी समाधानी आहेत!! 🙏✨',
        resetAllConfirmTitle: 'सर्व प्रगती रीसेट करा',
        resetAllConfirmMessage: 'आपण आपल्या सर्व जप प्रगती रीसेट करू इच्छिता का? यामुळे सध्याचा फेरी, पूर्ण झालेल्या फेरी आणि महाफेरी रीसेट होईल. ही क्रिया पूर्ववत केली जाऊ शकत नाही.',
        soundOptions: {
          none: { name: 'कोणताही आवाज नाही', description: 'मौन जप' },
          tick: { name: 'टिक आवाज', description: 'टिक आवाजासह जप' },
          prabhupada: { name: 'प्रभुपाद', description: 'प्रभुपादासह जप' },
          continuous: { name: '108 सतत जप', description: '108 पर्यंत सतत प्रभुपाद जप' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'bengali',
      flag: '🇮🇳',
      name: 'Bengali',
      description: 'বাংলা',
      content: {
        chantMenuItem: 'জপ',
        prabhupadaMenuItem: 'জপ উপর প্রভুপাদ',
        howToChantMenuItem: 'জপ কিভাবে করবেন',
        articleMenuItem: 'লেখা',
        benefitsMenuItem: 'জপের উপকারিতা',
        settingsMenuItem: 'সেটিংস',
        quickActionsLabel: 'দ্রুত ক্রিয়া',
        familyLabel: 'পরিবার',
        friendsLabel: 'বন্ধুরা',
        notesLabel: 'নোটস',
        workLabel: 'কাজ',
        travelLabel: 'ভ্রমণ',
        remindersLabel: 'স্মরণ করিয়ে দেওয়া',
        appTitle: 'জপ অ্যাপ',
        appSubtitle: 'হরে কৃষ্ণ 🙏',
        pageTitle: '🕉️ মহামন্ত্র জপ',
        currentRound: 'বর্তমান রাউন্ড',
        roundsCompleted: 'সম্পন্ন রাউন্ড',
        mahaRounds: 'মহা রাউন্ড',
        progressText: 'বর্তমান রাউন্ডের জপ',
        dailyGoal: 'দৈনিক লক্ষ্য (১৬ রাউন্ড)',
        dailyGoalProgress: 'সম্পন্ন রাউন্ড',
        chantText: 'জপ',
        chantSubtext: 'হরে কৃষ্ণ',
        mahamantra1: 'হরে কৃষ্ণ হরে কৃষ্ণ কৃষ্ণ কৃষ্ণ হরে হরে',
        mahamantra2: 'হরে রাম হরে রাম রাম রাম হরে হরে',
        sriKrishnaCaitanyaMantra: 'জয় শ্রী কৃষ্ণ চৈতন্য প্রভু নিত্যানন্দ শ্রী আদ্বৈত গদাধর শ্রীবাসাদী গৌর ভক্ত বৃন্দা',
        prabhupadaMantra1: 'নমঃ ওঁ বিষ্ণুপাদায় কৃষ্ণ প্রেষ্ঠায় ভূতলে শ্রীমতে ভক্তিবেদান্ত স্বামিন ইতি নামিনে',
        prabhupadaMantra2: 'নমস্তে সারস্বতে দেব গৌর বাণী প্রচারিণে নির্বিশেষ শূন্যবাদীপাশ্চাত্য দেশ তারিণে',
        resetCurrentRoundToast: '🔄 বর্তমান রাউন্ড রিসেট হয়েছে! 🙏',
        resetRoundsCompletedToast: '🔄 সম্পন্ন রাউন্ড রিসেট হয়েছে! 🙏',
        resetMahaRoundsToast: '🔄 মহা রাউন্ড রিসেট হয়েছে! 🙏',
        resetAllProgressToast: '🔄 সব অগ্রগতি সফলভাবে রিসেট হয়েছে! 🙏',
        roundCompleteToast: '🎉 অভিনন্দন! শ্রী কৃষ্ণ ভগবান আপনার সাথে সন্তুষ্ট!! 🙏',
        mahaRoundCompleteToast: '🌟 অভিনন্দন! শ্রীল প্রভুপাদ আপনার সাথে সন্তুষ্ট!! 🙏✨',
        resetAllConfirmTitle: 'সব অগ্রগতি রিসেট করুন',
        resetAllConfirmMessage: 'আপনি কি আপনার সব জপ অগ্রগতি রিসেট করতে চান? এর ফলে বর্তমান রাউন্ড, সম্পন্ন রাউন্ড এবং মহা রাউন্ড রিসেট হবে। এই ক্রিয়া পূর্বাবস্থায় ফিরিয়ে নেওয়া যাবে না।',
        soundOptions: {
          none: { name: 'কোনও শব্দ নেই', description: 'মৌন জপ' },
          tick: { name: 'টিক শব্দ', description: 'টিক শব্দ সহ জপ' },
          prabhupada: { name: 'প্রভুপাদ', description: 'প্রভুপাদ সহ জপ' },
          continuous: { name: '১০৮ অবিরাম জপ', description: '১০৮ পর্যন্ত অবিরাম প্রভুপাদ জপ' }
        },
        progressTracker: defaultProgressTracker
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
        howToChantMenuItem: 'જપ કેવી રીતે કરવો',
        articleMenuItem: 'લેખો',
        benefitsMenuItem: 'જપના ફાયદા',
        settingsMenuItem: 'સેટિંગ્સ',
        quickActionsLabel: 'ઝડપી ક્રિયાઓ',
        familyLabel: 'કુટુંબ',
        friendsLabel: 'મિત્રો',
        notesLabel: 'નોંધો',
        workLabel: 'કામ',
        travelLabel: 'પ્રવાસ',
        remindersLabel: 'સ્મરણીઓ',
        appTitle: 'જપ એપ',
        appSubtitle: 'હરે કૃષ્ણ 🙏',
        pageTitle: '🕉️ મહામંત્ર જપ',
        currentRound: 'વર્તમાન રાઉન્ડ',
        roundsCompleted: 'પૂર્ણ થયેલ રાઉન્ડ',
        mahaRounds: 'મહા રાઉન્ડ',
        progressText: 'વર્તમાન રાઉન્ડમાં જપ',
        dailyGoal: 'દૈનિક લક્ષ્ય (16 રાઉન્ડ)',
        dailyGoalProgress: 'પૂર્ણ થયેલ રાઉન્ડ',
        chantText: 'જપ',
        chantSubtext: 'હરે કૃષ્ણ',
        mahamantra1: 'હરે કૃષ્ણ હરે કૃષ્ણ કૃષ્ણ કૃષ્ણ હરે હરે',
        mahamantra2: 'હરે રામ હરે રામ રામ રામ હરે હરે',
        sriKrishnaCaitanyaMantra: 'જય શ્રી કૃષ્ણ ચૈતન્ય પ્રભુ નિત્યાનંદ શ્રી અદ્વૈત ગદાધર શ્રીવાસાદિ ગૌર ભક્ત વૃંદા',
        prabhupadaMantra1: 'નમઃ ઓં વિષ્ણુપાદાય કૃષ્ણ પ્રેષ્ઠાય ભૂતલે શ્રીમતે ભક્તિવેદાંત સ્વામિન ઇતિ નામિને',
        prabhupadaMantra2: 'નમસ્તે સારસ્વતે દેવે ગૌર વાણી પ્રચારિણે નિર્વિશેષ શૂન્યવાદિમ પાશ્ચાત્ય દેશ તારિણે',
        resetCurrentRoundToast: '🔄 વર્તમાન રાઉન્ડ રીસેટ થયું! 🙏',
        resetRoundsCompletedToast: '🔄 પૂર્ણ થયેલ રાઉન્ડ રીસેટ થયું! 🙏',
        resetMahaRoundsToast: '🔄 મહા રાઉન્ડ રીસેટ થયું! 🙏',
        resetAllProgressToast: '🔄 બધા પ્રગતિ સફળતાપૂર્વક રીસેટ થયું! 🙏',
        roundCompleteToast: '🎉 અભિનંદન! શ્રી કૃષ્ણ ભગવાન તમારા સાથે સંતોષિત છે!! 🙏',
        mahaRoundCompleteToast: '🌟 અભિનંદન! શ્રીલ પ્રભુપાદ તમારા સાથે સંતોષિત છે!! 🙏✨',
        resetAllConfirmTitle: 'બધા પ્રગતિ રીસેટ કરો',
        resetAllConfirmMessage: 'શું તમે તમારા બધા જપ પ્રગતિ રીસેટ કરવા માંગો છો? આથી વર્તમાન રાઉન્ડ, પૂર્ણ થયેલ રાઉન્ડ અને મહા રાઉન્ડ રીસેટ થશે. આ ક્રિયા પૂર્વાવસ્થામાં પાછા લેવામાં નહીં આવે.',
        soundOptions: {
          none: { name: 'કોઈ અવાજ નથી', description: 'મૌન જપ' },
          tick: { name: 'ટિક અવાજ', description: 'ટિક અવાજ સાથે જપ' },
          prabhupada: { name: 'પ્રભુપાદ', description: 'પ્રભુપાદ સાથે જપ' },
          continuous: { name: '૧૦૮ અવિરામ જપ', description: '૧૦૮ સુધી અવિરામ પ્રભુપાદ જપ' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'odia',
      flag: '🇮🇳',
      name: 'Odia',
      description: 'ଓଡ଼ିଆ',
      content: {
        chantMenuItem: 'ଜପ',
        prabhupadaMenuItem: 'ଜପ୍‌ରେ ପ୍ରଭୁପାଦ',
        howToChantMenuItem: 'ଜପ୍ କିପରି କରିବେ',        
        articleMenuItem: 'ଲେଖା',
        benefitsMenuItem: 'ଜପ୍ର ଲାଭ',
        settingsMenuItem: 'ସେଟିଂସ୍',
        quickActionsLabel: 'ତ୍ୱରିତ କାର୍ଯ୍ୟ',
        familyLabel: 'ପରିବାର',
        friendsLabel: 'ମିତ୍ର',
        notesLabel: 'ଟୀକା',
        workLabel: 'କାମ',
        travelLabel: 'ଯାତ୍ରା',
        remindersLabel: 'ସ୍ମୃତିଚିହ୍ନ',
        appTitle: 'ଜପ୍ ଆପ୍',
        appSubtitle: 'ହରେ କୃଷ୍ଣ 🙏',
        pageTitle: '🕉️ ମହାମନ୍ତ୍ର ଜପ୍',
        currentRound: 'ବର୍ତ୍ତମାନ ରାଉଣ୍ଡ',
        roundsCompleted: 'ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଥିବା ରାଉଣ୍ଡ',
        mahaRounds: 'ମହା ରାଉଣ୍ଡ',
        progressText: 'ବର୍ତ୍ତମାନ ରାଉଣ୍ଡରେ ଜପ୍',
        dailyGoal: 'ଦୈନିକ ଲକ୍ଷ୍ୟ (16 ରାଉଣ୍ଡ)',
        dailyGoalProgress: 'ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଥିବା ରାଉଣ୍ଡ',
        chantText: 'ଜପ୍',
        chantSubtext: 'ହରେ କୃଷ୍ଣ',
        mahamantra1: 'ହରେ କୃଷ୍ଣ ହରେ କୃଷ୍ଣ କୃଷ୍ଣ କୃଷ୍ଣ ହରେ ହରେ',
        mahamantra2: 'ହରେ ରାମ ହରେ ରାମ ରାମ ରାମ ହରେ ହରେ',
        sriKrishnaCaitanyaMantra: 'ଜୟ ଶ୍ରୀ କୃଷ୍ଣ ଚୈତନ୍ୟ ପ୍ରଭୁ ନିତ୍ୟାନନ୍ଦ ଶ୍ରୀ ଅଦ୍ୱଇତ ଗଦାଧର ଶ୍ରୀବାସାଦି ଗୌର ଭକ୍ତ ବୃନ୍ଦ',
        prabhupadaMantra1: 'ନମः ଓଁ ବିଷ୍ଣୁପାଦାୟ କୃଷ୍ଣ ପ୍ରେଷ୍ଠାୟ ଭୂତଳେ ଶ୍ରୀମତେ ଭକ୍ତିବେଦାନ୍ତ ସ୍ୱାମିନ୍ ଇତି ନାମିନେ',
        prabhupadaMantra2: 'ନମସ୍ତେ ସାରସ୍ୱତେ ଦେବେ ଗୌର ବାଣୀ ପ୍ରଚାରିଣେ ନିର୍ବିଶେଷ ଶୂନ୍ୟବାଦିମ୍ ପାଶ୍ଚାତ୍ୟ ଦେଶ ତାରିଣେ',
        resetCurrentRoundToast: '🔄 ବର୍ତ୍ତମାନ ରାଉଣ୍ଡ ରିସେଟ୍ ହୋଇଛି! 🙏',
        resetRoundsCompletedToast: '🔄 ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଥିବା ରାଉଣ୍ଡ ରିସେଟ୍ ହୋଇଛି! 🙏',
        resetMahaRoundsToast: '🔄 ମହା ରାଉଣ୍ଡ ରିସେଟ୍ ହୋଇଛି! 🙏',
        resetAllProgressToast: '🔄 ସମସ୍ତ ପ୍ରଗତି ସଫଳତାର ସହିତ ରିସେଟ୍ ହୋଇଛି! 🙏',
        roundCompleteToast: '🎉 ଅଭିନନ୍ଦନ! ଶ୍ରୀ କୃଷ୍ଣ ଭଗବାନ ଆପଣଙ୍କ ସହିତ ସନ୍ତୁଷ୍ଟ!! 🙏',
        mahaRoundCompleteToast: '🌟 ଅଭିନନ୍ଦନ! ଶ୍ରୀଲ୍ ପ୍ରଭୁପାଦ ଆପଣଙ୍କ ସହିତ ସନ୍ତୁଷ୍ଟ!! 🙏✨',
        resetAllConfirmTitle: 'ସମସ୍ତ ପ୍ରଗତି ରିସେଟ୍ କରନ୍ତୁ',
        resetAllConfirmMessage: 'ଆପଣ କି ଆପଣଙ୍କ ସମସ୍ତ ଜପ୍ ପ୍ରଗତି ରିସେଟ୍ କରିବାକୁ ଚାହାଁନ୍ତି? ଏହାର ଫଳସ୍ୱରୂପ ବର୍ତ୍ତମାନ ରାଉଣ୍ଡ, ସମ୍ପୂର୍ଣ୍ଣ ହୋଇଥିବା ରାଉଣ୍ଡ ଏବଂ ମହା ରାଉଣ୍ଡ ରିସେଟ୍ ହେବ। ଏହି କ୍ରିୟା ପୂର୍ବାବସ୍ଥାରେ ଫେରାଇବାକୁ ନହିଁ।',
        soundOptions: {
          none: { name: 'କୌଣସି ଅବାଜ ନାହିଁ', description: 'ମୌନ ଜପ୍' },
          tick: { name: 'ଟିକ୍ ଅବାଜ', description: 'ଟିକ୍ ଅବାଜ ସହିତ ଜପ୍' },
          prabhupada: { name: 'ପ୍ରଭୁପାଦ', description: 'ପ୍ରଭୁପାଦ ସହିତ ଜପ୍' },
          continuous: { name: '୧୦୮ ଅବିରାମ ଜପ୍', description: '୧୦୮ ପର୍ଯ୍ୟନ୍ତ ଅବିରାମ ପ୍ରଭୁପାଦ ଜପ୍' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'punjabi',
      flag: '🇮🇳',
      name: 'Punjabi',
      description: 'ਪੰਜਾਬੀ',
      content: {
        chantMenuItem: 'ਜਪ',
        prabhupadaMenuItem: 'ਜਪ୍‌ਰେ ਪ୍ରਭੁਪਾਦ',
        howToChantMenuItem: 'ਜਪ୍ ਕਿਵੇਂ ਕਰਨਾ ਹੈ',
        articleMenuItem: 'ਲੇਖ',
        benefitsMenuItem: 'ਜਪ੍ ਦੇ ਫਾਇਦੇ',
        settingsMenuItem: 'ਸੈਟਿੰਗਜ਼',
        quickActionsLabel: 'ਤੁਰੰਤ ਕਾਰਵਾਈ',
        familyLabel: 'ਪਰਿਵਾਰ',
        friendsLabel: 'ਮਿੱਤਰ',
        notesLabel: 'ਨੋਟਸ',
        workLabel: 'ਕਾਮ',
        travelLabel: 'ਯਾਤਰਾ',
        remindersLabel: 'ਯਾਦ ਦਿਵਾਉਣ ਵਾਲੇ',
        appTitle: 'ਜਪ੍ ਐਪ',
        appSubtitle: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ 🙏',
        pageTitle: '🕉️ ਮਹਾਮੰਤ੍ਰ ਜਪ',
        currentRound: 'ਵਰਤਮਾਨ ਰਾਊਂਡ',
        roundsCompleted: 'ਸੰਪੂਰਨ ਹੋ ਚੁੱਕੇ ਰਾਊਂਡ',
        mahaRounds: 'ਮਹਾ ਰਾਊਂਡ',
        progressText: 'ਵਰਤਮਾਨ ਰਾਊਂਡ ਵਿੱਚ ਜਪ',
        dailyGoal: 'ਦੈਨੀਕ ਲਕਸ਼੍ਯ (16 ਰਾਊਂਡ)',
        dailyGoalProgress: 'ਸੰਪੂਰਨ ਹੋ ਚੁੱਕੇ ਰਾਊਂਡ',
        chantText: 'ਜਪ',
        chantSubtext: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ',
        mahamantra1: 'ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਕ੍ਰਿਸ਼ਨਾ ਹਰੇ ਹਰੇ',
        mahamantra2: 'ਹਰੇ ਰਾਮ ਹਰੇ ਰਾਮ ਰਾਮ ਰਾਮ ਹਰੇ ਹਰੇ',
        sriKrishnaCaitanyaMantra: 'ਜਯ ਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਨਾ ਚੈਤਨ੍ਯ ਪ੍ਰਭੁ ਨਿਤ੍ਯਾਨੰਦ ਸ਼੍ਰੀ ਅਦ੍ਵੈਤ ਗਦਾਧਰ ਸ਼੍ਰੀਵਾਸਾਦੀ ਗੌਰ ਭਕ੍ਤ ਵ੍ਰਿੰਦਾ',
        prabhupadaMantra1: 'ਨਮਹ ਓਂ ਵਿ਷੍ਣੁਪਾਦਾਯ ਕ੍ਰਿਸ਼ਨਾ ਪ੍ਰੇਸ਼੍ਠਾਯ ਭੂਤਲੇ ਸ਼੍ਰੀਮਤੇ ਭਕ੍ਤਿਵੇਦਾਂਤ ਸ੍ਵਾਮਿਨ ਇਤਿ ਨਾਮਿਨੇ',
        prabhupadaMantra2: 'ਨਮਸ੍ਤੇ ਸਾਰਸ੍ਵਤੇ ਦੇਵੇ ਗੌਰ ਵਾਣੀ ਪ੍ਰਚਾਰਿਨੇ ਨਿਰਵਿਸ਼ੇਸ਼ ਸ਼ੂਨ੍ਯਵਾਦੀਮ ਪਾਸ੍ਚਾਤ੍ਯ ਦੇਸ਼ ਤਾਰਿਨੇ',
        resetCurrentRoundToast: '🔄 ਵਰਤਮਾਨ ਰਾਊਂਡ ਰੀਸੇਟ ਹੋ ਗਿਆ ਹੈ! 🙏',
        resetRoundsCompletedToast: '🔄 ਸੰਪੂਰਨ ਹੋ ਚੁੱਕੇ ਰਾਊਂਡ ਰੀਸੇਟ ਹੋ ਗਿਆ ਹੈ! 🙏',
        resetMahaRoundsToast: '🔄 ਮਹਾ ਰਾਊਂਡ ਰੀਸੇਟ ਹੋ ਗਿਆ ਹੈ! 🙏',
        resetAllProgressToast: '🔄 ਸਮੂਹ ਪ੍ਰਗਤੀ ਸਫਲਤਾ ਨਾਲ ਰੀਸੇਟ ਹੋ ਗਿਆ ਹੈ! 🙏',
        roundCompleteToast: '🎉 ਅਭਿਨੰਦਨ! ਸ਼੍ਰੀ ਕ੍ਰਿਸ਼ਨਾ ਭਗਵਾਨ ਤੁਹਾਡੇ ਨਾਲ ਸੰਤੁਸ਼ਟ!! 🙏',
        mahaRoundCompleteToast: '🌟 ਅਭਿਨੰਦਨ! ਸ਼੍ਰੀਲ ਪ੍ਰਭੁਪਾਦ ਤੁਹਾਡੇ ਨਾਲ ਸੰਤੁਸ਼ਟ!! 🙏✨',
        resetAllConfirmTitle: 'ਸਮੂਹ ਪ੍ਰਗਤੀ ਰੀਸੇਟ ਕਰੋ',
        resetAllConfirmMessage: 'ਕੀ ਤੁਸੀਂ ਆਪਣੀ ਸਮੂਹ ਜਪ੍ ਪ੍ਰਗਤੀ ਰੀਸੇਟ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ? ਇਸ ਨਾਲ ਵਰਤਮਾਨ ਰਾਊਂਡ, ਸੰਪੂਰਨ ਹੋ ਚੁੱਕੇ ਰਾਊਂਡ ਅਤੇ ਮਹਾ ਰਾਊਂਡ ਰੀਸੇਟ ਹੋਣਗੇ। ਇਹ ਕਾਰਵਾਈ ਵਾਪਸ ਨਹੀਂ ਲੈ ਸਕੀਦੀ।',
        soundOptions: {
          none: { name: 'ਕੋਈ ਆਵਾਜ਼ ਨਹੀਂ', description: 'ਮੌਨ ਜਪ' },  
          tick: { name: 'ਟਿਕ ਆਵਾਜ਼', description: 'ਟਿਕ ਆਵਾਜ਼ ਨਾਲ ਜਪ' },
          prabhupada: { name: 'ਪ੍ਰਭੁਪਾਦ', description: 'ਪ੍ਰਭੁਪਾਦ ਨਾਲ ਜਪ' },
          continuous: { name: '108 ਅਵਿਰਾਮ ਜਪ', description: '108 ਤੱਕ ਅਵਿਰਾਮ ਪ੍ਰਭੁਪਾਦ ਜਪ' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'chinese',
      flag: '🇨🇳',
      name: 'Chinese',
      description: '中文',
      content: {
        chantMenuItem: '咒语',
        prabhupadaMenuItem: '咒语与普拉布帕德',
        howToChantMenuItem: '如何咒语',
        articleMenuItem: '文章',
        benefitsMenuItem: '咒语的好处',
        settingsMenuItem: '设置',
        quickActionsLabel: '快速操作',
        familyLabel: '家庭',
        friendsLabel: '朋友',
        notesLabel: '笔记',
        workLabel: '工作',
        travelLabel: '旅行',
        remindersLabel: '提醒',
        appTitle: '咒语应用',
        appSubtitle: '哈雷克里希纳 🙏',
        pageTitle: '🕉️ 大咒语',
        currentRound: '当前轮次',
        roundsCompleted: '已完成轮次',
        mahaRounds: '大轮次',
        progressText: '当前轮次中的咒语',
        dailyGoal: '每日目标 (16 轮次)',
        dailyGoalProgress: '已完成轮次',
        chantText: '咒语',
        chantSubtext: '哈雷克里希纳',
        mahamantra1: '哈雷克里希纳 哈雷克里希纳 克里希纳 克里希纳 哈雷 哈雷',
        mahamantra2: '哈雷拉姆 哈雷拉姆 拉姆 拉姆 哈雷 哈雷',
        sriKrishnaCaitanyaMantra: '胜利！哈雷克里希纳！',
        prabhupadaMantra1: '南无嗡毗湿奴帕达亚克里希纳普雷施塔亚布特勒',
        prabhupadaMantra2: '南无斯瓦拉斯瓦特德维高尔瓦尼普拉查里',
        resetCurrentRoundToast: '🔄 当前轮次已重置！ 🙏',
        resetRoundsCompletedToast: '🔄 已完成轮次已重置！ 🙏',
        resetMahaRoundsToast: '🔄 大轮次已重置！ 🙏',
        resetAllProgressToast: '🔄 所有进度已成功重置！ 🙏',
        roundCompleteToast: '🎉 恭喜！克里希纳神与你同在！ 🙏',
        mahaRoundCompleteToast: '🌟 恭喜！普拉布帕德与你同在！ 🙏✨',
        resetAllConfirmTitle: '重置所有进度',
        resetAllConfirmMessage: '你确定要重置所有咒语进度吗？这将重置当前轮次、已完成轮次和大轮次。此操作无法撤销。',
        soundOptions: {
          none: { name: '无声音', description: '静音咒语' },
          tick: { name: '滴答声', description: '滴答声咒语' },
          prabhupada: { name: '普拉布帕德', description: '普拉布帕德咒语' },
          continuous: { name: '108 连续咒语', description: '108 次连续普拉布帕德咒语' }
        },
        progressTracker: defaultProgressTracker
      }
    },
    {
      key: 'russian',
      flag: '🇷🇺',
      name: 'Russian',
      description: 'Русский',
      content: {
        chantMenuItem: 'Пение мантр',
        prabhupadaMenuItem: 'О мантре и Прабхупаде',
        howToChantMenuItem: 'Как петь мантры',
        articleMenuItem: 'Статьи',
        benefitsMenuItem: 'Польза мантр',
        settingsMenuItem: 'Настройки',
        quickActionsLabel: 'Быстрые действия',
        familyLabel: 'Семья',
        friendsLabel: 'Друзья',
        notesLabel: 'Заметки',
        workLabel: 'Работа',
        travelLabel: 'Путешествия',
        remindersLabel: 'Напоминания',
        appTitle: 'Приложение для мантр',
        appSubtitle: 'Харе Кришна 🙏',
        pageTitle: '🕉️ Махамантра',
        currentRound: 'Текущий раунд',
        roundsCompleted: 'Завершенные раунды',
        mahaRounds: 'Махараунды',
        progressText: 'Мантры в текущем раунде',
        dailyGoal: 'Ежедневная цель (16 раундов)',
        dailyGoalProgress: 'Завершенные раунды',
        chantText: 'Пение мантр',
        chantSubtext: 'Харе Кришна',
        mahamantra1: 'Харе Кришна Харе Кришна Кришна Кришна Харе Харе',
        mahamantra2: 'Харе Рама Харе Рама Рама Рама Харе Харе',
        sriKrishnaCaitanyaMantra: 'Слава Шри Кришне Чайтанье Прабху Нитьянанде Шри Адвайте Гададхаре Шривасади Гаура Бхакте Вринда',
        prabhupadaMantra1: 'Намах Ом Вишнупадая Кришна Прештхае Бхутале Шримате Бхактиведанта Свамине Ити Намине',
        prabhupadaMantra2: 'Намасте Сарасвате Деве Гаура Вани Прачарине Нирвишеш Шуньявади Пашчатйа Деш Тарине',
        resetCurrentRoundToast: '🔄 Текущий раунд сброшен! 🙏',
        resetRoundsCompletedToast: '🔄 Завершенные раунды сброшены! 🙏',
        resetMahaRoundsToast: '🔄 Махараунды сброшены! 🙏',
        resetAllProgressToast: '🔄 Весь прогресс успешно сброшен! 🙏',
        roundCompleteToast: '🎉 Поздравляем! Господь Кришна доволен вами!! 🙏',
        mahaRoundCompleteToast: '🌟 Поздравляем! Шрил Прабхупада доволен вами!! 🙏✨',
        resetAllConfirmTitle: 'Сбросить весь прогресс',
        resetAllConfirmMessage: 'Вы уверены, что хотите сбросить весь прогресс мантр? Это сбросит текущий раунд, завершенные раунды и махараунды. Это действие нельзя отменить.',
        soundOptions: {
          none: { name: 'Без звука', description: 'Без звука мантры' },
          tick: { name: 'Тик-так', description: 'Тик-так мантры' },
          prabhupada: { name: 'Прабхупада', description: 'Мантра Прабхупады' },
          continuous: { name: '108 непрерывных мантр', description: '108 раз непрерывной мантры Прабхупады' }
        },
        progressTracker: defaultProgressTracker
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
