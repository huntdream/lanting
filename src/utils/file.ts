export type FileType = 'image' | 'audio' | 'video' | string;

export const splitFilename = (filename: string) => {
  const parts = filename.split('.');
  const name = parts.slice(0, -1).join('.');
  const extension = parts.pop();
  return { name, extension };
};

export const getFileType = (name: string): FileType => {
  if (!name) return 'unknown';

  const extension = name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'svg':
    case 'webp':
      return 'image';
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return 'audio';
    default:
      return 'unknown';
  }
};

export const imageUrlToFile = async (url: string) => {
  const fileName = url.split('/').pop() || 'file';
  const response = await fetch(url);
  const blob = await response.blob();

  const file = new File([blob], fileName, { type: blob.type });
  return file;
};
