import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToNow = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds`;
  }
  if (minutes < 60) {
    return `${minutes} minutes`;
  }
  if (hours < 24) {
    return `${hours} hours`;
  }
  if (days < 7) {
    return `${days} days`;
  }
  if (weeks < 4) {
    return `${weeks} weeks`;
  }
  if (months < 12) {
    return `${months} months`;
  }
  return `${years} years`;
};
