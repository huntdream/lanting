import React, { useRef, useState } from 'react';
import Icon from 'components/Icon';
import useUpload, { IFile } from 'hooks/useUpload';
import createUID from 'utils/createUID';
import './style.scss';

interface Props {
  onStop?: (url: string) => void;
}

const VoiceRecorder: React.FC<Props> = ({ onStop }) => {
  const recorderRef = useRef<MediaRecorder>();
  const [recording, setRecording] = useState(false);
  const chunks = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [upload] = useUpload();

  const getUserMedia = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  };

  const handleRecord = () => {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
    } else {
      getUserMedia().then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;
        recorder.start();
        console.log(recorder.state);
        console.log('recorder started');
        setRecording(true);

        recorder.ondataavailable = (e) => {
          console.log(e.data);
          chunks.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks.current, {
            type: 'audio/mp3; codecs=opus',
          });

          const name = 'voice' + createUID() + '.mp3';

          const audioFile = new File([blob], name);

          upload(audioFile).then((file: IFile) => {
            setAudioUrl(file.url);

            if (onStop) {
              onStop(file.url);
            }
          });

          chunks.current = [];

          stream.getTracks().map((track) => track.stop());
        };
      });
    }
  };

  const handlePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  return (
    <div className='lanting-voice-recorder'>
      <Icon onClick={handleRecord}>{recording ? 'settings_voice' : 'mic'}</Icon>
      {audioUrl && (
        <>
          <Icon onClick={handlePlay}>graphic_eq</Icon>
          <audio src={audioUrl} controls hidden ref={audioRef} />
        </>
      )}
    </div>
  );
};

export default VoiceRecorder;
