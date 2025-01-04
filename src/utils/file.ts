export type FileType = 'image' | 'audio' | 'video' | string;

export const splitFilename = (filename: string) => {
  const parts = filename.split('.');
  const name = parts.slice(0, -1).join('.');
  const extension = parts.pop();
  return { name, extension };
};

export const getFileType = (name: string): FileType => {
  const extension = name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image';
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'audio';
    default:
      return 'unknown';
  }
};
