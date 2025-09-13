import { Component, signal, computed, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge,
  IonProgressBar,
  IonList,
  IonListHeader,
  IonModal,
  IonButtons
} from '@ionic/angular/standalone';
import { 
  statsChartOutline, 
  trendingUpOutline, 
  calendarOutline,
  downloadOutline,
  shareOutline,
  closeOutline,
  timeOutline,
  flameOutline,
  trophyOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ProgressService, ChantingRecord } from '../../services/progress.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  totalRounds: number;
  averageRounds: number;
  bestDay: number;
  daysChanted: number;
  consistency: number;
}

export interface MonthlyStats {
  month: string;
  year: number;
  totalRounds: number;
  averageRounds: number;
  bestDay: number;
  daysChanted: number;
  totalDays: number;
  consistency: number;
  weeklyBreakdown: WeeklyStats[];
}

export interface YearlyStats {
  year: number;
  totalRounds: number;
  averageRounds: number;
  bestDay: number;
  daysChanted: number;
  totalDays: number;
  consistency: number;
  monthlyBreakdown: MonthlyStats[];
  streakRecord: number;
}

@Component({
  selector: 'app-progress-reports',
  templateUrl: './progress-reports.component.html',
  styleUrls: ['./progress-reports.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonChip,
    IonBadge,
    IonProgressBar,
    IonList,
    IonListHeader,
    IonModal,
    IonButtons
  ]
})
export class ProgressReportsComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  
  selectedPeriod = signal<'week' | 'month' | 'year'>('week');
  showExportModal = signal(false);
  
  private chart: Chart | null = null;

  // Icons
  statsChartOutline = statsChartOutline;
  trendingUpOutline = trendingUpOutline;
  calendarOutline = calendarOutline;
  downloadOutline = downloadOutline;
  shareOutline = shareOutline;
  closeOutline = closeOutline;
  timeOutline = timeOutline;
  flameOutline = flameOutline;
  trophyOutline = trophyOutline;

  constructor(private progressService: ProgressService) {
    addIcons({ 
      statsChartOutline, 
      trendingUpOutline, 
      calendarOutline,
      downloadOutline,
      shareOutline,
      closeOutline,
      timeOutline,
      flameOutline,
      trophyOutline
    });
  }

  // Computed properties for different time periods
  weeklyStats = computed(() => {
    const records = this.progressService.chantingRecords();
    return this.calculateWeeklyStats(records);
  });

  monthlyStats = computed(() => {
    const records = this.progressService.chantingRecords();
    return this.calculateMonthlyStats(records);
  });

  yearlyStats = computed(() => {
    const records = this.progressService.chantingRecords();
    return this.calculateYearlyStats(records);
  });

  currentStats = computed(() => {
    switch (this.selectedPeriod()) {
      case 'week':
        return this.weeklyStats();
      case 'month':
        return this.monthlyStats();
      case 'year':
        return this.yearlyStats();
      default:
        return this.weeklyStats();
    }
  });

  ngOnInit() {
    // Initialize chart after view is ready
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onPeriodChange(event: any) {
    this.selectedPeriod.set(event.detail.value);
    this.updateChart();
  }

  private calculateWeeklyStats(records: ChantingRecord[]): WeeklyStats[] {
    const weeklyData: { [key: string]: ChantingRecord[] } = {};
    
    // Group records by week
    records.forEach(record => {
      const date = new Date(record.date);
      const weekStart = this.getWeekStart(date);
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = [];
      }
      weeklyData[weekKey].push(record);
    });

    // Calculate stats for each week
    return Object.keys(weeklyData)
      .sort()
      .slice(-12) // Last 12 weeks
      .map(weekKey => {
        const weekRecords = weeklyData[weekKey];
        const weekStart = new Date(weekKey);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        const totalRounds = weekRecords.reduce((sum, r) => sum + r.rounds, 0);
        const averageRounds = totalRounds / 7;
        const bestDay = Math.max(...weekRecords.map(r => r.rounds), 0);
        const daysChanted = weekRecords.length;
        const consistency = (daysChanted / 7) * 100;

        return {
          weekStart: weekStart.toLocaleDateString(),
          weekEnd: weekEnd.toLocaleDateString(),
          totalRounds,
          averageRounds: Math.round(averageRounds * 100) / 100,
          bestDay,
          daysChanted,
          consistency: Math.round(consistency)
        };
      });
  }

  private calculateMonthlyStats(records: ChantingRecord[]): MonthlyStats[] {
    const monthlyData: { [key: string]: ChantingRecord[] } = {};
    
    // Group records by month
    records.forEach(record => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = [];
      }
      monthlyData[monthKey].push(record);
    });

    // Calculate stats for each month
    return Object.keys(monthlyData)
      .sort()
      .slice(-12) // Last 12 months
      .map(monthKey => {
        const monthRecords = monthlyData[monthKey];
        const [year, month] = monthKey.split('-');
        const monthName = new Date(parseInt(year), parseInt(month) - 1, 1).toLocaleDateString('en-US', { month: 'long' });
        
        const totalDays = new Date(parseInt(year), parseInt(month), 0).getDate();
        const totalRounds = monthRecords.reduce((sum, r) => sum + r.rounds, 0);
        const averageRounds = totalRounds / totalDays;
        const bestDay = Math.max(...monthRecords.map(r => r.rounds), 0);
        const daysChanted = monthRecords.length;
        const consistency = (daysChanted / totalDays) * 100;

        return {
          month: monthName,
          year: parseInt(year),
          totalRounds,
          averageRounds: Math.round(averageRounds * 100) / 100,
          bestDay,
          daysChanted,
          totalDays,
          consistency: Math.round(consistency),
          weeklyBreakdown: this.getWeeklyBreakdownForMonth(monthRecords, parseInt(year), parseInt(month) - 1)
        };
      });
  }

  private calculateYearlyStats(records: ChantingRecord[]): YearlyStats[] {
    const yearlyData: { [key: number]: ChantingRecord[] } = {};
    
    // Group records by year
    records.forEach(record => {
      const year = new Date(record.date).getFullYear();
      
      if (!yearlyData[year]) {
        yearlyData[year] = [];
      }
      yearlyData[year].push(record);
    });

    // Calculate stats for each year
    return Object.keys(yearlyData)
      .map(Number)
      .sort()
      .slice(-5) // Last 5 years
      .map(year => {
        const yearRecords = yearlyData[year];
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        
        const totalRounds = yearRecords.reduce((sum, r) => sum + r.rounds, 0);
        const averageRounds = totalRounds / totalDays;
        const bestDay = Math.max(...yearRecords.map(r => r.rounds), 0);
        const daysChanted = yearRecords.length;
        const consistency = (daysChanted / totalDays) * 100;
        const streakRecord = this.calculateLongestStreak(yearRecords);

        return {
          year,
          totalRounds,
          averageRounds: Math.round(averageRounds * 100) / 100,
          bestDay,
          daysChanted,
          totalDays,
          consistency: Math.round(consistency),
          monthlyBreakdown: this.getMonthlyBreakdownForYear(yearRecords, year),
          streakRecord
        };
      });
  }

  private getWeekStart(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  private getWeeklyBreakdownForMonth(records: ChantingRecord[], year: number, month: number): WeeklyStats[] {
    // Implementation for weekly breakdown within a month
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    const weeks: WeeklyStats[] = [];

    let current = new Date(monthStart);
    while (current <= monthEnd) {
      const weekStart = this.getWeekStart(new Date(current));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const weekRecords = records.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= weekStart && recordDate <= weekEnd;
      });

      const totalRounds = weekRecords.reduce((sum, r) => sum + r.rounds, 0);
      const averageRounds = totalRounds / 7;
      const bestDay = Math.max(...weekRecords.map(r => r.rounds), 0);
      const daysChanted = weekRecords.length;
      const consistency = (daysChanted / 7) * 100;

      weeks.push({
        weekStart: weekStart.toLocaleDateString(),
        weekEnd: weekEnd.toLocaleDateString(),
        totalRounds,
        averageRounds: Math.round(averageRounds * 100) / 100,
        bestDay,
        daysChanted,
        consistency: Math.round(consistency)
      });

      current.setDate(current.getDate() + 7);
    }

    return weeks;
  }

  private getMonthlyBreakdownForYear(records: ChantingRecord[], year: number): MonthlyStats[] {
    const months: MonthlyStats[] = [];
    
    for (let month = 0; month < 12; month++) {
      const monthStart = new Date(year, month, 1);
      const monthEnd = new Date(year, month + 1, 0);
      
      const monthRecords = records.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= monthStart && recordDate <= monthEnd;
      });

      const totalDays = monthEnd.getDate();
      const totalRounds = monthRecords.reduce((sum, r) => sum + r.rounds, 0);
      const averageRounds = totalRounds / totalDays;
      const bestDay = Math.max(...monthRecords.map(r => r.rounds), 0);
      const daysChanted = monthRecords.length;
      const consistency = (daysChanted / totalDays) * 100;

      months.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'long' }),
        year,
        totalRounds,
        averageRounds: Math.round(averageRounds * 100) / 100,
        bestDay,
        daysChanted,
        totalDays,
        consistency: Math.round(consistency),
        weeklyBreakdown: this.getWeeklyBreakdownForMonth(monthRecords, year, month)
      });
    }

    return months;
  }

  private calculateLongestStreak(records: ChantingRecord[]): number {
    if (records.length === 0) return 0;

    const sortedRecords = records
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let maxStreak = 0;
    let currentStreak = 0;
    let lastDate: Date | null = null;

    for (const record of sortedRecords) {
      const currentDate = new Date(record.date);
      
      if (lastDate) {
        const daysDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      maxStreak = Math.max(maxStreak, currentStreak);
      lastDate = currentDate;
    }

    return maxStreak;
  }

  private createChart() {
    const canvas = document.getElementById('progressChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, this.getChartConfig());
  }

  private updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  private getChartConfig(): ChartConfiguration {
    const stats = this.currentStats();
    const labels: string[] = [];
    const data: number[] = [];

    switch (this.selectedPeriod()) {
      case 'week':
        const weeklyStats = stats as WeeklyStats[];
        labels.push(...weeklyStats.map(s => s.weekStart));
        data.push(...weeklyStats.map(s => s.totalRounds));
        break;
      case 'month':
        const monthlyStats = stats as MonthlyStats[];
        labels.push(...monthlyStats.map(s => `${s.month} ${s.year}`));
        data.push(...monthlyStats.map(s => s.totalRounds));
        break;
      case 'year':
        const yearlyStats = stats as YearlyStats[];
        labels.push(...yearlyStats.map(s => s.year.toString()));
        data.push(...yearlyStats.map(s => s.totalRounds));
        break;
    }

    return {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Total Rounds',
          data,
          borderColor: '#3880ff',
          backgroundColor: 'rgba(56, 128, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };
  }

  exportData() {
    this.showExportModal.set(true);
  }

  exportAsCSV() {
    const stats = this.currentStats();
    let csvContent = '';

    switch (this.selectedPeriod()) {
      case 'week':
        csvContent = this.generateWeeklyCSV(stats as WeeklyStats[]);
        break;
      case 'month':
        csvContent = this.generateMonthlyCSV(stats as MonthlyStats[]);
        break;
      case 'year':
        csvContent = this.generateYearlyCSV(stats as YearlyStats[]);
        break;
    }

    this.downloadCSV(csvContent, `chanting-progress-${this.selectedPeriod()}.csv`);
    this.showExportModal.set(false);
  }

  private generateWeeklyCSV(stats: WeeklyStats[]): string {
    const headers = ['Week Start', 'Week End', 'Total Rounds', 'Average Rounds', 'Best Day', 'Days Chanted', 'Consistency %'];
    const rows = stats.map(s => [
      s.weekStart,
      s.weekEnd,
      s.totalRounds.toString(),
      s.averageRounds.toString(),
      s.bestDay.toString(),
      s.daysChanted.toString(),
      s.consistency.toString()
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateMonthlyCSV(stats: MonthlyStats[]): string {
    const headers = ['Month', 'Year', 'Total Rounds', 'Average Rounds', 'Best Day', 'Days Chanted', 'Total Days', 'Consistency %'];
    const rows = stats.map(s => [
      s.month,
      s.year.toString(),
      s.totalRounds.toString(),
      s.averageRounds.toString(),
      s.bestDay.toString(),
      s.daysChanted.toString(),
      s.totalDays.toString(),
      s.consistency.toString()
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private generateYearlyCSV(stats: YearlyStats[]): string {
    const headers = ['Year', 'Total Rounds', 'Average Rounds', 'Best Day', 'Days Chanted', 'Total Days', 'Consistency %', 'Longest Streak'];
    const rows = stats.map(s => [
      s.year.toString(),
      s.totalRounds.toString(),
      s.averageRounds.toString(),
      s.bestDay.toString(),
      s.daysChanted.toString(),
      s.totalDays.toString(),
      s.consistency.toString(),
      s.streakRecord.toString()
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  shareProgress() {
    const stats = this.currentStats();
    let shareText = '';

    switch (this.selectedPeriod()) {
      case 'week':
        const weeklyStats = stats as WeeklyStats[];
        const latestWeek = weeklyStats[weeklyStats.length - 1];
        if (latestWeek) {
          shareText = `🕉️ My Chanting Progress This Week 🕉️\n\n` +
            `📅 ${latestWeek.weekStart} - ${latestWeek.weekEnd}\n` +
            `🔢 Total Rounds: ${latestWeek.totalRounds}\n` +
            `📊 Daily Average: ${latestWeek.averageRounds}\n` +
            `🏆 Best Day: ${latestWeek.bestDay} rounds\n` +
            `📈 Consistency: ${latestWeek.consistency}%\n\n` +
            `Hare Krishna! 🙏`;
        }
        break;
      case 'month':
        const monthlyStats = stats as MonthlyStats[];
        const latestMonth = monthlyStats[monthlyStats.length - 1];
        if (latestMonth) {
          shareText = `🕉️ My Chanting Progress This Month 🕉️\n\n` +
            `📅 ${latestMonth.month} ${latestMonth.year}\n` +
            `🔢 Total Rounds: ${latestMonth.totalRounds}\n` +
            `📊 Daily Average: ${latestMonth.averageRounds}\n` +
            `🏆 Best Day: ${latestMonth.bestDay} rounds\n` +
            `📈 Consistency: ${latestMonth.consistency}%\n` +
            `📆 Days Chanted: ${latestMonth.daysChanted}/${latestMonth.totalDays}\n\n` +
            `Hare Krishna! 🙏`;
        }
        break;
      case 'year':
        const yearlyStats = stats as YearlyStats[];
        const latestYear = yearlyStats[yearlyStats.length - 1];
        if (latestYear) {
          shareText = `🕉️ My Chanting Progress in ${latestYear.year} 🕉️\n\n` +
            `🔢 Total Rounds: ${latestYear.totalRounds}\n` +
            `📊 Daily Average: ${latestYear.averageRounds}\n` +
            `🏆 Best Day: ${latestYear.bestDay} rounds\n` +
            `🔥 Longest Streak: ${latestYear.streakRecord} days\n` +
            `📈 Consistency: ${latestYear.consistency}%\n` +
            `📆 Days Chanted: ${latestYear.daysChanted}/${latestYear.totalDays}\n\n` +
            `Hare Krishna! 🙏`;
        }
        break;
    }

    if (navigator.share) {
      navigator.share({
        title: 'Chanting Progress',
        text: shareText
      });
    } else {
      navigator.clipboard.writeText(shareText);
      // Show a toast message that text was copied
    }
    
    this.showExportModal.set(false);
  }

  closeExportModal() {
    this.showExportModal.set(false);
  }
}