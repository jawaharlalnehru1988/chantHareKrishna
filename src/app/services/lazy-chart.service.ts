import { Injectable } from '@angular/core';

export interface ChartConfiguration {
  type: string;
  data: any;
  options?: any;
}

@Injectable({
  providedIn: 'root'
})
export class LazyChartService {

  private chartJs: any = null;

  constructor() { }

  /**
   * Dynamically load Chart.js library only when needed
   * This enables code splitting and reduces initial bundle size
   */
  async loadChart(): Promise<any> {
    if (this.chartJs) {
      return this.chartJs;
    }

    try {
      // Dynamic import of Chart.js for lazy loading
      const chartModule = await import('chart.js');
      
      // Register necessary components
      chartModule.Chart.register(...chartModule.registerables);
      
      this.chartJs = chartModule.Chart;
      return this.chartJs;
    } catch (error) {
      console.error('Failed to load Chart.js:', error);
      throw new Error('Chart library not available');
    }
  }

  /**
   * Create a chart instance with lazy loading
   * @param canvas - The canvas element or its context
   * @param config - Chart configuration
   */
  async createChart(canvas: HTMLCanvasElement | CanvasRenderingContext2D, config: ChartConfiguration): Promise<any> {
    const Chart = await this.loadChart();
    return new Chart(canvas, config);
  }

  /**
   * Check if Chart.js is already loaded
   */
  isChartLoaded(): boolean {
    return this.chartJs !== null;
  }

  /**
   * Get chart.js version info for debugging
   */
  async getChartInfo(): Promise<{ version: string; loaded: boolean }> {
    if (!this.chartJs) {
      try {
        await this.loadChart();
      } catch (error) {
        return { version: 'unknown', loaded: false };
      }
    }
    
    return { 
      version: this.chartJs.version || 'unknown',
      loaded: this.chartJs !== null 
    };
  }

  /**
   * Cleanup chart resources
   */
  destroyChart(chart: any): void {
    if (chart && typeof chart.destroy === 'function') {
      chart.destroy();
    }
  }
}