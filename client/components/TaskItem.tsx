"use client";

import { Task } from "../types";
import { FiEdit2, FiTrash2, FiCheck, FiRotateCcw, FiClock } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi2";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

export default function TaskItem({ task, onEdit, onDelete, onToggle }: Props) {
  const isCompleted = task.status === "COMPLETED";

  return (
    <div
      className={`group relative p-6 bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-zinc-800/20 ${
        isCompleted
          ? "border-zinc-800/40 opacity-60"
          : "border-zinc-800/60 hover:border-zinc-700"
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3 mb-2">
            <button
              onClick={onToggle}
              className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                isCompleted
                  ? "bg-zinc-700 border-zinc-600 hover:bg-zinc-600"
                  : "border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800/50"
              }`}
            >
              {isCompleted && <FiCheck className="w-4 h-4 text-zinc-200" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold mb-1 transition-all duration-200 ${
                  isCompleted
                    ? "text-zinc-500 line-through"
                    : "text-zinc-100"
                }`}
              >
                {task.title}
              </h3>
              <p
                className={`text-sm leading-relaxed transition-all duration-200 ${
                  isCompleted ? "text-zinc-600 line-through" : "text-zinc-400"
                }`}
              >
                {task.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 ml-9">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${
                isCompleted
                  ? "bg-zinc-800/50 text-zinc-500 border border-zinc-800"
                  : "bg-zinc-800/70 text-zinc-400 border border-zinc-700"
              }`}
            >
              {isCompleted ? (
                <>
                  <HiCheckCircle className="w-3.5 h-3.5" />
                  Completed
                </>
              ) : (
                <>
                  <FiClock className="w-3.5 h-3.5" />
                  Pending
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className={`p-2.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
              isCompleted
                ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 focus:ring-zinc-700"
                : "text-zinc-400 hover:text-green-400 hover:bg-green-500/10 focus:ring-green-500/50"
            }`}
            title={isCompleted ? "Mark as pending" : "Mark as complete"}
          >
            {isCompleted ? (
              <FiRotateCcw className="w-5 h-5" />
            ) : (
              <FiCheck className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={onEdit}
            className="p-2.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
            title="Edit task"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>

          <button
            onClick={onDelete}
            className="p-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
            title="Delete task"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}