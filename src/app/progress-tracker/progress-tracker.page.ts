import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { 
  calendarOutline, 
  trophyOutline, 
  statsChartOutline, 
  addOutline, 
  personAddOutline,
  saveOutline,
  trashOutline,
  createOutline,
  flameOutline, 
  chevronForwardOutline, 
  flagOutline,
  checkmarkCircle,
  warning,
  timeOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
  IonToast,
  IonAlert,
  ModalController,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Subscription } from 'rxjs';

import { 
  ProgressService, 
  ChantingRecord, 
  UserProfile, 
  ProgressStats 
} from '../services/progress.service';
import { LanguageService, LanguageType, AppContent } from '../services/language.service';
import { RegistrationComponent } from '../registration/registration.component';
import { ProgressChartComponent } from '../components/progress-chart/progress-chart.component';
import { SyncStatusComponent } from '../components/sync-status/sync-status.component';
import { RecordsHistoryComponent } from '../components/records-history/records-history.component';
import { ProgressReportsComponent } from '../components/progress-reports/progress-reports.component';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.page.html',
  styleUrls: ['./progress-tracker.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonFab,
    IonFabButton,
    IonModal,
    IonToast,
    IonAlert,
    ProgressChartComponent,
    SyncStatusComponent,
    RecordsHistoryComponent,
    ProgressReportsComponent
  ]
})
export class ProgressTrackerPage implements OnInit, OnDestroy {

  // Signals for reactive UI
  selectedDate = signal<string>(this.getTodaysDate());
  selectedRounds = signal<number>(0);
  showDatePicker = signal<boolean>(false);
  showToast = signal<boolean>(false);
  toastMessage = signal<string>('');
  showAlert = signal<boolean>(false);
  alertMessage = signal<string>('');
  showRecordsHistory = signal<boolean>(false);
  showProgressReports = signal<boolean>(false);
  
  // Data signals from progress service
  chantingRecords = this.progressService.chantingRecords;
  userProfile = this.progressService.userProfile;
  progressStats = this.progressService.progressStats;
  isRegistered = this.progressService.isRegistered;
  platformType = this.progressService.platformType;
  currentRoundsFromChant = this.progressService.currentRoundsFromChant;
  
  // Subscriptions
  private subscriptions = new Subscription();
  
  // Computed values
  selectedDateRecord = computed(() => {
    const date = this.selectedDate();
    return this.progressService.getChantingRecord(date);
  });
  
  canSaveForDate = computed(() => {
    const date = this.selectedDate();
    return !this.progressService.isFutureDate(date);
  });
  
  suggestedRounds = computed(() => {
    const date = this.selectedDate();
    const isToday = date === this.getTodaysDate();
    return isToday ? this.currentRoundsFromChant() : 0;
  });
  
  // Rounds options (1-128)
  roundsOptions = Array.from({length: 128}, (_, i) => i + 1);
  
