import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { ChartData, KPI } from '../../models/dashboard.model';

/**
 * DashboardComponent serves as the main analytics dashboard view
 * 
 * @class DashboardComponent
 * @implements OnInit
 * @description Displays key performance indicators (KPIs) and analytics charts
 *              Features include:
 *              - Real-time KPI metrics display
 *              - Trend indicators with percentage changes
 *              - Interactive charts using Chart.js
 *              - Responsive layout for various screen sizes
 * 
 * @dependencies
 * - Chart.js for data visualization
 * - DashboardService for data fetching
 * - CommonModule for common Angular directives
 * 
 * @example
 * <app-dashboard></app-dashboard>
 */

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="dashboard">
      <div class="kpi-cards">
        @for (kpi of kpis; track kpi.title) {
          <div class="kpi-card" [ngClass]="{'positive': kpi.trend > 0, 'negative': kpi.trend < 0}">
            <div class="kpi-icon">
              <i class="fas fa-{{kpi.icon}}"></i>
            </div>
            <div class="kpi-content">
              <h3 class="kpi-title">{{kpi.title}}</h3>
              <div class="kpi-value">{{formatValue(kpi.value)}}</div>
              <div class="kpi-trend">
                <i class="fas fa-{{kpi.trend > 0 ? 'arrow-up' : 'arrow-down'}}"></i>
                {{Math.abs(kpi.trend)}}%
              </div>
            </div>
          </div>
        }
      </div>

      <div class="charts-container">
        <div class="chart-card">
          <h3>Revenue Trend</h3>
          <canvas #revenueCanvas></canvas>
        </div>
        
        <div class="chart-card">
          <h3>Monthly Performance</h3>
          <canvas #performanceCanvas></canvas>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="activity-section">
        <h3>Recent Activity</h3>
        <div class="activity-list">
          @for (activity of recentActivities; track activity.id) {
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-{{activity.icon}}"></i>
              </div>
              <div class="activity-details">
                <div class="activity-message">{{activity.message}}</div>
                <div class="activity-time">{{activity.time | date:'short'}}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
      background-color: #f8f9fa;
    }

    .kpi-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .kpi-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      transition: transform 0.2s;
    }

    .kpi-card:hover {
      transform: translateY(-5px);
    }

    .kpi-icon {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 50%;
      margin-right: 15px;
    }

    .kpi-content {
      flex: 1;
    }

    .kpi-title {
      color: #6c757d;
      font-size: 0.9rem;
      margin: 0;
    }

    .kpi-value {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 5px 0;
    }

    .kpi-trend {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .kpi-trend.positive {
      color: #28a745;
    }

    .kpi-trend.negative {
      color: #dc3545;
    }

    .charts-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .chart-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      height: 400px;
    }

    canvas {
      width: 100% !important;
      height: 300px !important;
    }
  `]
})

export class DashboardComponent implements OnInit {
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef;
  @ViewChild('performanceCanvas') performanceCanvas!: ElementRef;
  
  private platformId = inject(PLATFORM_ID);
  private revenueChart: Chart | null = null;
  private performanceChart: Chart | null = null;

  kpis: KPI[] = [];
  chartData: ChartData[] = [];
  recentActivities: any[] = [];
  Math = Math; 

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadKPIs();
    this.loadChartData();
    this.loadRecentActivities();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCharts();
    }
  }

  private initializeCharts() {
    if (!this.revenueCanvas || !this.performanceCanvas) return;

    const revenueCtx = this.revenueCanvas.nativeElement.getContext('2d');
    const performanceCtx = this.performanceCanvas.nativeElement.getContext('2d');

    this.revenueChart = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: this.chartData.map(d => d.name),
        datasets: [{
          label: 'Revenue',
          data: this.chartData.map(d => d.value),
          borderColor: '#3498db',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    this.performanceChart = new Chart(performanceCtx, {
      type: 'bar',
      data: {
        labels: this.chartData.map(d => d.name),
        datasets: [{
          label: 'Performance',
          data: this.chartData.map(d => d.value),
          backgroundColor: '#2ecc71'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private loadKPIs() {
    this.dashboardService.getKPIs().subscribe({
      next: (data: KPI[]) => {
        this.kpis = data;
      },
      error: (error) => {
        console.error('Error loading KPIs:', error);
      }
    });
  }

  private loadChartData() {
    this.dashboardService.getChartData().subscribe({
      next: (data: ChartData[]) => {
        this.chartData = data;
        this.updateCharts();
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
      }
    });
  }

  private loadRecentActivities() {
    this.recentActivities = [
      {
        id: 1,
        message: 'New order received',
        icon: 'shopping-cart',
        time: new Date()
      },
      {
        id: 2,
        message: 'Payment processed',
        icon: 'credit-card',
        time: new Date(Date.now() - 3600000)
      },
      {
        id: 3,
        message: 'New user registered',
        icon: 'user-plus',
        time: new Date(Date.now() - 7200000)
      }
    ];
  }

  private updateCharts() {
    if (this.revenueChart && this.performanceChart) {
      this.revenueChart.data.labels = this.chartData.map(d => d.name);
      this.revenueChart.data.datasets[0].data = this.chartData.map(d => d.value);
      this.revenueChart.update();

      this.performanceChart.data.labels = this.chartData.map(d => d.name);
      this.performanceChart.data.datasets[0].data = this.chartData.map(d => d.value);
      this.performanceChart.update();
    }
  }

  formatValue(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  }

  ngOnDestroy() {
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
    if (this.performanceChart) {
      this.performanceChart.destroy();
    }
  }
}