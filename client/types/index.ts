export interface User {
  id: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
}

export interface APIResponse {
  message?: string;
}
