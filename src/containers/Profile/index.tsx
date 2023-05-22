import Avatar from 'components/Avatar';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from 'typing/user';
import './style.scss';
import Tabs, { Tab } from 'components/Tabs';
import Feed from 'containers/Feed';

interface Props {}

const Profile: React.FC<Props> = () => {
  const { id } = useParams();
  const { data } = useSWR<IUser>(`/user/${id}`, {
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  console.log(data);

  const tabs: Tab[] = [
    {
      id: 'posts',
      label: 'Posts',
      content: <Feed id={id} />,
    },
    {
      id: 'media',
      label: 'Media',
      content: 'TODO: this should index media from posts',
    },
    {
      id: 'about',
      label: 'About',
      content: <div>Something about the mysterious</div>,
    },
  ];

  return (
    <div className='lanting-profile'>
      <div className='lanting-profile-header'>
        <div className='lanting-profile-user'>
          <Avatar src={data?.avatar} round size='large' />
        </div>
        <div className='lanting-profile-name'>{data?.name}</div>
      </div>
      <Tabs tabs={tabs} activeTab='posts' />
    </div>
  );
};

export default Profile;
