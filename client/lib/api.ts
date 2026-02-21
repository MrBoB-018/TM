import { PaginationResponse, Task } from "../types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(url: string, options: RequestInit = {}, retry = true): Promise<T> {
  const token = localStorage.getItem("accessToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(BASE + url, { headers, ...options, credentials: "include" });

  if (res.status === 401 && retry) {
    // try refresh
    const refreshed = await fetch(BASE + "/auth/refresh", { method: "POST", credentials: "include" });
    if (refreshed.ok) {
      const data = await refreshed.json();
      localStorage.setItem("accessToken", data.accessToken);
      return request(url, options, false);
    } else {
      localStorage.removeItem("accessToken");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Unauthorized");
    }
  }

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API error");
  }

  return res.json();
}

export const fetchTasks = (page: number, limit: number, status?: string, search?: string) =>
  request<PaginationResponse<Task>>(
    `/tasks?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`
  );

export const createTask = (body: { title: string; description: string }) =>
  request<Task>("/tasks", { method: "POST", body: JSON.stringify(body) });

export const updateTask = (id: string, body: { title: string; description: string; status?: string }) =>
  request<Task>(`/tasks/${id}`, { method: "PATCH", body: JSON.stringify(body) });

export const deleteTask = (id: string) => request<{ message: string }>(`/tasks/${id}`, { method: "DELETE" });

export const toggleTask = (id: string) => request<Task>(`/tasks/${id}/toggle`, { method: "PATCH" });
