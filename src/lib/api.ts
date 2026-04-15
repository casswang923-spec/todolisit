import type { ApiResponse, Task, Category, Settings, Priority } from "@/types";

const API_BASE = "/api";

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const json = await res.json();
  if (!res.ok) {
    return { success: false, error: json.error || "An error occurred" };
  }
  return { success: true, data: json.data as T };
}

export const tasksApi = {
  async getAll(params?: {
    search?: string;
    priority?: Priority;
    categoryId?: string;
    completed?: boolean;
  }): Promise<ApiResponse<Task[]>> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set("search", params.search);
    if (params?.priority) searchParams.set("priority", params.priority);
    if (params?.categoryId) searchParams.set("categoryId", params.categoryId);
    if (params?.completed !== undefined)
      searchParams.set("completed", String(params.completed));

    const query = searchParams.toString();
    const res = await fetch(`${API_BASE}/tasks${query ? `?${query}` : ""}`);
    return handleResponse<Task[]>(res);
  },

  async getById(id: string): Promise<ApiResponse<Task>> {
    const res = await fetch(`${API_BASE}/tasks/${id}`);
    return handleResponse<Task>(res);
  },

  async create(data: {
    title: string;
    description?: string;
    priority?: Priority;
    dueDate?: string;
    categoryId?: string;
  }): Promise<ApiResponse<Task>> {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },

  async update(
    id: string,
    data: Partial<{
      title: string;
      description: string;
      priority: Priority;
      dueDate: string;
      categoryId: string;
      completed: boolean;
    }>
  ): Promise<ApiResponse<Task>> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(res);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      return { success: false, error: data.error };
    }
    return { success: true };
  },

  async toggleComplete(id: string, completed: boolean): Promise<ApiResponse<Task>> {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return handleResponse<Task>(res);
  },
};

export const categoriesApi = {
  async getAll(): Promise<ApiResponse<Category[]>> {
    const res = await fetch(`${API_BASE}/categories`);
    return handleResponse<Category[]>(res);
  },

  async getById(id: string): Promise<ApiResponse<Category>> {
    const res = await fetch(`${API_BASE}/categories/${id}`);
    return handleResponse<Category>(res);
  },

  async create(data: { name: string; color?: string }): Promise<ApiResponse<Category>> {
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Category>(res);
  },

  async update(
    id: string,
    data: Partial<{ name: string; color: string }>
  ): Promise<ApiResponse<Category>> {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Category>(res);
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      return { success: false, error: data.error };
    }
    return { success: true };
  },
};

export const settingsApi = {
  async get(): Promise<ApiResponse<Settings>> {
    const res = await fetch(`${API_BASE}/settings`);
    return handleResponse<Settings>(res);
  },

  async update(data: { theme: string }): Promise<ApiResponse<Settings>> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Settings>(res);
  },
};
