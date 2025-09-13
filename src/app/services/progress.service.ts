import { Injectable, signal, computed, effect } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

// Interfaces for data structures
export interface ChantingRecord {
  date: string; // YYYY-MM-DD format
  rounds: number;
  timestamp: number;
  isAutoSynced: boolean; // true if synced from chant page, false if manually entered
}

export interface UserProfile {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  pincode: string; // 4-6 digit PIN
  registrationDate: string;
  isRegistered: boolean;
}

export interface ProgressStats {
  totalRounds: number;
  averageRoundsPerDay: number;
  averageRoundsPerWeek: number;
  averageRoundsPerMonth: number;
  currentStreak: number;
  longestStreak: number;
  totalDaysChanted: number;
}

export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  totalRounds: number;
  averageRounds: number;
  daysChanted: number;
  progress: ChantingRecord[];
}

export interface MonthlyReport {
  month: string;
  year: number;
  totalRounds: number;
  averageRounds: number;
  daysChanted: number;
  progress: ChantingRecord[];
}

export interface YearlyReport {
  year: number;
  totalRounds: number;
  averageRounds: number;
  daysChanted: number;
  monthlyBreakdown: MonthlyReport[];
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  
  // Platform detection
  private isNativeApp = Capacitor.isNativePlatform();
  
  // API configuration for cloud storage
  private readonly API_BASE_URL = 'https://api.your-domain.com'; // TODO: Replace with actual API URL
  private readonly STORAGE_KEYS = {
    CHANTING_RECORDS: 'chantingRecords',
    USER_PROFILE: 'userProfile', 
    LAST_SYNC_DATE: 'lastSyncDate',
    OFFLINE_QUEUE: 'offlineQueue'
  };
  
  // Offline sync queue
  private _offlineQueue = signal<any[]>([]);
  
  // Signals for reactive data management
  private _chantingRecords = signal<ChantingRecord[]>([]);
  private _userProfile = signal<UserProfile | null>(null);
  private _currentRoundsFromChant = signal<number>(0);
  private _lastSyncDate = signal<string>('');
  
  // Computed signals for derived data
  chantingRecords = this._chantingRecords.asReadonly();
  userProfile = this._userProfile.asReadonly();
  currentRoundsFromChant = this._currentRoundsFromChant.asReadonly();
  lastSyncDate = this._lastSyncDate.asReadonly();
  
  // Computed progress statistics
  progressStats = computed<ProgressStats>(() => {
    const records = this._chantingRecords();
    if (records.length === 0) {
      return {
        totalRounds: 0,
        averageRoundsPerDay: 0,
        averageRoundsPerWeek: 0,
        averageRoundsPerMonth: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalDaysChanted: 0
      };
    }
    
    return this.calculateProgressStats(records);
  });
  
  // Check if user is registered
  isRegistered = computed(() => {
    const profile = this._userProfile();
    return profile?.isRegistered || false;
  });
  
  // Platform type
  platformType = computed(() => {
    return this.isNativeApp ? 'mobile' : 'browser';
  });
  
  constructor(private http: HttpClient) {
    // Load saved data on service initialization
    this.loadSavedData().catch(error => console.error('Error loading saved data:', error));
    
    // Set up automatic sync effect
    effect(() => {
      this.autoSyncDailyProgress();
    });
    
    // Initialize offline sync monitoring
    this.initOfflineSync();
  }
  
  // Update current rounds from chant page
  updateCurrentRoundsFromChant(rounds: number): void {
    this._currentRoundsFromChant.set(rounds);
  }
  