  // Alert configuration  
  get alertButtons() {
    return [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: this.progressTrackerContent.delete,
        role: 'confirm',
        handler: () => {
          this.confirmDeleteRecord();
        }
      }
    ];
  }

  // Language support
  currentLanguage: LanguageType = 'english';
  
  // Get current content (computed from selected language via LanguageService)
  get content(): AppContent {
    return this.languageService.getContent(this.currentLanguage);
  }
  
  get progressTrackerContent() {
    return this.content.progressTracker;
  }

  constructor(
    private progressService: ProgressService,
    private languageService: LanguageService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    addIcons({personAddOutline,trophyOutline,calendarOutline,chevronForwardOutline,statsChartOutline,flameOutline,saveOutline,createOutline,trashOutline,timeOutline,flagOutline,addOutline,checkmarkCircle,warning});
  }

  ngOnInit() {
    // Initialize with today's date
    const today = this.getTodaysDate();
    this.selectedDate.set(today);
    
    // Set suggested rounds from existing record or chant page
    const existingRecord = this.selectedDateRecord();
    if (existingRecord) {
      this.selectedRounds.set(existingRecord.rounds);
    } else if (this.suggestedRounds() > 0) {
      this.selectedRounds.set(this.suggestedRounds());
    }
    
    // Subscribe to language changes
    this.subscriptions.add(
      this.languageService.currentLanguage$.subscribe(language => {
        this.currentLanguage = language;
      })
    );
    
    // Check if user needs to register (for browser users)
    this.checkRegistrationStatus();
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  
  // Get today's date in YYYY-MM-DD format
  getTodaysDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  // Check if user needs to register (for browser users)
  private async checkRegistrationStatus() {
    if (this.platformType() === 'browser' && !this.isRegistered()) {
      // Show registration prompt after 1 minute for browser users
      setTimeout(() => {
        this.showRegistrationPrompt();
      }, 60000); // 1 minute delay
    }
  }
  
  // Show registration prompt with alert
  private async showRegistrationPrompt() {
    const registration = this.progressTrackerContent.registration;
    const alert = await this.alertController.create({
      header: registration.title,
      message: 'If you want to retain your chanting counts forever and sync across devices, you may register an account. Otherwise, your data will be stored locally on this browser.',
      buttons: [
        {
          text: 'Maybe Later',
          role: 'cancel',
          handler: () => {
            // User continues with local storage only
            this.showToastMessage(this.progressTrackerContent.progressSavedLocally);
          }
        },
        {
          text: 'Register Now',
          handler: () => {
            this.showRegistrationModal();
          }
        }
      ]
    });

    await alert.present();
  }
  
  // Show registration modal
  async showRegistrationModal() {
    const modal = await this.modalController.create({
      component: RegistrationComponent,
      backdropDismiss: true, // Allow dismissing by clicking outside
      showBackdrop: true
    });
    
    await modal.present();
  }
  
  // Handle date change
  onDateChange(event: any) {
    const selectedDate = event.detail.value.split('T')[0];
    
    // Prevent future dates
    if (this.progressService.isFutureDate(selectedDate)) {
      this.showToastMessage(this.progressTrackerContent.cannotSelectFutureDates);
      return;
    }
    
    this.selectedDate.set(selectedDate);
    
    // Update rounds based on existing record or suggestion
    const existingRecord = this.selectedDateRecord();
    if (existingRecord) {
      this.selectedRounds.set(existingRecord.rounds);
    } else {
      // For today, suggest rounds from chant page, otherwise 0
      const isToday = selectedDate === this.getTodaysDate();
      const suggested = isToday ? this.suggestedRounds() : 0;
      this.selectedRounds.set(suggested);
    }
    
    this.showDatePicker.set(false);
  }
  
  // Handle rounds change
  onRoundsChange(event: any) {
    const rounds = parseInt(event.detail.value, 10);
    this.selectedRounds.set(rounds);
  }
  
  // Save chanting record
  saveChantingRecord() {
    const date = this.selectedDate();
    const rounds = this.selectedRounds();
    
    if (rounds < 0 || rounds > 128) {
      this.showToastMessage(this.progressTrackerContent.enterValidRounds);
      return;
    }
    
    if (this.progressService.isFutureDate(date)) {
      this.showToastMessage(this.progressTrackerContent.cannotSaveFutureData);
      return;
    }
    
    const record: ChantingRecord = {
      date,
      rounds,
      timestamp: Date.now(),
      isAutoSynced: false // Manual entry
    };
    
    this.progressService.addChantingRecord(record);
    
    const existingRecord = this.selectedDateRecord();
    const message = existingRecord ? this.progressTrackerContent.recordUpdatedSuccess : this.progressTrackerContent.recordSavedSuccess;
    this.showToastMessage(message);
  }
  
  // Use suggested rounds from chant page
  useSuggestedRounds() {
    const suggested = this.suggestedRounds();
    if (suggested > 0) {
      this.selectedRounds.set(suggested);
      this.showToastMessage(this.progressTrackerContent.usingRoundsFromToday.replace('{0}', suggested.toString()));
    } else {
      this.showToastMessage(this.progressTrackerContent.noChantingDataToday);
    }
  }
  
  // Edit existing record
  editRecord() {
    const record = this.selectedDateRecord();
    if (record) {
      this.selectedRounds.set(record.rounds);
      this.showToastMessage(this.progressTrackerContent.readyToEditRecord);
    }
  }
  
  // Delete record confirmation
  deleteRecord() {
    const record = this.selectedDateRecord();
    if (record) {
      this.alertMessage.set(`Are you sure you want to delete the record for ${this.formatDate(record.date)}?`);
      this.showAlert.set(true);
    }
  }
  
  // Confirm delete record
  private confirmDeleteRecord() {
    const date = this.selectedDate();
    this.progressService.deleteChantingRecord(date);
    this.selectedRounds.set(0);
    this.showToastMessage(this.progressTrackerContent.recordDeletedSuccess);
  }
  
  // Format date for display
  formatDate(date: string): string {
    return new Date(date + 'T00:00:00').toLocaleDateString();
  }
  
  // Show toast message
  private showToastMessage(message: string) {
    this.toastMessage.set(message);
    this.showToast.set(true);
  }
  
  // Get streak emoji
  getStreakEmoji(streak: number): string {
    if (streak >= 365) return '🔥💎'; // Diamond fire for year+
    if (streak >= 180) return '🔥👑'; // Crown fire for 6 months+
    if (streak >= 90) return '🔥🌟';  // Star fire for 3 months+
    if (streak >= 30) return '🔥';    // Fire for month+
    if (streak >= 7) return '⚡';     // Lightning for week+
    if (streak >= 3) return '🌱';     // Sprout for 3+ days
    return '✨';                      // Sparkle for any streak
  }
  
  // Get progress color based on rounds
  getProgressColor(rounds: number): string {
    if (rounds >= 16) return 'success';
    if (rounds >= 8) return 'warning';
    if (rounds >= 1) return 'primary';
    return 'medium';
  }
  
  // Streak tracking methods
  getStreakAchievements() {
    return this.progressService.getStreakAchievements();
  }

  getNextStreakMilestone() {
    return this.progressService.getNextStreakMilestone();
  }

  getTodayStreakStatus() {
    return this.progressService.getTodayStreakStatus();
  }

  // Records history management
  openRecordsHistory() {
    this.showRecordsHistory.set(true);
  }

  closeRecordsHistory() {
    this.showRecordsHistory.set(false);
  }

  // Progress reports management
  openProgressReports() {
    this.showProgressReports.set(true);
  }

  closeProgressReports() {
    this.showProgressReports.set(false);
  }
}
