import React, { useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
// import './style.scss'

interface Props {}

const Draw: React.FC<Props> = () => {
  const [data, setData] = useState();

  const handleChange = (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles
  ) => {
    console.log(appState);
  };

  return (
    <div style={{ height: 'calc(100vh - 48px)' }}>
      <Excalidraw onChange={handleChange} />
    </div>
  );
};

export default Draw;