  // Add or update a chanting record
  addChantingRecord(record: ChantingRecord): void {
    const currentRecords = this._chantingRecords();
    const existingIndex = currentRecords.findIndex(r => r.date === record.date);
    
    if (existingIndex >= 0) {
      // Update existing record
      const updatedRecords = [...currentRecords];
      updatedRecords[existingIndex] = record;
      this._chantingRecords.set(updatedRecords);
    } else {
      // Add new record
      this._chantingRecords.set([...currentRecords, record].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
    
    this.saveData().catch(error => console.error('Error saving record:', error));
  }
  
  // Delete a chanting record
  deleteChantingRecord(date: string): void {
    const currentRecords = this._chantingRecords();
    const filteredRecords = currentRecords.filter(r => r.date !== date);
    this._chantingRecords.set(filteredRecords);
    this.saveData().catch(error => console.error('Error deleting record:', error));
  }
  
  // Get chanting record for a specific date
  getChantingRecord(date: string): ChantingRecord | null {
    const records = this._chantingRecords();
    return records.find(r => r.date === date) || null;
  }
  
  // Update current rounds from chant page (for real-time sync)
  updateCurrentRounds(rounds: number): void {
    this._currentRoundsFromChant.set(rounds);
  }
  
  // Register user profile
  setUserProfile(profile: UserProfile): void {
    this._userProfile.set(profile);
    this.saveData().catch(error => console.error('Error saving user profile:', error));
  }
  
  // Get today's date in YYYY-MM-DD format
  getTodaysDate(): string {
    return new Date().toISOString().split('T')[0];
  }
  
  // Check if a date is in the future
  isFutureDate(date: string): boolean {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    return selectedDate > today;
  }
  
  // Get streak achievements and milestones
  getStreakAchievements() {
    const currentStreak = this.progressStats().currentStreak;
    const longestStreak = this.progressStats().longestStreak;
    
    const achievements = [];
    
    // Current streak achievements
    if (currentStreak >= 365) {
      achievements.push({ type: 'current', level: 'diamond', message: '🔥💎 Incredible! 1 Year+ Streak!', streak: currentStreak });
    } else if (currentStreak >= 180) {
      achievements.push({ type: 'current', level: 'gold', message: '🔥👑 Amazing! 6 Months+ Streak!', streak: currentStreak });
    } else if (currentStreak >= 90) {
      achievements.push({ type: 'current', level: 'silver', message: '🔥🌟 Great! 3 Months+ Streak!', streak: currentStreak });
    } else if (currentStreak >= 30) {
      achievements.push({ type: 'current', level: 'bronze', message: '🔥 Excellent! 1 Month+ Streak!', streak: currentStreak });
    } else if (currentStreak >= 7) {
      achievements.push({ type: 'current', level: 'starter', message: '⚡ Good! 1 Week+ Streak!', streak: currentStreak });
    } else if (currentStreak >= 3) {
      achievements.push({ type: 'current', level: 'beginner', message: '🌱 Nice! 3+ Day Streak!', streak: currentStreak });
    }
    
    // Longest streak achievements
    if (longestStreak >= 100 && longestStreak !== currentStreak) {
      achievements.push({ type: 'longest', level: 'master', message: `🏆 Personal Best: ${longestStreak} days!`, streak: longestStreak });
    }
    
    return achievements;
  }
  
  // Get next streak milestone
  getNextStreakMilestone() {
    const currentStreak = this.progressStats().currentStreak;
    
    const milestones = [3, 7, 14, 30, 60, 90, 180, 365];
    const nextMilestone = milestones.find(m => m > currentStreak);
    
    if (nextMilestone) {
      const daysToGo = nextMilestone - currentStreak;
      return {
        target: nextMilestone,
        daysToGo,
        message: `${daysToGo} more day${daysToGo === 1 ? '' : 's'} to reach ${nextMilestone} day milestone!`
      };
    }
    
    // Beyond all milestones
    return {
      target: currentStreak + 30,
      daysToGo: 30,
      message: `Keep going! You're beyond all milestones! 🚀`
    };
  }
  
  // Get streak status for today
  getTodayStreakStatus() {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = this.getChantingRecord(today);
    const currentStreak = this.progressStats().currentStreak;
    
    if (todayRecord && todayRecord.rounds > 0) {
      return {
        status: 'completed',
        message: '✅ Today\'s chanting completed!',
        streakSafe: true
      };
    } else {
      return {
        status: 'pending',
        message: currentStreak > 0 ? 
          `⚠️ Don't break your ${currentStreak}-day streak! Chant today.` : 
          '🌟 Start your chanting streak today!',
        streakSafe: false
      };
    }
  }
  
  // Auto-sync daily progress from chant page
  private autoSyncDailyProgress(): void {
    const todaysDate = this.getTodaysDate();
    const lastSync = this._lastSyncDate();
    const currentRounds = this._currentRoundsFromChant();
    
    // Only sync if it's a new day and we have rounds to sync
    if (lastSync !== todaysDate && currentRounds > 0) {
      const existingRecord = this.getChantingRecord(todaysDate);
      
      // Only auto-sync if no record exists or if current rounds are higher
      if (!existingRecord || currentRounds > existingRecord.rounds) {
        const record: ChantingRecord = {
          date: todaysDate,
          rounds: currentRounds,
          timestamp: Date.now(),
          isAutoSynced: true
        };
        
        this.addChantingRecord(record);
        this._lastSyncDate.set(todaysDate);
      }
    }
  }
  
  // Calculate progress statistics
  private calculateProgressStats(records: ChantingRecord[]): ProgressStats {
    const totalRounds = records.reduce((sum, record) => sum + record.rounds, 0);
    const totalDaysChanted = records.length;
    
    // Calculate averages
    const averageRoundsPerDay = totalDaysChanted > 0 ? totalRounds / totalDaysChanted : 0;
    
    // Calculate weekly average (last 4 weeks)
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const recentRecords = records.filter(r => new Date(r.date) >= fourWeeksAgo);
    const recentTotalRounds = recentRecords.reduce((sum, record) => sum + record.rounds, 0);
    const averageRoundsPerWeek = recentRecords.length > 0 ? (recentTotalRounds / Math.max(1, recentRecords.length)) * 7 : 0;
    
    // Calculate monthly average (last 3 months)
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const monthlyRecords = records.filter(r => new Date(r.date) >= threeMonthsAgo);
    const monthlyTotalRounds = monthlyRecords.reduce((sum, record) => sum + record.rounds, 0);
    const averageRoundsPerMonth = monthlyRecords.length > 0 ? (monthlyTotalRounds / Math.max(1, monthlyRecords.length)) * 30 : 0;
    
    // Calculate streaks
    const { currentStreak, longestStreak } = this.calculateStreaks(records);
    
    return {
      totalRounds,
      averageRoundsPerDay: Math.round(averageRoundsPerDay * 100) / 100,
      averageRoundsPerWeek: Math.round(averageRoundsPerWeek * 100) / 100,
      averageRoundsPerMonth: Math.round(averageRoundsPerMonth * 100) / 100,
      currentStreak,
      longestStreak,
      totalDaysChanted
    };
  }
  
  // Calculate current and longest streaks
  private calculateStreaks(records: ChantingRecord[]): { currentStreak: number, longestStreak: number } {
    if (records.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }
    
    // Sort records by date (newest first)
    const sortedRecords = [...records].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    let checkDate = new Date(today);
    
    // Calculate current streak (from today backwards)
    for (const record of sortedRecords) {
      const recordDate = new Date(record.date);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      
      if (record.date === checkDateStr && record.rounds > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    // Calculate longest streak
    const allDates = sortedRecords.map(r => r.date).reverse(); // oldest first for streak calculation
    
    for (let i = 0; i < allDates.length; i++) {
      const currentDate = new Date(allDates[i]);
      const record = records.find(r => r.date === allDates[i]);
      
      if (record && record.rounds > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    
    return { currentStreak, longestStreak };
  }
  
  // Generate weekly report
  getWeeklyReport(weekStart: string): WeeklyReport {
    const startDate = new Date(weekStart);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const weekRecords = this._chantingRecords().filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
    
    const totalRounds = weekRecords.reduce((sum, record) => sum + record.rounds, 0);
    const averageRounds = weekRecords.length > 0 ? totalRounds / 7 : 0;
    
    return {
      weekStart: startDate.toISOString().split('T')[0],
      weekEnd: endDate.toISOString().split('T')[0],
      totalRounds,
      averageRounds: Math.round(averageRounds * 100) / 100,
      daysChanted: weekRecords.filter(r => r.rounds > 0).length,
      progress: weekRecords
    };
  }
  
  // Generate monthly report
  getMonthlyReport(year: number, month: number): MonthlyReport {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    const monthRecords = this._chantingRecords().filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= startDate && recordDate <= endDate;
    });
    
    const totalRounds = monthRecords.reduce((sum, record) => sum + record.rounds, 0);
    const daysInMonth = endDate.getDate();
    const averageRounds = totalRounds / daysInMonth;
    
    return {
      month: startDate.toLocaleString('default', { month: 'long' }),
      year,
      totalRounds,
      averageRounds: Math.round(averageRounds * 100) / 100,
      daysChanted: monthRecords.filter(r => r.rounds > 0).length,
      progress: monthRecords
    };
  }
  
  // Generate yearly report
  getYearlyReport(year: number): YearlyReport {
    const monthlyBreakdown: MonthlyReport[] = [];
    let totalRounds = 0;
    let totalDaysChanted = 0;
    
    for (let month = 1; month <= 12; month++) {
      const monthReport = this.getMonthlyReport(year, month);
      monthlyBreakdown.push(monthReport);
      totalRounds += monthReport.totalRounds;
      totalDaysChanted += monthReport.daysChanted;
    }
    
    const averageRounds = totalRounds / 365;
    
    return {
      year,
      totalRounds,
      averageRounds: Math.round(averageRounds * 100) / 100,
      daysChanted: totalDaysChanted,
      monthlyBreakdown
    };
  }
  
  // Enhanced save data method with platform-specific storage
  private async saveData(): Promise<void> {
    const data = {
      chantingRecords: this._chantingRecords(),
      userProfile: this._userProfile(),
      lastSyncDate: this._lastSyncDate(),
      timestamp: Date.now()
    };
    
    try {
      if (this.isNativeApp) {
        // Use Capacitor Preferences for mobile apps
        await this.saveToCapacitorStorage(data);
      } else if (this.isRegistered()) {
        // For registered browser users: save locally AND sync to server
        this.saveToLocalStorage(data);
        await this.syncToServer(data);
      } else {
        // For unregistered browser users: only local storage
        this.saveToLocalStorage(data);
      }
    } catch (error) {
      console.error('Error saving data:', error);
      // Fallback to local storage if other methods fail
      this.saveToLocalStorage(data);
    }
  }
  
  // Save to Capacitor Preferences (mobile apps)
  private async saveToCapacitorStorage(data: any): Promise<void> {
    await Preferences.set({
      key: this.STORAGE_KEYS.CHANTING_RECORDS,
      value: JSON.stringify(data.chantingRecords)
    });
    
    await Preferences.set({
      key: this.STORAGE_KEYS.USER_PROFILE,
      value: JSON.stringify(data.userProfile)
    });
    
    await Preferences.set({
      key: this.STORAGE_KEYS.LAST_SYNC_DATE,
      value: data.lastSyncDate
    });
  }
  
  // Save to browser local storage
  private saveToLocalStorage(data: any): void {
    localStorage.setItem('chantingProgress', JSON.stringify(data));
  }
  
  // Sync data to server for registered users
  private async syncToServer(data: any): Promise<void> {
    if (!this.isRegistered()) return;
    
    try {
      const userProfile = this._userProfile();
      if (!userProfile?.id) return;
      
      const payload = {
        userId: userProfile.id,
        data: data,
        timestamp: Date.now()
      };
      
      // TODO: Replace with actual API endpoint
      await firstValueFrom(
        this.http.post(`${this.API_BASE_URL}/api/sync-progress`, payload)
      );
      
      console.log('Data synced to server successfully');
    } catch (error) {
      console.error('Error syncing to server:', error);
      // Add to offline queue for retry later
      this.addToOfflineQueue('sync', data);
    }
  }
  
  // Enhanced load saved data with platform-specific loading
  private async loadSavedData(): Promise<void> {
    try {
      if (this.isNativeApp) {
        // Load from Capacitor Preferences for mobile apps
        await this.loadFromCapacitorStorage();
      } else {
        // Load from browser local storage
        await this.loadFromLocalStorage();
        
        // If user is registered, also try to sync from server
        if (this.isRegistered()) {
          await this.loadFromServer();
        }
      }
    } catch (error) {
      console.error('Error loading saved progress data:', error);
      // Fallback to local storage
      await this.loadFromLocalStorage();
    }
  }
  
  // Load from Capacitor Preferences (mobile apps)
  private async loadFromCapacitorStorage(): Promise<void> {
    const [recordsResult, profileResult, syncDateResult] = await Promise.all([
      Preferences.get({ key: this.STORAGE_KEYS.CHANTING_RECORDS }),
      Preferences.get({ key: this.STORAGE_KEYS.USER_PROFILE }),
      Preferences.get({ key: this.STORAGE_KEYS.LAST_SYNC_DATE })
    ]);
    
    if (recordsResult.value) {
      const chantingRecords = JSON.parse(recordsResult.value);
      this._chantingRecords.set(chantingRecords);
    }
    
    if (profileResult.value) {
      const userProfile = JSON.parse(profileResult.value);
      this._userProfile.set(userProfile);
    }
    
    if (syncDateResult.value) {
      this._lastSyncDate.set(syncDateResult.value);
    }
  }
  
  // Load from browser local storage
  private async loadFromLocalStorage(): Promise<void> {
    const savedData = localStorage.getItem('chantingProgress');
    if (savedData) {
      const data = JSON.parse(savedData);
      
      if (data.chantingRecords) {
        this._chantingRecords.set(data.chantingRecords);
      }
      
      if (data.userProfile) {
        this._userProfile.set(data.userProfile);
      }
      
      if (data.lastSyncDate) {
        this._lastSyncDate.set(data.lastSyncDate);
      }
    }
  }
  
  // Load from server for registered users
  private async loadFromServer(): Promise<void> {
    const userProfile = this._userProfile();
    if (!userProfile?.id) return;
    
    try {
      // TODO: Replace with actual API endpoint
      const response: any = await firstValueFrom(
        this.http.get(`${this.API_BASE_URL}/api/get-progress/${userProfile.id}`)
      );
      
      if (response?.data) {
        // Merge server data with local data (server data takes precedence)
        if (response.data.chantingRecords) {
          this._chantingRecords.set(response.data.chantingRecords);
        }
        
        if (response.data.userProfile) {
          this._userProfile.set(response.data.userProfile);
        }
        
        if (response.data.lastSyncDate) {
          this._lastSyncDate.set(response.data.lastSyncDate);
        }
        
        // Save merged data locally
        this.saveToLocalStorage(response.data);
      }
      
      console.log('Data loaded from server successfully');
    } catch (error) {
      console.error('Error loading from server:', error);
      // Continue with local data if server sync fails
    }
  }
  
  // Clear all data (for reset functionality)
  async clearAllData(): Promise<void> {
    this._chantingRecords.set([]);
    this._userProfile.set(null);
    this._lastSyncDate.set('');
    this._offlineQueue.set([]);
    
    // Clear from different storage systems
    localStorage.removeItem('chantingProgress');
    localStorage.removeItem('chantingProgressOfflineQueue');
    
    if (this.isNativeApp) {
      await Promise.all([
        Preferences.remove({ key: this.STORAGE_KEYS.CHANTING_RECORDS }),
        Preferences.remove({ key: this.STORAGE_KEYS.USER_PROFILE }),
        Preferences.remove({ key: this.STORAGE_KEYS.LAST_SYNC_DATE }),
        Preferences.remove({ key: this.STORAGE_KEYS.OFFLINE_QUEUE })
      ]);
    }
  }
  
  // Export data (for backup/migration)
  exportData(): string {
    const data = {
      chantingRecords: this._chantingRecords(),
      userProfile: this._userProfile(),
      lastSyncDate: this._lastSyncDate(),
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }
  
  // Import data (for backup/migration)
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.chantingRecords) {
        this._chantingRecords.set(data.chantingRecords);
      }
      
      if (data.userProfile) {
        this._userProfile.set(data.userProfile);
      }
      
      if (data.lastSyncDate) {
        this._lastSyncDate.set(data.lastSyncDate);
      }
      
      this.saveData().catch(error => console.error('Error saving imported data:', error));
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
  
  // Initialize offline sync monitoring
  private initOfflineSync(): void {
    // Load offline queue
    this.loadOfflineQueue();
    
    // Monitor network status and process queue when online
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      window.addEventListener('online', () => {
        console.log('Network restored, processing offline queue...');
        this.processOfflineQueue();
      });
    }
  }
  
  // Add item to offline queue for later sync
  private addToOfflineQueue(operation: string, data: any): void {
    const queueItem = {
      id: Date.now(),
      operation,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    const currentQueue = this._offlineQueue();
    this._offlineQueue.set([...currentQueue, queueItem]);
    this.saveOfflineQueue();
  }
  
  // Process offline queue when network is available
  private async processOfflineQueue(): Promise<void> {
    const queue = this._offlineQueue();
    if (queue.length === 0) return;
    
    const processedItems: number[] = [];
    
    for (const item of queue) {
      try {
        switch (item.operation) {
          case 'sync':
            await this.syncToServer(item.data);
            processedItems.push(item.id);
            break;
          // Add other operations as needed
        }
      } catch (error) {
        console.error(`Failed to process queue item ${item.id}:`, error);
        item.retryCount++;
        
        // Remove items that have failed too many times
        if (item.retryCount >= 3) {
          processedItems.push(item.id);
          console.warn(`Removing queue item ${item.id} after 3 failed attempts`);
        }
      }
    }
    
    // Remove processed items from queue
    if (processedItems.length > 0) {
      const remainingQueue = queue.filter(item => !processedItems.includes(item.id));
      this._offlineQueue.set(remainingQueue);
      this.saveOfflineQueue();
    }
  }
  
  // Save offline queue to storage
  private async saveOfflineQueue(): Promise<void> {
    const queueData = JSON.stringify(this._offlineQueue());
    
    try {
      if (this.isNativeApp) {
        await Preferences.set({
          key: this.STORAGE_KEYS.OFFLINE_QUEUE,
          value: queueData
        });
      } else {
        localStorage.setItem('chantingProgressOfflineQueue', queueData);
      }
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }
  
  // Load offline queue from storage
  private async loadOfflineQueue(): Promise<void> {
    try {
      let queueData: string | null = null;
      
      if (this.isNativeApp) {
        const result = await Preferences.get({ key: this.STORAGE_KEYS.OFFLINE_QUEUE });
        queueData = result.value;
      } else {
        queueData = localStorage.getItem('chantingProgressOfflineQueue');
      }
      
      if (queueData) {
        const queue = JSON.parse(queueData);
        this._offlineQueue.set(queue);
      }
    } catch (error) {
      console.error('Error loading offline queue:', error);
    }
  }
  
  // Clear offline queue
  clearOfflineQueue(): void {
    this._offlineQueue.set([]);
    this.saveOfflineQueue();
  }
  
  // Get offline queue status
  getOfflineQueueStatus() {
    const queue = this._offlineQueue();
    return {
      itemCount: queue.length,
      oldestItem: queue.length > 0 ? new Date(Math.min(...queue.map(item => item.timestamp))) : null,
      hasFailedItems: queue.some(item => item.retryCount > 0)
    };
  }
}