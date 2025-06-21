// Admin utility functions and helper methods

/**
 * Format a date for display in the admin panel
 * @param date ISO date string or Date object
 * @returns Formatted date string
 */
export const formatDate = (date: string | Date): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format currency for display
 * @param amount Number to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Truncate long text with ellipsis
 * @param text Text to truncate
 * @param length Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, length: number = 50): string => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

/**
 * Generate a unique ID for new content
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Validate file type against allowed types
 * @param file The file to validate
 * @param allowedTypes Array of MIME type strings
 * @returns Boolean indicating if file type is allowed
 */
export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.some(type => {
    // Handle wildcard types like 'image/*'
    if (type.endsWith('/*')) {
      const mainType = type.split('/')[0];
      return file.type.startsWith(`${mainType}/`);
    }
    return file.type === type;
  });
};

/**
 * Validate file size
 * @param file The file to validate
 * @param maxSizeMB Maximum size in megabytes
 * @returns Boolean indicating if file size is within limits
 */
export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

/**
 * Get file size in human-readable format
 * @param bytes Size in bytes
 * @returns Formatted size string (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url YouTube URL
 * @returns YouTube video ID
 */
export const getYoutubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Match YouTube URL patterns
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[7].length === 11) ? match[7] : null;
};

/**
 * Simple email validation
 * @param email Email address to validate
 * @returns Boolean indicating if email format is valid
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};