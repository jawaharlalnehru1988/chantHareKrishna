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
        }
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
        }
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
        }
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
        }
      }
    },



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
