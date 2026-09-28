"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

import { cn } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "onError"> & {
    fallbackClassName?: string;
};

// next/image that shows "Image not available" when the file is gone,
// instead of a broken image icon. Must sit inside a relative container.
export const SafeImage = ({ src, alt, fallbackClassName, ...props }: SafeImageProps) => {
    const [failed, setFailed] = useState(false);

    // A new src gets a fresh chance to load.
    useEffect(() => setFailed(false), [src]);

    if (failed || !src) {
        return (
            <div
                className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center gap-y-1 text-muted-foreground",
                    fallbackClassName
                )}
            >
                <ImageOff className="h-6 w-6" />
                <p className="text-xs">Image not available</p>
            </div>
        );
    }

    return <Image src={src} alt={alt} onError={() => setFailed(true)} {...props} />;
};