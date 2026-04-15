"use client";

import { useState, useEffect } from "react";
import type { Category, Priority } from "@/types";
import { categoriesApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  priority: Priority | "";
  onPriorityChange: (value: Priority | "") => void;
  categoryId: string;
  onCategoryIdChange: (value: string | null) => void;
  showCompleted: boolean;
  onShowCompletedChange: (value: boolean) => void;
}

export function FilterBar({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  categoryId,
  onCategoryIdChange,
  showCompleted,
  onShowCompletedChange,
}: FilterBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const result = await categoriesApi.getAll();
    if (result.success && result.data) {
      setCategories(result.data);
    }
  };

  const hasActiveFilters = search || priority || categoryId || !showCompleted;

  const clearFilters = () => {
    onSearchChange("");
    onPriorityChange("");
    onCategoryIdChange("");
    onShowCompletedChange(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={priority} onValueChange={(v) => onPriorityChange(v as Priority | "")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All priorities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryId} onValueChange={onCategoryIdChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Badge
            variant={showCompleted ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => onShowCompletedChange(!showCompleted)}
          >
            {showCompleted ? "Hide completed" : "Show completed"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
