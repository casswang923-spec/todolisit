import type { Category } from "@/types";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryBadge({ category, onClick }: CategoryBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="cursor-pointer hover:opacity-80"
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        borderColor: `${category.color}40`,
      }}
      onClick={onClick}
    >
      {category.name}
    </Badge>
  );
}
