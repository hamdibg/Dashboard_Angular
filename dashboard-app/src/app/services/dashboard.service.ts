import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ChartData, KPI, User } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getChartData(): Observable<ChartData[]> {
    return of([
      { name: 'Jan', value: 400, date: '2024-01' },
      { name: 'Feb', value: 300, date: '2024-02' },
      { name: 'Mar', value: 500, date: '2024-03' },
      { name: 'Apr', value: 450, date: '2024-04' },
      { name: 'May', value: 600, date: '2024-05' }
    ]);
  }

  getKPIs(): Observable<KPI[]> {
    return of([
      { title: 'Total Users', value: 2500, trend: 12.5, icon: 'users' },
      { title: 'Revenue', value: 45000, trend: 8.2, icon: 'dollar-sign' },
      { title: 'Orders', value: 850, trend: -2.4, icon: 'shopping-cart' },
      { title: 'Conversion Rate', value: 3.2, trend: 1.8, icon: 'percent' }
    ]);
  }

  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User' }
    ]);
  }
}