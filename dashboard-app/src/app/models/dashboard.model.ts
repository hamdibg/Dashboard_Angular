export interface ChartData {
    name: string;
    value: number;
    date: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  export interface KPI {
    title: string;
    value: number;
    trend: number;
    icon: string;
  }