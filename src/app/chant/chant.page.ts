import { Component, OnInit, AfterViewInit, OnDestroy, HostBinding } from '@angular/core';
import { IonContent, IonButton, IonProgressBar, IonToast, IonAlert, IonIcon, IonFab, IonFabButton, IonHeader, IonToolbar, IonButtons, IonSelect, IonSelectOption, IonMenuButton } from '@ionic/angular/standalone';

import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { flowerOutline, refreshOutline,  languageOutline, closeOutline, musicalNotesOutline, musicalNotes, playOutline, pauseOutline, bonfireOutline } from 'ionicons/icons';

import { ThemeService } from '../services/theme.service';
import { LanguageService, LanguageType, LanguageOption, AppContent } from '../services/language.service';

// Sound types for chanting
type ChantSoundType = 'none' | 'tick' | 'prabhupada' | 'continuous';

interface SoundOption {
  key: ChantSoundType;
  icon: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-chant',
  templateUrl: './chant.page.html',
  styleUrls: ['./chant.page.scss'],
  standalone: true,
  imports: [IonButtons, IonToolbar, IonHeader,
    IonContent,
    IonButton,
    IonProgressBar,
    IonToast,
    IonAlert,
    IonIcon,
    IonFab,
    IonFabButton,
    IonSelect,
    IonSelectOption,
    IonMenuButton]
})
export class ChantPage implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('class') themeClass = '';

  presentingElement: HTMLElement | null = null;
  currentLanguage: LanguageType = 'english';
  currentSoundMode: ChantSoundType = 'none';
  
  // Subscription for observables
  private themeSubscription: Subscription = new Subscription();
  private languageSubscription: Subscription = new Subscription();

  // Sound options for the music selector (computed from current language)
  get soundOptions(): SoundOption[] {
    const icons = ['🔇', '🔔', '🎵', '🔄'];
    const keys: ChantSoundType[] = ['none', 'tick', 'prabhupada', 'continuous'];
    const soundOptionsData = this.content?.soundOptions;
    
    if (!soundOptionsData) {
      return [];
    }
    
    return keys.map((key, index) => ({
      key,
      icon: icons[index],
      name: soundOptionsData[key].name,
      description: soundOptionsData[key].description
    }));
  }

  // Language options for the selector (derived from languageService)
  get languageOptions(): LanguageOption[] {
    return this.languageService.languageOptions;
  }

  // Current content (computed from selected language via LanguageService)
  get content(): AppContent {
    return this.languageService.getContent(this.currentLanguage);
  }

  // Chanting counters
  currentRound: number = 0;
  roundsCompleted: number = 0;
  mahaRounds: number = 0;

  // Radial progress properties
  circumference: number = 0;
  strokeDashoffset: number = 0;
  radius: number = 100;

  // UI state
  showResetAlert: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  isLanguageSelectorOpen: boolean = false;
  isAudioPlaying: boolean = false;
  isContinuousPlaying: boolean = false;
  isContinuousPaused: boolean = false;
  
  // Sri Krishna Caitanya modal state
  showSriKrishnaCaitanyaModal: boolean = false;
  isSriKrishnaCaitanyaPlaying: boolean = false;
  
  // Prabhupada Mantra state
  isPrabhupadaMantraPlaying: boolean = false;

  // Audio elements
  private tickAudio: HTMLAudioElement | null = null;
  private prabhupadaAudio: HTMLAudioElement | null = null;
  private continuousAudio: HTMLAudioElement | null = null;
  private bellAudio: HTMLAudioElement | null = null;
  private sriKrishnaCaitanyaAudio: HTMLAudioElement | null = null;
  private prabhupadaMantraAudio: HTMLAudioElement | null = null;

  // Continuous audio tracking
  private lastCycleTime: number = 0;

  // Alert button configuration
  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.showResetAlert = false;
      }
    },
    {
      text: 'Yes, Reset',
      role: 'confirm',
      handler: () => {
        this.resetProgress();
      }
    }
  ];

  // Toast button configuration
  toastButtons = [
    {
      text: '🙏',
      role: 'cancel'
    }
  ];

  constructor(private themeService: ThemeService, private languageService: LanguageService) {
    addIcons({flowerOutline,refreshOutline,musicalNotesOutline,languageOutline,musicalNotes,closeOutline,playOutline,pauseOutline,bonfireOutline});
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page') as HTMLElement;
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.themeClass = theme;
    });
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
    
    // Initialize audio elements
    this.initializeAudio();
    
    // Calculate circle circumference for progress ring
    this.circumference = 2 * Math.PI * this.radius;
    this.strokeDashoffset = this.circumference;
    
    // Load saved progress
    this.loadProgress();
    
    // Update progress ring
    this.updateProgressRing();
  }

  ngAfterViewInit() {
    // Update progress ring after view is initialized
    this.updateProgressRing();
  }

  ngOnDestroy() {
    // Unsubscribe from theme changes
    this.themeSubscription.unsubscribe();
    
    // Unsubscribe from language changes
    this.languageSubscription.unsubscribe();
    
    // Clean up audio elements
    if (this.tickAudio) {
      this.tickAudio.pause();
      this.tickAudio = null;
    }
    if (this.prabhupadaAudio) {
      this.prabhupadaAudio.pause();
      this.prabhupadaAudio = null;
    }
    if (this.continuousAudio) {
      this.continuousAudio.pause();
      this.continuousAudio = null;
    }
    if (this.bellAudio) {
      this.bellAudio.pause();
      this.bellAudio = null;
    }
    if (this.sriKrishnaCaitanyaAudio) {
      this.sriKrishnaCaitanyaAudio.pause();
      this.sriKrishnaCaitanyaAudio = null;
    }
    if (this.prabhupadaMantraAudio) {
      this.prabhupadaMantraAudio.pause();
      this.prabhupadaMantraAudio = null;
    }
    
    // Reset continuous playing state
    this.isContinuousPlaying = false;
    this.isContinuousPaused = false;
  }

  chantSrilaPrabhupadaMantra() {
    try {
      // Don't allow playing if Sri Krishna Caitanya is already playing
      if (this.isSriKrishnaCaitanyaPlaying) {
        return;
      }
      
      // Stop Sri Krishna Caitanya if it's playing
      if (this.sriKrishnaCaitanyaAudio && !this.sriKrishnaCaitanyaAudio.paused) {
        this.sriKrishnaCaitanyaAudio.pause();
        this.isSriKrishnaCaitanyaPlaying = false;
        this.showSriKrishnaCaitanyaModal = false;
      }
      
      if (this.prabhupadaMantraAudio) {
        this.prabhupadaMantraAudio.currentTime = 0;
        
        // Set up event listeners for state management
        this.prabhupadaMantraAudio.onplay = () => {
          this.isPrabhupadaMantraPlaying = true;
        };
        
        this.prabhupadaMantraAudio.onended = () => {
          this.isPrabhupadaMantraPlaying = false;
        };
        
        this.prabhupadaMantraAudio.onpause = () => {
          this.isPrabhupadaMantraPlaying = false;
        };
        
        this.prabhupadaMantraAudio.play().catch(e => console.warn('Prabhupada Mantra audio play failed:', e));
      }
    } catch (error) {
      console.warn('Prabhupada Mantra audio playback error:', error);
    }
  }

  // Initialize audio elements
  initializeAudio() {
    try {
      // Get the base URL for assets - works in both browser and Capacitor
      const baseUrl = window.location.origin + '/';
      
      // Initialize tick sound
      this.tickAudio = new Audio(baseUrl + 'assets/music/single-tick.mp3');
      this.tickAudio.preload = 'auto';
      this.tickAudio.volume = 0.7;
      
      // Initialize Prabhupada chanting
      this.prabhupadaAudio = new Audio(baseUrl + 'assets/music/SrilaPrabhupadaChanting.mp3');
      this.prabhupadaAudio.preload = 'auto';
      this.prabhupadaAudio.volume = 0.8;
      
      // Initialize continuous Prabhupada chanting
      this.continuousAudio = new Audio(baseUrl + 'assets/music/SrilaPrabhupadaChanting.mp3');
      this.continuousAudio.preload = 'auto';
      this.continuousAudio.volume = 0.8;
      this.continuousAudio.loop = true; // Enable looping for continuous play
      
      // Initialize bell sound for round completion
      this.bellAudio = new Audio(baseUrl + 'assets/music/bellshort.mp3');
      this.bellAudio.preload = 'auto';
      this.bellAudio.volume = 0.9;
      
      // Initialize Sri Krishna Caitanya audio
      this.sriKrishnaCaitanyaAudio = new Audio(baseUrl + 'assets/music/sriKrishnaChaitanya.mp3');
      this.sriKrishnaCaitanyaAudio.preload = 'auto';
      this.sriKrishnaCaitanyaAudio.volume = 0.8;
      
      // Initialize Prabhupada Mantra audio
      this.prabhupadaMantraAudio = new Audio(baseUrl + 'assets/music/Prabhupada mantra.mp3');
      this.prabhupadaMantraAudio.preload = 'auto';
      this.prabhupadaMantraAudio.volume = 0.8;
      
      // Add error handling for each audio element
      this.tickAudio.addEventListener('error', (e) => this.handleAudioError('tick', e));
      this.prabhupadaAudio.addEventListener('error', (e) => this.handleAudioError('prabhupada', e));
      this.continuousAudio.addEventListener('error', (e) => this.handleAudioError('continuous', e));
      this.bellAudio.addEventListener('error', (e) => this.handleAudioError('bell', e));
      this.sriKrishnaCaitanyaAudio.addEventListener('error', (e) => this.handleAudioError('sriKrishnaCaitanya', e));
      this.prabhupadaMantraAudio.addEventListener('error', (e) => this.handleAudioError('prabhupadaMantra', e));
      
      // Try to initialize audio context for mobile browsers
      this.initializeAudioContext();
      
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }

  // Initialize audio context for mobile browsers
  private initializeAudioContext() {
    try {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window as any).AudioContext();
        if (audioContext.state === 'suspended') {
          // Will be resumed on first user interaction
          console.log('Audio context is suspended, will resume on user interaction');
        }
      }
    } catch (error) {
      console.warn('Audio context initialization failed:', error);
    }
  }
  
  // Handle audio loading errors
  private handleAudioError(audioType: string, error: any) {
    console.error(`${audioType} audio error:`, error);
    
    // You could implement fallback logic here, such as:
    // - Showing a user notification
    // - Retrying audio load
    // - Disabling sound options that failed to load
    
    if (audioType === 'tick' && this.currentSoundMode === 'tick') {
      console.warn('Tick audio failed, switching to silent mode');
      this.currentSoundMode = 'none';
    } else if (audioType === 'prabhupada' && this.currentSoundMode === 'prabhupada') {
      console.warn('Prabhupada audio failed, switching to silent mode');
      this.currentSoundMode = 'none';
    } else if (audioType === 'continuous' && this.currentSoundMode === 'continuous') {
      console.warn('Continuous audio failed, switching to silent mode');
      this.currentSoundMode = 'none';
    }
  }

  // Play Sri Krishna Caitanya audio
  playSriKrishnaCaitanyaAudio() {
    try {
      // Don't allow playing if Prabhupada Mantra is already playing
      if (this.isPrabhupadaMantraPlaying) {
        return;
      }
      
      // Stop Prabhupada Mantra if it's playing
      if (this.prabhupadaMantraAudio && !this.prabhupadaMantraAudio.paused) {
        this.prabhupadaMantraAudio.pause();
        this.isPrabhupadaMantraPlaying = false;
      }
      
      if (this.sriKrishnaCaitanyaAudio) {
        this.sriKrishnaCaitanyaAudio.currentTime = 0;
        
        // Set up event listeners
        this.sriKrishnaCaitanyaAudio.onplay = () => {
          this.isSriKrishnaCaitanyaPlaying = true;
          this.showSriKrishnaCaitanyaModal = true;
        };
        
        this.sriKrishnaCaitanyaAudio.onended = () => {
          this.isSriKrishnaCaitanyaPlaying = false;
          this.showSriKrishnaCaitanyaModal = false;
        };
        
        this.sriKrishnaCaitanyaAudio.onpause = () => {
          this.isSriKrishnaCaitanyaPlaying = false;
          this.showSriKrishnaCaitanyaModal = false;
        };
        
        this.sriKrishnaCaitanyaAudio.play().catch(e => console.warn('Sri Krishna Caitanya audio play failed:', e));
      }
    } catch (error) {
      console.warn('Sri Krishna Caitanya audio playback error:', error);
    }
  }

  // Save progress to localStorage
  saveProgress() {
    const progress = {
      currentRound: this.currentRound,
      roundsCompleted: this.roundsCompleted,
      mahaRounds: this.mahaRounds,
      currentSoundMode: this.currentSoundMode
    };
    localStorage.setItem('chantProgress', JSON.stringify(progress));
  }

  // Load progress from localStorage
  loadProgress() {
    const savedProgress = localStorage.getItem('chantProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentRound = progress.currentRound || 0;
      this.roundsCompleted = progress.roundsCompleted || 0;
      this.mahaRounds = progress.mahaRounds || 0;
      this.currentSoundMode = progress.currentSoundMode || 'none';
    }
  }

  // Update the radial progress ring
  updateProgressRing() {
    const progress = this.currentRound / 108;
    const offset = this.circumference - (progress * this.circumference);
    this.strokeDashoffset = offset;
  }

  // Main chanting action
  chant() {
    // Enable audio context for mobile (must be called on user interaction)
    this.enableAudioContext();
    
    // If Prabhupada audio is playing, block the click
    if (this.isAudioPlaying && this.currentSoundMode === 'prabhupada') {
      return; // Don't process the click
    }
    
    // For continuous mode, just start/stop the audio, don't increment counter manually
    if (this.currentSoundMode === 'continuous') {
      this.playChantSound();
      return;
    }
    
    // Play the appropriate sound
    this.playChantSound();
    
    // Increment the counter (only for non-continuous modes)
    this.currentRound++;
    
    if (this.currentRound >= 108) {
      // Round completed
      this.currentRound = 0;
      this.roundsCompleted++;
      
      // Play bell sound for round completion
      this.playBellSound();
      
      this.showToastMessage(this.content.roundCompleteToast);
      
      if (this.roundsCompleted >= 16) {
        // Maha round completed
        this.roundsCompleted = 0;
        this.mahaRounds++;
        this.showToastMessage(this.content.mahaRoundCompleteToast);
      }
    }
    
    this.updateProgressRing();
    this.saveProgress();
  }

  // Play the appropriate chant sound
  private playChantSound() {
    try {
      if (this.currentSoundMode === 'none') {
        // Silent mode - no sound
        return;
      } else if (this.currentSoundMode === 'tick' && this.tickAudio) {
        this.tickAudio.currentTime = 0;
        // For mobile compatibility, ensure we handle play promise
        const playPromise = this.tickAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.warn('Tick audio play failed:', e));
        }
      } else if (this.currentSoundMode === 'prabhupada' && this.prabhupadaAudio) {
        // Only play if not already playing
        if (!this.isAudioPlaying) {
          this.prabhupadaAudio.currentTime = 0;
          this.isAudioPlaying = true;
          
          // Set up event listeners for Prabhupada audio
          this.prabhupadaAudio.onended = () => {
            this.isAudioPlaying = false;
            // Auto-increment after audio ends
            this.currentRound++;
            
            if (this.currentRound >= 108) {
              // Round completed
              this.currentRound = 0;
              this.roundsCompleted++;
              
              // Play bell sound for round completion
              this.playBellSound();
              
              this.showToastMessage(this.content.roundCompleteToast);
              
              if (this.roundsCompleted >= 16) {
                // Maha round completed
                this.roundsCompleted = 0;
                this.mahaRounds++;
                this.showToastMessage(this.content.mahaRoundCompleteToast);
              }
            }
            
            this.updateProgressRing();
            this.saveProgress();
          };
          
          this.prabhupadaAudio.onpause = () => {
            this.isAudioPlaying = false;
          };
          
          this.prabhupadaAudio.onerror = () => {
            this.isAudioPlaying = false;
          };
          
          this.prabhupadaAudio.play().catch(e => {
            console.warn('Prabhupada audio play failed:', e);
            this.isAudioPlaying = false;
          });
        }
      } else if (this.currentSoundMode === 'continuous' && this.continuousAudio) {
        // Toggle play/pause for continuous mode
        this.toggleContinuousAudio();
      }
    } catch (error) {
      console.warn('Audio playback error:', error);
      this.isAudioPlaying = false; // Reset flag on error
      this.isContinuousPlaying = false; // Reset continuous flag on error
      // Try to enable audio context on mobile
      this.enableAudioContext();
    }
  }
  
  // Enable audio context for mobile browsers
  private enableAudioContext() {
    try {
      // Create or resume audio context for mobile browsers
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const audioContext = new (window as any).AudioContext();
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            console.log('Audio context resumed');
          }).catch((e: any) => console.warn('Audio context resume failed:', e));
        }
      }
    } catch (error) {
      console.warn('Audio context initialization failed:', error);
    }
  }

  // Handle continuous audio cycle completion
  private onContinuousAudioCycleComplete() {
    // Increment the counter automatically
    this.currentRound++;
    
    if (this.currentRound >= 108) {
      // Round completed
      this.currentRound = 0;
      this.roundsCompleted++;
      
      // Play bell sound for round completion
      this.playBellSound();
      
      this.showToastMessage(this.content.roundCompleteToast);
      
      // Stop continuous audio when round is completed
      if (this.isContinuousPlaying && this.continuousAudio) {
        this.continuousAudio.pause();
        this.isContinuousPlaying = false;
        this.isContinuousPaused = false;
      }
      
      if (this.roundsCompleted >= 16) {
        // Maha round completed
        this.roundsCompleted = 0;
        this.mahaRounds++;
        this.showToastMessage(this.content.mahaRoundCompleteToast);
      }
    }
    
    this.updateProgressRing();
    this.saveProgress();
  }

  // Toggle continuous audio play/pause
  toggleContinuousAudio() {
    if (!this.continuousAudio) return;
    
    if (this.isContinuousPlaying && !this.isContinuousPaused) {
      // Pause the audio
      this.continuousAudio.pause();
      this.isContinuousPaused = true;
    } else if (this.isContinuousPlaying && this.isContinuousPaused) {
      // Resume the audio
      this.continuousAudio.play().catch(e => console.warn('Continuous audio resume failed:', e));
      this.isContinuousPaused = false;
    } else {
      // Start the audio
      this.isContinuousPlaying = true;
      this.isContinuousPaused = false;
      this.lastCycleTime = 0; // Reset cycle tracking
      this.continuousAudio.currentTime = 0;
      this.continuousAudio.play().catch(e => {
        console.warn('Continuous audio play failed:', e);
        this.isContinuousPlaying = false;
      });
    }
  }

  // Play bell sound for round completion
  private playBellSound() {
    try {
      if (this.bellAudio) {
        this.bellAudio.currentTime = 0;
        this.bellAudio.play().catch(e => console.warn('Bell audio play failed:', e));
      }
    } catch (error) {
      console.warn('Bell audio playback error:', error);
    }
  }

  // Close Sri Krishna Caitanya modal
  closeSriKrishnaCaitanyaModal() {
    this.showSriKrishnaCaitanyaModal = false;
    if (this.sriKrishnaCaitanyaAudio && !this.sriKrishnaCaitanyaAudio.paused) {
      this.sriKrishnaCaitanyaAudio.pause();
    }
  }

  // Show toast message
  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
  }

  // Reset current round
  resetCurrentRound() {
    this.currentRound = 0;
    
    // Stop continuous audio when resetting current round
    if (this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.updateProgressRing();
    this.saveProgress();
    this.showToastMessage(this.content.resetCurrentRoundToast);
  }

  // Reset rounds completed
  resetRoundsCompleted() {
    this.roundsCompleted = 0;
    this.saveProgress();
    this.showToastMessage(this.content.resetRoundsCompletedToast);
  }

  // Reset maha rounds
  resetMahaRounds() {
    this.mahaRounds = 0;
    this.saveProgress();
    this.showToastMessage(this.content.resetMahaRoundsToast);
  }

  // Show reset all confirmation
  showResetAllConfirmation() {
    this.showResetAlert = true;
  }

  // Reset all progress
  resetProgress() {
    this.currentRound = 0;
    this.roundsCompleted = 0;
    this.mahaRounds = 0;
    
    // Stop continuous audio when resetting all progress
    if (this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.updateProgressRing();
    this.saveProgress();
    this.showResetAlert = false;
    this.showToastMessage(this.content.resetAllProgressToast);
  }

  // Change language
  changeLanguage(language: LanguageType) {
    this.languageService.setLanguage(language);
  }

  // Show language selector
  showLanguageSelector() {
    this.isLanguageSelectorOpen = true;
  }

  // Set language and close selector
  setLanguage(language: LanguageType) {
    this.changeLanguage(language);
    this.isLanguageSelectorOpen = false;
  }

  // Handle language change from dropdown
  onLanguageChange(event: any) {
    const selectedLanguage = event.detail.value as LanguageType;
    this.languageService.setLanguage(selectedLanguage);
  }

  // Set sound mode
  setSoundMode(soundMode: ChantSoundType) {
    // Stop continuous audio if switching away from continuous mode
    if (this.currentSoundMode === 'continuous' && soundMode !== 'continuous' && this.isContinuousPlaying && this.continuousAudio) {
      this.continuousAudio.pause();
      this.isContinuousPlaying = false;
      this.isContinuousPaused = false;
    }
    
    this.currentSoundMode = soundMode;
    this.saveProgress();
    
    // Test play the sound immediately when mode is selected (mobile compatibility)
    this.testPlaySound(soundMode);
  }
  
  // Test play sound when mode is selected (helps with mobile audio permissions)
  private testPlaySound(soundMode: ChantSoundType) {
    try {
      if (soundMode === 'tick' && this.tickAudio) {
        this.tickAudio.currentTime = 0;
        const playPromise = this.tickAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Auto-pause after test
            setTimeout(() => {
              if (this.tickAudio) this.tickAudio.pause();
            }, 100);
          }).catch(e => console.warn('Tick test play failed:', e));
        }
      } else if (soundMode === 'prabhupada' && this.prabhupadaAudio && !this.isAudioPlaying) {
        // Don't test-play Prabhupada audio to avoid confusion
        console.log('Prabhupada mode selected');
      } else if (soundMode === 'continuous' && this.continuousAudio) {
        // Don't auto-start continuous mode
        console.log('Continuous mode selected');
      }
    } catch (error) {
      console.warn('Test sound playback error:', error);
    }
  }

  // Get current daily goal progress percentage
  get dailyGoalProgress(): number {
    return Math.min((this.roundsCompleted / 16) * 100, 100);
  }
}