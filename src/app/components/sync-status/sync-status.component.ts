import { Component, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonButton,
  IonBadge,
  IonProgressBar
} from '@ionic/angular/standalone';
import { 
  cloudOutline, 
  cloudOfflineOutline, 
  syncOutline, 
  warningOutline,
  checkmarkCircleOutline,
  refreshOutline 
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { interval, Subscription } from 'rxjs';

import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-sync-status',
  templateUrl: './sync-status.component.html',
  styleUrls: ['./sync-status.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton,
    IonBadge,
    IonProgressBar
  ]
})
export class SyncStatusComponent implements OnInit, OnDestroy {
  
  // Computed values from progress service
  isRegistered = this.progressService.isRegistered;
  platformType = this.progressService.platformType;
  
  // Network status
  isOnline = navigator.onLine;
  
  // Sync status computed from service data
  syncStatus = computed(() => {
    const registered = this.isRegistered();
    const platform = this.platformType();
    const queueStatus = this.progressService.getOfflineQueueStatus();
    
    if (platform === 'mobile') {
      return {
        type: 'local',
        icon: 'checkmark-circle-outline',
        color: 'success',
        message: 'Data saved locally on device',
        detail: 'Automatic local storage'
      };
    }
    
    if (!registered) {
      return {
        type: 'local',
        icon: 'warning-outline',
        color: 'warning', 
        message: 'Data saved locally only',
        detail: 'Register to enable cloud sync'
      };
    }
    
    if (!this.isOnline) {
      return {
        type: 'offline',
        icon: 'cloud-offline-outline',
        color: 'medium',
        message: 'Offline mode',
        detail: queueStatus.itemCount > 0 ? `${queueStatus.itemCount} items queued` : 'Will sync when online'
      };
    }
    
    if (queueStatus.itemCount > 0) {
      return {
        type: 'syncing',
        icon: 'sync-outline',
        color: 'primary',
        message: 'Syncing data...',
        detail: `Processing ${queueStatus.itemCount} items`
      };
    }
    
    return {
      type: 'synced',
      icon: 'cloud-outline',
      color: 'success',
      message: 'Data synced to cloud',
      detail: 'All changes backed up'
    };
  });
  
  private networkSubscription?: Subscription;
  private refreshSubscription?: Subscription;

  constructor(private progressService: ProgressService) {
    addIcons({
      cloudOutline,
      cloudOfflineOutline,
      syncOutline,
      warningOutline,
      checkmarkCircleOutline,
      refreshOutline
    });
  }

  ngOnInit() {
    // Monitor network status changes
    window.addEventListener('online', this.onNetworkChange.bind(this));
    window.addEventListener('offline', this.onNetworkChange.bind(this));
    
    // Refresh sync status periodically
    this.refreshSubscription = interval(5000).subscribe(() => {
      this.refreshSyncStatus();
    });
  }
  
  ngOnDestroy() {
    window.removeEventListener('online', this.onNetworkChange.bind(this));
    window.removeEventListener('offline', this.onNetworkChange.bind(this));
    this.refreshSubscription?.unsubscribe();
  }
  
  private onNetworkChange() {
    this.isOnline = navigator.onLine;
  }
  
  private refreshSyncStatus() {
    // Trigger reactivity update
    const status = this.syncStatus();
    
    // Auto-retry sync if there are queued items and we're online
    if (this.isOnline && status.type === 'offline') {
      this.forceSyncNow();
    }
  }
  
  // Force sync now (for manual retry)
  forceSyncNow() {
    if (!this.isOnline) {
      console.warn('Cannot sync while offline');
      return;
    }
    
    // Trigger manual sync by saving current data
    const queueStatus = this.progressService.getOfflineQueueStatus();
    if (queueStatus.itemCount > 0) {
      console.log('Manual sync triggered...');
      // The processOfflineQueue will be triggered by the network event
    }
  }
  
  // Clear offline queue (for troubleshooting)
  clearOfflineQueue() {
    this.progressService.clearOfflineQueue();
  }
}