"use client";

import { useState } from "react";
import type { Task } from "@/types";
import { tasksApi } from "@/lib/api";
import { PriorityBadge } from "@/components/ui/priority-badge";
import { CategoryBadge } from "@/components/ui/category-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      const result = await tasksApi.toggleComplete(task.id, !task.completed);
      if (result.success) {
        onUpdate();
      } else {
        toast.error(result.error || "Failed to update task");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const result = await tasksApi.delete(task.id);
      if (result.success) {
        toast.success("Task deleted");
        onDelete(task.id);
      } else {
        toast.error(result.error || "Failed to delete task");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return null;
    const d = new Date(date);
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return { text: `Overdue by ${Math.abs(days)} day${Math.abs(days) > 1 ? "s" : ""}`, overdue: true };
    } else if (days === 0) {
      return { text: "Due today", overdue: false };
    } else if (days === 1) {
      return { text: "Due tomorrow", overdue: false };
    } else {
      return { text: `Due in ${days} days`, overdue: false };
    }
  };

  const dueInfo = formatDate(task.dueDate);

  return (
    <Card className={`p-4 transition-all ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          disabled={isLoading}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </span>
            <PriorityBadge priority={task.priority} />
            {task.category && <CategoryBadge category={task.category} />}
          </div>
          {task.description && (
            <p className={`text-sm text-muted-foreground mt-1 ${task.completed ? "line-through" : ""}`}>
              {task.description}
            </p>
          )}
          {dueInfo && (
            <div className={`flex items-center gap-1 text-xs mt-2 ${dueInfo.overdue ? "text-red-500" : "text-muted-foreground"}`}>
              <Calendar className="h-3 w-3" />
              {dueInfo.text}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function TaskItemSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Skeleton className="h-5 w-5" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </Card>
  );
}
