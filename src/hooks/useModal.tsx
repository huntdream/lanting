import Modal from 'components/Modal';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';

interface ModalContent {
  title: ReactNode;
  content: ReactNode;
}

const useModal = (): [
  ReactNode,
  (title: ReactNode, content: (onClose: () => void) => ReactNode) => void
] => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<null | ModalContent>(null);

  const onClose = useCallback(() => {
    setModalContent(null);
    setVisible(false);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }

    const { title, content } = modalContent;

    return (
      <Modal onClose={onClose} title={title} visible={visible}>
        {content}
      </Modal>
    );
  }, [modalContent, visible, onClose]);

  const showModal = useCallback(
    (title: ReactNode, getContent: (onClose: () => void) => ReactNode) => {
      setModalContent({ title, content: getContent(onClose) });
      setVisible(true);
    },
    [onClose]
  );

  return [modal, showModal];
};

export default useModal;
