import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, AfterViewInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { LazyChartService } from '../../services/lazy-chart.service';
import { addIcons } from 'ionicons';
import { 
  trendingUpOutline, 
  calendarOutline, 
  statsChartOutline,
  flameOutline,
  trophyOutline,
  refreshOutline
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

import { ProgressService, ChantingRecord } from '../../services/progress.service';

// Chart time period options
type ChartPeriod = 'week' | 'month' | 'year';

// Chart data interface
interface ChartDataPoint {
  date: string;
  rounds: number;
  label: string;
}

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [
    CommonModule,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon
  ],
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() height: number = 300;
  
  // Signals for reactive UI
  selectedPeriod = signal<ChartPeriod>('week');
  isLoading = signal<boolean>(false);
  
  // Chart instance
  private chart: any | null = null;
  private subscription = new Subscription();
  
  // Progress data
  chantingRecords = this.progressService.chantingRecords;
  progressStats = this.progressService.progressStats;
  
  // Computed chart data based on selected period
  chartData = computed(() => {
    const records = this.chantingRecords();
    const period = this.selectedPeriod();
    return this.generateChartData(records, period);
  });
  
  // Chart configuration
  private chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Chanting Progress',
        font: {
          size: 16,
          weight: 'bold'
        },
        color: 'rgb(var(--ion-color-primary-rgb))'
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgb(var(--ion-text-color-rgb))',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgb(var(--ion-color-dark-rgb))',
        titleColor: 'rgb(var(--ion-color-light-rgb))',
        bodyColor: 'rgb(var(--ion-color-light-rgb))',
        borderColor: 'rgb(var(--ion-color-primary-rgb))',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return `${value} rounds completed`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: 'rgb(var(--ion-text-color-rgb))'
        },
        ticks: {
          color: 'rgb(var(--ion-text-color-rgb))',
          maxRotation: 45
        },
        grid: {
          color: 'rgba(var(--ion-color-medium-rgb), 0.2)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Rounds',
          color: 'rgb(var(--ion-text-color-rgb))'
        },
        ticks: {
          color: 'rgb(var(--ion-text-color-rgb))',
          stepSize: 1
        },
        grid: {
          color: 'rgba(var(--ion-color-medium-rgb), 0.2)'
        },
        beginAtZero: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        tension: 0.3,
        borderWidth: 3
      },
      point: {
        radius: 5,
        hoverRadius: 8,
        borderWidth: 2,
        hoverBorderWidth: 3
      }
    }
  };

  constructor(
    private progressService: ProgressService,
    private lazyChartService: LazyChartService
  ) {
    // Add icons
    addIcons({
      trendingUpOutline,
      calendarOutline,
      statsChartOutline,
      flameOutline,
      trophyOutline,
      refreshOutline
    });
  }

  ngOnInit(): void {
    // Chart will update automatically via computed signals
    // No need for manual subscriptions with Angular signals
  }
  
  ngAfterViewInit(): void {
    // Initialize chart after view is ready
    setTimeout(() => {
      this.initializeChart().catch(err => console.error('Chart initialization failed:', err));
    }, 100);
    
    // Watch for chart data changes using effect
    this.watchForDataChanges();
  }
  
  // Watch for data changes and update chart
  private watchForDataChanges(): void {
    // Use setInterval to check for data changes and update chart
    // This is a simple way to handle updates without complex subscriptions
    setInterval(() => {
      if (this.chart) {
        this.updateChart();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.chart) {
      this.lazyChartService.destroyChart(this.chart);
      this.chart = null;
    }
  }
  
  // Initialize the chart
  private async initializeChart(): Promise<void> {
    if (!this.chartCanvas?.nativeElement) {
      console.warn('Chart canvas not available');
      return;
    }
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.warn('Chart context not available');
      return;
    }
    
    // Destroy existing chart
    if (this.chart) {
      this.lazyChartService.destroyChart(this.chart);
    }
    
    // Create new chart
    const chartData = this.chartData();
    
    const config: any = {
      type: 'line',
      data: {
        labels: chartData.map(d => d.label),
        datasets: [
          {
            label: 'Daily Rounds',
            data: chartData.map(d => d.rounds),
            borderColor: 'rgb(var(--ion-color-primary-rgb))',
            backgroundColor: 'rgba(var(--ion-color-primary-rgb), 0.1)',
            fill: true,
            pointBackgroundColor: 'rgb(var(--ion-color-primary-rgb))',
            pointBorderColor: 'rgb(var(--ion-color-primary-contrast-rgb))',
            pointHoverBackgroundColor: 'rgb(var(--ion-color-success-rgb))',
            pointHoverBorderColor: 'rgb(var(--ion-color-success-contrast-rgb))'
          },
          {
            label: 'Target (16 rounds)',
            data: chartData.map(() => 16),
            borderColor: 'rgba(var(--ion-color-warning-rgb), 0.8)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false
          }
        ]
      },
      options: this.chartOptions
    };
    
    try {
      this.chart = await this.lazyChartService.createChart(ctx, config);
    } catch (error) {
      console.error('Failed to create chart:', error);
    }
  }
  
  // Update chart data
  private updateChart(): void {
    if (!this.chart) {
      this.initializeChart().catch(err => console.error('Chart initialization failed:', err));
      return;
    }
    
    const chartData = this.chartData();
    
    this.chart.data.labels = chartData.map(d => d.label);
    this.chart.data.datasets[0].data = chartData.map(d => d.rounds);
    this.chart.data.datasets[1].data = chartData.map(() => 16); // Target line
    
    this.chart.update('none'); // No animation for updates
  }
  
  // Generate chart data based on period
  private generateChartData(records: ChantingRecord[], period: ChartPeriod): ChartDataPoint[] {
    const today = new Date();
    const data: ChartDataPoint[] = [];
    
    if (period === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const record = records.find(r => r.date === dateStr);
        data.push({
          date: dateStr,
          rounds: record ? record.rounds : 0,
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        });
      }
    } else if (period === 'month') {
      // Last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const record = records.find(r => r.date === dateStr);
        data.push({
          date: dateStr,
          rounds: record ? record.rounds : 0,
          label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        });
      }
    } else if (period === 'year') {
      // Last 12 months (monthly averages)
      for (let i = 11; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        date.setDate(1); // First day of month
        
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Calculate average for this month
        const monthRecords = records.filter(r => {
          const recordDate = new Date(r.date);
          return recordDate.getFullYear() === year && recordDate.getMonth() === month;
        });
        
        const totalRounds = monthRecords.reduce((sum, r) => sum + r.rounds, 0);
        const averageRounds = monthRecords.length > 0 ? Math.round(totalRounds / monthRecords.length * 10) / 10 : 0;
        
        data.push({
          date: date.toISOString().split('T')[0],
          rounds: averageRounds,
          label: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
        });
      }
    }
    
    return data;
  }
  
  // Change chart period
  onPeriodChange(event: any): void {
    const period = event.detail.value as ChartPeriod;
    this.selectedPeriod.set(period);
    
    // Update chart with loading state
    this.isLoading.set(true);
    setTimeout(() => {
      this.updateChart();
      this.isLoading.set(false);
    }, 200);
  }
  
  // Refresh chart data
  refreshChart(): void {
    this.isLoading.set(true);
    setTimeout(async () => {
      try {
        await this.initializeChart();
      } catch (err) {
        console.error('Chart refresh failed:', err);
      } finally {
        this.isLoading.set(false);
      }
    }, 300);
  }
  
  // Get chart summary stats
  getChartSummary() {
    const data = this.chartData();
    if (data.length === 0) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        streak: 0
      };
    }
    
    const total = data.reduce((sum, d) => sum + d.rounds, 0);
    const average = Math.round((total / data.length) * 10) / 10;
    const highest = Math.max(...data.map(d => d.rounds));
    
    // Calculate streak from the data
    let currentStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].rounds > 0) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return {
      total,
      average,
      highest,
      streak: currentStreak
    };
  }
}
