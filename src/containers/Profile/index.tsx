import Avatar from 'components/Avatar';
import React, { useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from 'typing/user';
import './style.scss';
import Tabs, { Tab } from 'components/Tabs';
import Feed from 'containers/Feed';

interface Props {}

const Profile: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [activeTab, setActiveTab] = useState(type || 'posts');

  const { data } = useSWR<IUser>(`/user/${id}`, {
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

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

  const handleTabChange = (tab: string) => {
    navigate(`/profile/${id}/${tab}`, { replace: true });
    setActiveTab(tab);
  };

  return (
    <div className='lanting-profile'>
      <div className='lanting-profile-header'>
        <div className='lanting-profile-user'>
          <Avatar src={data?.avatar} round size='large' />
        </div>
        <div className='lanting-profile-name'>{data?.name}</div>
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Profile;
