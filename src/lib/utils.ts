import { ErrorMessage } from '@/types/default';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as Sentry from '@sentry/nextjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function captureSentryException(message: ErrorMessage) {
  Sentry.captureException(
    `title: ${message.title},
    message: ${message.message}`
  );
}
