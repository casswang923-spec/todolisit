import type { Priority } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowUp,
  Minus,
} from "lucide-react";

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig = {
  LOW: {
    label: "Low",
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    icon: Minus,
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    icon: ArrowUp,
  },
  HIGH: {
    label: "High",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    icon: AlertCircle,
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <Badge variant="secondary" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  );
}
