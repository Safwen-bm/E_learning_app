import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
    value: number;
    variant?: "default" | "success";
    size?: "default" | "lg";
}

export const CourseProgress = ({
    value,
    variant = "default",
    size = "default",
}: CourseProgressProps) => {
    return (
        <div className="space-y-3">
            <Progress value={value} variant={variant} className="h-4" />
            <p className={cn(
                "font-bold text-lg",
                variant === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-primary"
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    );
};