const loadImage = (image: string | File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!image) return reject(new Error('No image provided'));

    if (typeof image === 'string') {
      const img = new Image();
      img.src = image;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          resolve(img);
        };

        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
    }
  });
};

export default loadImage;
