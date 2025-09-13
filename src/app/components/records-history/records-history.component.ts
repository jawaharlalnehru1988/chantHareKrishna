import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonModal,
  ModalController,
  AlertController
} from '@ionic/angular/standalone';
import { 
  closeOutline,
  createOutline,
  trashOutline,
  calendarOutline,
  trendingUpOutline,
  filterOutline,
  refreshOutline,
  addOutline,
  searchOutline,
  timeOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { ProgressService, ChantingRecord } from '../../services/progress.service';
import { EditRecordComponent } from '../edit-record/edit-record.component';

@Component({
  selector: 'app-records-history',
  templateUrl: './records-history.component.html',
  styleUrls: ['./records-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    IonBadge,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabButton,
    IonModal,
    EditRecordComponent
  ]
})
export class RecordsHistoryComponent implements OnInit {

  // Signals for reactive UI
  searchTerm = signal<string>('');
  filterPeriod = signal<string>('all'); // all, week, month, year
  showAlert = signal<boolean>(false);
  alertConfig = signal<any>({});
  selectedRecord = signal<ChantingRecord | null>(null);
  showEditModal = signal<boolean>(false);
  
  // Data from progress service
  allRecords = this.progressService.chantingRecords;
  
  // Computed filtered records
  filteredRecords = computed(() => {
    const records = this.allRecords();
    const search = this.searchTerm().toLowerCase();
    const period = this.filterPeriod();
    
    let filtered = records;
    
    // Filter by search term (date or rounds)
    if (search) {
      filtered = filtered.filter(record => 
        record.date.includes(search) || 
        record.rounds.toString().includes(search) ||
        this.formatDate(record.date).toLowerCase().includes(search)
      );
    }
    
    // Filter by time period
    if (period !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (period) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(record => 
        new Date(record.date) >= startDate
      );
    }
    
    return filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });
  
  // Statistics for filtered records
  filteredStats = computed(() => {
    const records = this.filteredRecords();
    const totalRounds = records.reduce((sum, record) => sum + record.rounds, 0);
    const averageRounds = records.length > 0 ? totalRounds / records.length : 0;
    const maxRounds = records.length > 0 ? Math.max(...records.map(r => r.rounds)) : 0;
    
    return {
      totalRecords: records.length,
      totalRounds,
      averageRounds: Math.round(averageRounds * 100) / 100,
      maxRounds
    };
  });

  constructor(
    private progressService: ProgressService,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    addIcons({
      closeOutline,
      createOutline,
      trashOutline,
      calendarOutline,
      trendingUpOutline,
      filterOutline,
      refreshOutline,
      addOutline,
      searchOutline,
      timeOutline
    });
  }

  ngOnInit() {
    // Component initialization
  }
  
  // Close modal
  closeModal() {
    this.modalController.dismiss();
  }
  
  // Refresh records
  async handleRefresh(event: any) {
    // Simulate refresh delay
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  
  // Format date for display
  formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  }
  
  // Get relative time
  getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 7) {
      return new Date(timestamp).toLocaleDateString();
    } else if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return 'Recently';
    }
  }
  
  // Get rounds color based on count
  getRoundsColor(rounds: number): string {
    if (rounds >= 16) return 'success';
    if (rounds >= 8) return 'warning';
    if (rounds >= 1) return 'primary';
    return 'medium';
  }
  
  // Edit record
  async editRecord(record: ChantingRecord) {
    this.selectedRecord.set(record);
    this.showEditModal.set(true);
  }
  
  // Delete record with confirmation
  async deleteRecord(record: ChantingRecord) {
    const alert = await this.alertController.create({
      header: 'Delete Record',
      message: `Are you sure you want to delete the record for ${this.formatDate(record.date)} (${record.rounds} rounds)?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(record);
          }
        }
      ]
    });

    await alert.present();
  }
  
  // Confirm delete
  private confirmDelete(record: ChantingRecord) {
    this.progressService.deleteChantingRecord(record.date);
  }
  
  // Bulk delete with confirmation
  async bulkDeletePeriod() {
    const records = this.filteredRecords();
    if (records.length === 0) return;
    
    const alert = await this.alertController.create({
      header: 'Bulk Delete',
      message: `Delete all ${records.length} records from the selected period?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: () => {
            records.forEach(record => {
              this.progressService.deleteChantingRecord(record.date);
            });
          }
        }
      ]
    });

    await alert.present();
  }
  
  // Filter period change
  onFilterPeriodChange(event: any) {
    this.filterPeriod.set(event.detail.value);
  }
  
  // Search change
  onSearchChange(event: any) {
    this.searchTerm.set(event.detail.value);
  }
  
  // Clear search
  clearSearch() {
    this.searchTerm.set('');
  }
}