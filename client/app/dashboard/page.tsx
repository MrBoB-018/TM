"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Task } from "../../types";
import {
  fetchTasks,
  createTask as apiCreate,
  updateTask as apiUpdate,
  deleteTask as apiDelete,
  toggleTask as apiToggle,
} from "../../lib/api";
import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";
import Pagination from "../../components/Pagination";
import { FiPlus, FiSearch, FiFilter, FiLoader } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { MdDashboard } from "react-icons/md";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
    }
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchTasks(page, limit, status, search);
      setTasks((res.data as Task[]) || []);
      setTotal(res.total || 0);
    } catch (err: any) {
      toast.error(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, status, search]);

  const handleCreate = async (title: string, description: string) => {
    try {
      await apiCreate({ title, description });
      toast.success("Task added successfully!");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to add task");
    }
  };

  const handleUpdate = async (id: string, title: string, description: string) => {
    try {
      await apiUpdate(id, { title, description });
      toast.success("Task updated successfully!");
      setEditingTask(null);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiDelete(id);
      toast.success("Task deleted successfully!");
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete task");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await apiToggle(id);
      load();
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle task");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl ring-1 ring-zinc-700/50">
            <MdDashboard className="w-6 h-6 text-zinc-300" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            My Tasks
          </h1>
        </div>
        <p className="text-zinc-500 ml-14">Manage and organize your daily tasks efficiently</p>
      </div>

      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200"
            />
          </div>
          
          <div className="relative sm:w-48">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setEditingTask({ id: "", title: "", description: "", status: "PENDING", userId: "", createdAt: "", updatedAt: "" })}
          className="group flex items-center justify-center gap-2 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 hover:from-zinc-600 hover:via-zinc-500 hover:to-zinc-600 text-zinc-100 font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-zinc-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900 whitespace-nowrap"
        >
          <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Add New Task
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-zinc-600 rounded-full animate-spin"></div>
            <FiLoader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-zinc-600" />
          </div>
          <p className="mt-4 text-zinc-500 font-medium">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-zinc-900/40 to-zinc-950/40 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 rounded-2xl ring-1 ring-zinc-700/50 mb-4">
            <HiSparkles className="w-12 h-12 text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">No tasks found</h3>
          <p className="text-zinc-500 mb-6 text-center max-w-md">
            {search || status ? "Try adjusting your filters" : "Get started by creating your first task"}
          </p>
          {!search && !status && (
            <button
              onClick={() => setEditingTask({ id: "", title: "", description: "", status: "PENDING", userId: "", createdAt: "", updatedAt: "" })}
              className="flex items-center gap-2 bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 font-medium px-5 py-2.5 rounded-lg transition-all duration-200 border border-zinc-700"
            >
              <FiPlus className="w-4 h-4" />
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onEdit={() => setEditingTask(t)}
              onDelete={() => handleDelete(t.id)}
              onToggle={() => handleToggle(t.id)}
            />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        total={total}
        limit={limit}
        setPage={setPage}
      />

      {editingTask && (
        <TaskForm
          task={editingTask.id ? editingTask : undefined}
          onCancel={() => setEditingTask(null)}
          onSave={(title, desc) => {
            if (editingTask.id) handleUpdate(editingTask.id, title, desc);
            else handleCreate(title, desc);
          }}
        />
      )}
    </div>
  );
}