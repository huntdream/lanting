import useRequest from 'hooks/useRequest';
import React from 'react';
import { FC, ReactNode } from 'react';
import { SWRConfig } from 'swr';

interface Props {
  children: ReactNode;
}

const SWRProvider: FC<Props> = ({ children }) => {
  const [request] = useRequest();

  return (
    <SWRConfig
      value={{
        fetcher: request,
        revalidateOnMount: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
