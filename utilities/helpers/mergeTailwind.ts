import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export const mergeTailwind = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
