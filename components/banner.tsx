import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-full",
    {
        variants: {
            variant: {
                warning: "bg-[hsl(var(--accent))] border-[hsl(var(--accent-foreground))]/20 text-[hsl(var(--accent-foreground))]",
                success: "bg-[hsl(var(--success))] border-[hsl(var(--success-foreground))]/20 text-[hsl(var(--success-foreground))]",
            }
        },
        defaultVariants: {
            variant: "warning",
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
};

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
};

export const Banner = ({
    label,
    variant,
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="h-4 w-4 mr-2" />
            {label}
        </div>
    );
};