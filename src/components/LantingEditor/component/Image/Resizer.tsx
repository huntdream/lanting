import { LexicalEditor } from 'lexical';
import React, { FC, useRef } from 'react';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

interface Props {
  editor: LexicalEditor;
  buttonRef: { current: null | HTMLButtonElement };
  imageRef: { current: null | HTMLElement };
  maxWidth?: number;
  onResizeEnd: (width: 'inherit' | number) => void;
  onResizeStart: () => void;
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

const Resizer: FC<Props> = ({
  onResizeStart,
  onResizeEnd,
  buttonRef,
  imageRef,
  maxWidth,
  editor,
}) => {
  const controlWrapperRef = useRef<HTMLDivElement>(null);
  const userSelect = useRef({
    priority: '',
    value: 'default',
  });
  const positioningRef = useRef<{
    currentWidth: 'inherit' | number;
    direction: number;
    isResizing: boolean;
    ratio: number;
    startWidth: number;
    startX: number;
    startY: number;
  }>({
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });
  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth
    ? maxWidth
    : editorRootElement !== null
    ? editorRootElement.getBoundingClientRect().width - 20
    : 100;

  const minWidth = 100;

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
    }
    if (document.body !== null) {
      document.body.style.setProperty(
        'cursor',
        `${cursorDir}-resize`,
        'important'
      );
      userSelect.current.value = document.body.style.getPropertyValue(
        '-webkit-user-select'
      );
      userSelect.current.priority = document.body.style.getPropertyPriority(
        '-webkit-user-select'
      );
      document.body.style.setProperty(
        '-webkit-user-select',
        `none`,
        'important'
      );
    }
  };

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'default');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty(
        '-webkit-user-select',
        userSelect.current.value,
        userSelect.current.priority
      );
    }
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    direction: number
  ) => {
    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image !== null && controlWrapper !== null) {
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.width = `${width}px`;

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    const isHorizontal =
      positioning.direction & (Direction.east | Direction.west);
    const isVertical =
      positioning.direction & (Direction.south | Direction.north);

    if (image !== null && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        );

        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(
          positioning.startWidth + diff,
          minWidth,
          maxWidthContainer
        );

        image.style.width = `${width}px`;
        positioning.currentWidth = width;
      }
    }
  };
  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      positioning.startWidth = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.isResizing = false;

      controlWrapper.classList.remove('image-control-wrapper--resizing');

      setEndCursor();
      onResizeEnd(width);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };
  return (
    <div ref={controlWrapperRef}>
      <div
        className='lanting-editor-image-resizer lanting-editor-image-resizer-ne'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <div
        className='lanting-editor-image-resizer lanting-editor-image-resizer-se'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <div
        className='lanting-editor-image-resizer lanting-editor-image-resizer-sw'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <div
        className='lanting-editor-image-resizer lanting-editor-image-resizer-nw'
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </div>
  );
};

export default Resizer;
