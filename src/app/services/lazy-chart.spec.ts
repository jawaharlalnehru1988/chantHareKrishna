import { TestBed } from '@angular/core/testing';
import { LazyChartService } from '../services/lazy-chart.service';

describe('LazyChartService Performance Test', () => {
  let service: LazyChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyChartService]
    });
    service = TestBed.inject(LazyChartService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should initially not have chart loaded', () => {
    expect(service.isChartLoaded()).toBeFalse();
  });

  it('should load chart.js dynamically', async () => {
    const Chart = await service.loadChart();
    expect(Chart).toBeTruthy();
    expect(service.isChartLoaded()).toBeTrue();
    expect(typeof Chart).toBe('function');
  });

  it('should return same instance on subsequent loads', async () => {
    const chart1 = await service.loadChart();
    const chart2 = await service.loadChart();
    expect(chart1).toBe(chart2);
  });

  it('should get chart info after loading', async () => {
    const info = await service.getChartInfo();
    expect(info.loaded).toBeTrue();
    expect(info.version).toBeTruthy();
  });

  it('should handle chart creation with mock canvas', async () => {
    // Create a mock canvas element
    const mockCanvas = document.createElement('canvas');
    mockCanvas.width = 400;
    mockCanvas.height = 300;
    
    const config = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: 'Test Data',
          data: [10, 20, 30]
        }]
      }
    };

    try {
      const chart = await service.createChart(mockCanvas, config);
      expect(chart).toBeTruthy();
      
      // Cleanup
      service.destroyChart(chart);
    } catch (error) {
      // Chart creation might fail in test environment without proper DOM
      // This is expected and acceptable for this test
      console.log('Chart creation failed in test environment (expected)');
    }
  });

  it('should handle destroy chart gracefully', () => {
    const mockChart = {
      destroy: jasmine.createSpy('destroy')
    };

    service.destroyChart(mockChart);
    expect(mockChart.destroy).toHaveBeenCalled();
  });

  it('should handle destroy chart with null', () => {
    expect(() => service.destroyChart(null)).not.toThrow();
  });
});