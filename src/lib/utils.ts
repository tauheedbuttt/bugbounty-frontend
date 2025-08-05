import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatMode = "short" | "comma";

export function formatNumber(
  value: unknown,
  mode: FormatMode = "short"
): string {
  const num = Number(value);

  if (isNaN(num) || value === null || value === undefined) return "0";

  return mode === "short" ? formatShort(num) : formatComma(num);
}

function formatShort(num: number): string {
  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const format = (n: number, suffix: string) => {
    const rounded = parseFloat(n.toFixed(1));
    const str = rounded.toString();
    return sign + str + suffix;
  };

  if (absNum >= 1e12) return format(absNum / 1e12, "T");
  if (absNum >= 1e9) return format(absNum / 1e9, "B");
  if (absNum >= 1e6) return format(absNum / 1e6, "M");

  // handle 999,999 → 1M rounding
  if (absNum >= 1e3) {
    const scaled = absNum / 1e3;
    if (scaled >= 999.5) {
      return format(absNum / 1e6, "M");
    }
    return format(scaled, "K");
  }

  return sign + absNum.toLocaleString();
}

function formatComma(num: number): string {
  const rounded = Math.round(num * 100) / 100; // round to 2 decimals safely
  return rounded.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function getProgramReward(prices: { min: number; max: number }) {
  const sameReward = prices?.min === prices?.max;
  const reward = sameReward
    ? formatNumber(prices?.min)
    : `${formatNumber(prices?.min)} - ${formatNumber(prices?.max)}`;
  return reward;
}

export function programTimeLeft(updatedAt?: string, currentLanguage = "en") {
  if (!updatedAt) return "";
  return dayjs(updatedAt).locale(currentLanguage).fromNow();
}

// Pagination display calculator
interface PaginationDisplay {
  start: number;
  end: number;
  total: number;
  displayText: string;
}
export function calculatePaginationDisplay(
  page: number,
  limit: number,
  total: number,
  currentLanguage?: string
): PaginationDisplay {
  // Handle edge cases
  if (total === 0) {
    const zeroDisplayText = currentLanguage === "ar" ? "0 من 0-0" : "0-0 of 0";

    return {
      start: 0,
      end: 0,
      total: 0,
      displayText: zeroDisplayText,
    };
  }

  // Calculate start index (1-based)
  const start = Math.min((page - 1) * limit + 1, total);

  // Calculate end index
  const end = Math.min(page * limit, total);

  // Format display text based on language
  const displayText =
    currentLanguage === "ar"
      ? `${formatNumber(total, "comma")} من ${formatNumber(
          start,
          "comma"
        )}-${formatNumber(end, "comma")}`
      : `${formatNumber(start, "comma")}-${formatNumber(
          end,
          "comma"
        )} of ${formatNumber(total, "comma")}`;

  return {
    start,
    end,
    total,
    displayText,
  };
}
