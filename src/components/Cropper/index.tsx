import React, {
  FC,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import loadImage from './loadImage';
import './style.scss';
import useUpload, { IFile } from 'hooks/useUpload';

export interface CropperProps {
  image: string;
  size?: number;
  ref?: RefObject<CropperRef | null>;
}

export interface CropperRef {
  crop: () => Promise<IFile | undefined>;
}

interface Point {
  x: number;
  y: number;
  r: number;
}

const Cropper: FC<CropperProps> = ({ image, size = 400, ref }) => {
  const [imageData, setImageData] = useState<string>(image);
  const [point, setPoint] = useState<Point>({ x: 0, y: 0, r: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragPoint, setDragPoint] = useState<Point>();
  const [direction, setDirection] = useState<'west' | 'east'>();

  const [upload] = useUpload();

  const box = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!image || !imageRef.current) return;
    const { width } = imageRef.current.getBoundingClientRect();

    loadImage(image).then((img) => {
      setImageData(img.src);
      const ratio = width / img.naturalWidth;

      setPoint({
        x: width / 2 - 50,
        y: (img.naturalHeight * ratio) / 2 - 50,
        r: 100,
      });
    });
  }, [image]);

  useEffect(() => {
    if (!overlay.current) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();

      const target = e.target as HTMLDivElement;

      if (target === box.current) {
        setDragging(true);
      } else if (target.classList.contains('handler')) {
        setResizing(true);
        setDirection(target.dataset.direction as 'west' | 'east' | undefined);
      } else {
        return;
      }

      setDragPoint({ x: e.clientX, y: e.clientY, r: point.r });
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();

      if (
        (!dragging && !resizing) ||
        !dragPoint ||
        !box.current ||
        !overlay.current
      )
        return;

      const offsetX = e.clientX - dragPoint.x;
      const offsetY = e.clientY - dragPoint.y;

      const { width, height } = overlay.current.getBoundingClientRect();
      const { width: boxWidth, height: boxHeight } =
        box.current.getBoundingClientRect();

      let x = point.x;
      let y = point.y;
      let r = point.r;

      if (resizing) {
        const sign = direction === 'east' ? -1 : 1;
        const offset = (sign * offsetX) / 2;

        x = x + offset;
        y = y + offset;
        r = r - sign * offsetX;
      } else {
        x = point.x + offsetX;
        y = point.y + offsetY;
      }

      x = Math.min(Math.max(0, x), width - boxWidth);
      y = Math.min(Math.max(0, y), height - boxHeight);
      r = Math.min(Math.max(20, r), width);

      setPoint({
        x,
        y,
        r,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setDragging(false);
      setResizing(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [box.current, dragPoint, dragging, resizing]);

  useImperativeHandle(ref, () => ({
    crop() {
      return handleCrop();
    },
  }));

  const handleCrop = async () => {
    if (!imageRef.current || !overlay.current) return;

    const img = await loadImage(image);

    if (img) {
      const containerBox = overlay.current.getBoundingClientRect();
      const imageBox = imageRef.current.getBoundingClientRect();

      const ratio = img.width / containerBox.width;

      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      canvas.width = size;
      canvas.height = size;
      const sx = (point.x - (imageBox.left - containerBox.left)) * ratio;
      const sy = (point.y - (imageBox.top - containerBox.top)) * ratio;
      const r = point.r * ratio;

      ctx?.drawImage(img, sx, sy, r, r, 0, 0, size, size);

      return new Promise<IFile>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'avatar.png', { type: 'image/png' });

            upload(file)
              .then((uploadedFile) => resolve(uploadedFile))
              .catch((error) => reject(error));
          } else {
            reject(new Error('Canvas is empty'));
          }
        }, 'image/png');
      });
    }
  };

  return (
    <div className='lanting-cropper'>
      <div className='content'>
        <div className='container'>
          <img src={imageData} className='image' ref={imageRef} />
          <div className='overlay' ref={overlay}>
            {point.r > 0 && (
              <div
                className='box'
                style={{
                  left: point.x,
                  top: point.y,
                  width: point.r,
                  height: point.r,
                }}
                ref={box}
              >
                <div className='handler nw' data-direction='west'></div>
                <div className='handler ne' data-direction='east'></div>
                <div className='handler sw' data-direction='west'></div>
                <div className='handler se' data-direction='east'></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cropper;
