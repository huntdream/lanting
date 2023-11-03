import React, { ReactNode, useEffect, useState } from 'react';
import Modal from 'components/Modal';
import { t } from 'i18next';
import './style.scss';
import Button from 'components/Button';

interface Props {
  visible?: boolean;
  title: string;
  children?: ReactNode;
  message: ReactNode;
  onOk: () => Promise<any>;
  onChange?: (visible?: boolean) => void;
}

const Prompt: React.FC<Props> = ({
  title,
  message,
  children,
  visible = false,
  onChange,
  onOk,
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    onOk()
      .then(() => {
        handleVisibleChange(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  const handleVisibleChange = (v: boolean) => {
    if (onChange) {
      onChange(v);
    }

    setShow(v);
  };

  return (
    <>
      <div
        className='lanting-prompt-trigger'
        onClick={() => handleVisibleChange(true)}
      >
        {children}
      </div>
      <Modal
        visible={show}
        title={title}
        onClose={() => handleVisibleChange(false)}
      >
        <div className='lanting-prompt'>
          <div className='lanting-prompt-message'>{message}</div>
          <div className='lanting-prompt-footer'>
            <Button
              color='secondary'
              disabled={loading}
              onClick={() => handleVisibleChange(false)}
            >
              {t('cancel')}
            </Button>
            <Button color='primary' disabled={loading} onClick={handleOk}>
              {t('delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Prompt;
