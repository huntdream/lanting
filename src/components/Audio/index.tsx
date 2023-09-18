import Icon from 'components/Icon';
import useToast from 'components/Toast/useToast';
import Tooltip from 'components/Tooltip';
import React, { useRef, useState, MouseEvent } from 'react';
import { msToMinutes } from './msConvert';
import './style.scss';

interface Props {
  src?: string;
  name?: string;
}

const AudioPlayer: React.FC<Props> = ({ src, name }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [percent, setPercent] = useState('');
  const [duration, setDuration] = useState('00:00');
  const [notify] = useToast();

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

  const handleLoad = () => {
    setDuration(msToMinutes((audioRef.current?.duration || 0) * 1000));
  };

  const handleTimeUpdate = () => {
    console.log(audioRef.current?.currentTime);
    const played = audioRef.current?.currentTime || 0;
    const total = audioRef.current?.duration || 0;
    const ratio = (played / total) * 100;

    setPercent(`${ratio}%`);
  };

  const handleProgressChange = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (audioRef.current) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const mouesX = event.pageX;

      const newRatio =
        ((mouesX - left) / width) * (audioRef.current.duration || 0);

      audioRef.current.currentTime = newRatio;

      if (audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className='lanting-audio'>
      <audio
        src={src}
        ref={audioRef}
        onPlay={onPlay}
        onPause={onPause}
        onLoadedData={handleLoad}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className='lanting-audio-left'>
        <Icon onClick={handlePlay} name={playing ? 'pause' : 'play_arrow'} />
      </div>
      <div className='lanting-audio-middle'>
        <div className='lanting-audio-namevol'>
          <Tooltip title={name}>
            <div className='lanting-audio-name'>{name}</div>
          </Tooltip>
          <div className='lanting-audio-volume'>
            <Icon
              onClick={() => {
                notify('还没做好🤣');
              }}
              name='volume_up'
              size={20}
            />
          </div>
        </div>

        <div className='lanting-audio-timeinfo'>
          <div
            className='lanting-audio-progress'
            onClick={handleProgressChange}
          >
            <div
              className='lanting-audio-passed'
              style={{ width: percent }}
            ></div>
          </div>
          <div className='lanting-audio-duration'>
            {msToMinutes((audioRef.current?.currentTime || 0) * 1000)}/
            {duration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
