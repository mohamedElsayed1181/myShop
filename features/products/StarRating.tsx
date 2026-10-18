import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  count?: number;
  className?: string;
}

export default function StarRating({ rating, count, className }: StarRatingProps) {
  const rounded = Math.round(rating);

  return (
    <div
      className={cn("flex items-center gap-1.5", className)}
      aria-label={`Rated ${rating} out of 5`}
    >
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              "size-3.5",
              index < rounded
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/40"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
        {typeof count === "number" ? ` (${count})` : ""}
      </span>
    </div>
  );
}
