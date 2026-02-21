"use client";

import { FormEvent, useState } from "react";
import { FiX, FiSave, FiEdit3, FiPlus } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface Props {
  task?: { id: string; title: string; description: string };
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSave(title, description);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-zinc-800 ring-1 ring-zinc-700/30 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-2.5 rounded-xl ring-1 ring-zinc-700/50">
              {task ? (
                <FiEdit3 className="w-5 h-5 text-zinc-300" />
              ) : (
                <FiPlus className="w-5 h-5 text-zinc-300" />
              )}
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Description
            </label>
            <textarea
              placeholder="Add task details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-5 py-3 rounded-xl border-2 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 hover:border-zinc-700 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 hover:from-zinc-600 hover:via-zinc-500 hover:to-zinc-600 text-zinc-100 font-semibold rounded-xl shadow-lg hover:shadow-zinc-800/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-300 border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  Save Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}