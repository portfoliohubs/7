/**
 * Image processing utilities
 * Converts images to WebP format and encodes to base64
 */

export interface ProcessedImage {
  base64: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Converts an image file to WebP format and returns base64 encoded string
 * @param file - Image file to process
 * @param maxWidth - Maximum width for the image (default: 800px)
 * @param quality - WebP quality 0-1 (default: 0.85)
 * @returns Promise with base64 encoded WebP image
 */
export async function processImageToWebP(
  file: File,
  maxWidth: number = 800,
  quality: number = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for conversion
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Calculate dimensions maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP and get base64
        const base64 = canvas.toDataURL('image/webp', quality);

        resolve(base64);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Creates a thumbnail preview of an image
 * @param file - Image file
 * @param maxSize - Maximum width/height for thumbnail (default: 200px)
 * @returns Promise with base64 thumbnail
 */
export async function createThumbnail(
  file: File,
  maxSize: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        let width = img.width;
        let height = img.height;

        // Create square thumbnail
        const size = Math.min(width, height, maxSize);

        canvas.width = size;
        canvas.height = size;

        // Center crop
        const sx = (width - size) / 2;
        const sy = (height - size) / 2;

        ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);

        const thumbnail = canvas.toDataURL('image/jpeg', 0.7);
        resolve(thumbnail);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validates image file size and dimensions
 * @param file - Image file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 10MB)
 * @returns Promise with validation result
 */
export async function validateImage(
  file: File,
  maxSizeMB: number = 10
): Promise<{ valid: boolean; error?: string }> {
  // Check file size
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > maxSizeMB) {
    return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit` };
  }

  // Check file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Use JPG, PNG, WebP, or GIF' };
  }

  return { valid: true };
}

/**
 * Compresses multiple images progressively
 * @param files - Array of image files
 * @param onProgress - Progress callback
 * @returns Promise with array of base64 strings
 */
export async function processImagesProgressive(
  files: File[],
  onProgress?: (current: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const result = await processImageToWebP(files[i]);
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }

  return results;
}
