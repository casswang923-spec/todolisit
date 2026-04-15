export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Theme = "LIGHT" | "DARK" | "SYSTEM";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: Priority;
  dueDate: string | null;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category | null;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    tasks: number;
  };
}

export interface Settings {
  id: string;
  theme: Theme;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
