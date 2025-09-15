import { format, isValid, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Safely formats a date value, handling various input types and invalid dates
 * @param dateValue - The date value to format (Date, string, number, or null/undefined)
 * @param formatString - The format string for date-fns
 * @param fallback - Fallback text when date is invalid (default: "-")
 * @returns Formatted date string or fallback text
 */
export const safeFormatDate = (
  dateValue: any,
  formatString: string,
  fallback: string = '-'
): string => {
  if (!dateValue) return fallback;

  let date: Date;

  // If it's already a Date object
  if (dateValue instanceof Date) {
    date = dateValue;
  }
  // If it's a string, try to parse it
  else if (typeof dateValue === 'string') {
    date = parseISO(dateValue);
  }
  // If it's a number (timestamp), create Date from it
  else if (typeof dateValue === 'number') {
    date = new Date(dateValue);
  }
  // Fallback to current date if invalid
  else {
    date = new Date();
  }

  // Check if the date is valid
  if (!isValid(date)) {
    return fallback;
  }

  try {
    return format(date, formatString, { locale: id });
  } catch (error) {
    console.error('Error formatting date:', error, dateValue);
    return fallback;
  }
};

/**
 * Safely formats a date with time, handling various input types
 * @param dateValue - The date value to format
 * @param fallback - Fallback text when date is invalid (default: "-")
 * @returns Formatted date string with time or fallback text
 */
export const safeFormatDateTime = (
  dateValue: any,
  fallback: string = '-'
): string => {
  return safeFormatDate(dateValue, 'dd MMM yyyy HH:mm', fallback);
};

/**
 * Safely formats a date without time, handling various input types
 * @param dateValue - The date value to format
 * @param fallback - Fallback text when date is invalid (default: "-")
 * @returns Formatted date string without time or fallback text
 */
export const safeFormatDateOnly = (
  dateValue: any,
  fallback: string = '-'
): string => {
  return safeFormatDate(dateValue, 'dd MMM yyyy', fallback);
};

/**
 * Safely formats a date with full month name, handling various input types
 * @param dateValue - The date value to format
 * @param fallback - Fallback text when date is invalid (default: "-")
 * @returns Formatted date string with full month or fallback text
 */
export const safeFormatDateFullMonth = (
  dateValue: any,
  fallback: string = '-'
): string => {
  return safeFormatDate(dateValue, 'dd MMMM yyyy', fallback);
};
