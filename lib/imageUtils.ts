export const fnProcessImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Security: Validate file type before processing to prevent loading or executing unsafe/unsupported files.
    const aAllowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!file || !aAllowedTypes.includes(file.type)) {
      reject(new Error('Invalid file type. Only JPEG, PNG, and WEBP images are allowed.'));
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      reject(new Error('File size exceeds 6MB limit.'));
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
          reject(new Error('Failed to get canvas context.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
};
