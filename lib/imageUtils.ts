// Error messages are stable codes (not user-facing text) so callers can map them
// to a localized string via i18n instead of showing raw English in the UI.
export type ImageProcessingErrorCode = 'invalidFileType' | 'fileTooLarge' | 'canvasError' | 'loadError' | 'readError';

export const fnProcessImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Security: Validate file type before processing to prevent loading or executing unsafe/unsupported files.
    const aAllowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!file || !aAllowedTypes.includes(file.type)) {
      reject(new Error('invalidFileType' satisfies ImageProcessingErrorCode));
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      reject(new Error('fileTooLarge' satisfies ImageProcessingErrorCode));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1024;

        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('canvasError' satisfies ImageProcessingErrorCode));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => reject(new Error('loadError' satisfies ImageProcessingErrorCode));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('readError' satisfies ImageProcessingErrorCode));
    reader.readAsDataURL(file);
  });
};
