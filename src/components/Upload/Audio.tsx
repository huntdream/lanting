import Icon from 'components/Icon';
import React, { useRef, useState } from 'react';

interface Props {
  src?: string;
}

const Audio: React.FC<Props> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (playing) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  };

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  return (
    <div className='lanting-upload-preview-audio'>
      <audio src={src} ref={audioRef} onPlay={onPlay} onPause={onPause} />
      <Icon onClick={handlePlay}>{playing ? 'pause' : 'play_arrow'}</Icon>
    </div>
  );
};

export default Audio;
