"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task, Priority } from "@/types";
import { tasksApi } from "@/lib/api";
import { Header } from "@/components/layout/header";
import { TaskItem, TaskItemSkeleton } from "@/components/tasks/task-item";
import { TaskForm } from "@/components/tasks/task-form";
import { FilterBar } from "@/components/tasks/filter-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, ListTodo, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority | "">("");
  const [categoryId, setCategoryId] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await tasksApi.getAll({
        search: search || undefined,
        priority: priority || undefined,
        categoryId: categoryId || undefined,
        completed: showCompleted ? undefined : false,
      });
      if (result.success && result.data) {
        setTasks(result.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [search, priority, categoryId, showCompleted]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {pendingCount} pending, {completedCount} completed
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <FilterBar
              search={search}
              onSearchChange={setSearch}
              priority={priority}
              onPriorityChange={setPriority}
              categoryId={categoryId}
              onCategoryIdChange={(value) => setCategoryId(value || "")}
              showCompleted={showCompleted}
              onShowCompletedChange={setShowCompleted}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Task List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <TaskItemSkeleton />
                <TaskItemSkeleton />
                <TaskItemSkeleton />
              </>
            ) : tasks.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No tasks found</p>
                <p className="text-sm">
                  {search || priority || categoryId
                    ? "Try adjusting your filters"
                    : "Create your first task to get started"}
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={fetchTasks}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </CardContent>
        </Card>
      </main>

      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSuccess={fetchTasks}
      />
    </div>
  );
}
