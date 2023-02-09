import React, { useRef } from 'react';
import './style.scss';

interface Props {
  src?: string;
}

const AudioPlayer: React.FC<Props> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef(0);

  const handlePlay = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      //
    }
  };

  const handlePause = () => {
    cancelAnimationFrame(rafRef.current);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
      />
    </div>
  );
};

export default AudioPlayer;
