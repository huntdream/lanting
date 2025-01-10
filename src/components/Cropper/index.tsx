import React, { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import loadImage from './loadImage';
import './style.scss';
import Button from 'components/Button';
import useUpload, { IFile } from 'hooks/useUpload';

export interface CropperProps {
  image: string;
  onCrop: (file: IFile) => void;
}

interface Point {
  x: number;
  y: number;
  r: number;
}

const Cropper: FC<CropperProps> = ({ image, onCrop }) => {
  const [imageData, setImageData] = useState<string>(image);
  const [point, setPoint] = useState<Point>({ x: 0, y: 0, r: 0 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [dragPoint, setDragPoint] = useState<Point>();

  const [upload] = useUpload();

  const box = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
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
    if (!container.current) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();

      const target = e.target as HTMLDivElement;

      if (target === box.current) {
        setDragging(true);
      } else if (target.classList.contains('handler')) {
        setResizing(true);
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
        !container.current
      )
        return;

      const offsetX = e.clientX - dragPoint.x;
      const offsetY = e.clientY - dragPoint.y;

      const { width, height } = container.current.getBoundingClientRect();
      const { width: boxWidth, height: boxHeight } =
        box.current.getBoundingClientRect();

      let x = point.x;
      let y = point.y;
      let r = point.r;

      if (resizing) {
        x -= offsetX / 2;
        y -= offsetX / 2;
        r += offsetX;
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

  const handleCrop = async () => {
    if (!imageRef.current || !container.current) return;

    const img = await loadImage(image);

    if (img) {
      const containerBox = container.current.getBoundingClientRect();
      const imageBox = imageRef.current.getBoundingClientRect();

      const ratio = img.width / containerBox.width;

      const canvas = document.createElement('canvas') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      canvas.width = 150;
      canvas.height = 150;
      const sx = (point.x - (imageBox.left - containerBox.left)) * ratio;
      const sy = (point.y - (imageBox.top - containerBox.top)) * ratio;
      const r = point.r * ratio;

      ctx?.drawImage(img, sx, sy, r, r, 0, 0, 150, 150);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'avatar.png', { type: 'image/png' });

          upload(file).then((res) => {
            if (onCrop) {
              onCrop(res);
            }
          });
        }
      }, 'image/png');
    }
  };

  return (
    <div className='lanting-cropper'>
      <div className='content'>
        <img src={imageData} className='image' ref={imageRef} />
        <div className='container' ref={container}>
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
              <div className='handler nw'></div>
              <div className='handler ne'></div>
              <div className='handler sw'></div>
              <div className='handler se'></div>
            </div>
          )}
        </div>
      </div>
      <div className='footer'>
        <Button color='primary' wide onClick={handleCrop}>
          Crop
        </Button>
      </div>
    </div>
  );
};

export default Cropper;
