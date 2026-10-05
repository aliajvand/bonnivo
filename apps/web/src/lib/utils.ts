import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return "";
  const str = input.toString();
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
}

/**
 * Normalizes Persian and Arabic digits to standard English digits
 */
export function toEnglishDigits(input: string): string {
  if (!input) return "";
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632));
}

/**
 * Formats a number with Persian locale grouping separators
 */
export function formatPersianNumber(n: number | undefined | null): string {
  if (n === undefined || n === null || isNaN(n)) return "۰";
  return n.toLocaleString("fa-IR");
}

/**
 * Formats currency in Tomans with Persian numerals
 */
export function formatPersianCurrency(amountTomans: number | undefined | null): string {
  if (amountTomans === undefined || amountTomans === null || isNaN(amountTomans)) return "۰ تومان";
  return `${formatPersianNumber(amountTomans)} تومان`;
}

