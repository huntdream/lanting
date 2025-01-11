import Avatar from 'components/Avatar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IUser } from 'typing/user';
import './style.scss';
import Tabs, { Tab } from 'components/Tabs';
import Feed from 'containers/Feed';
import Icon from 'components/Icon';
import Comments from 'components/Comments';
import useTitle from 'hooks/useTitle';
import { useUser } from 'context/App';

interface Props {}

const Profile: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [activeTab, setActiveTab] = useState(type || 'posts');
  const [user] = useUser();

  const { data } = useSWR<IUser>(`/user/${id}`, {
    refreshInterval: 0,
    shouldRetryOnError: false,
  });

  const canEdit = data?.id === user?.id;

  useTitle(data?.name || data?.username);

  useEffect(() => {
    setActiveTab(type || 'posts');
  }, [type]);

  const tabs: Tab[] = [
    {
      id: 'posts',
      label: 'Posts',
      content: <Feed id={id} />,
    },
    {
      id: 'comments',
      label: 'Comments',
      content: <Comments id={id!} type='user' showDetail />,
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
          <Avatar src={data?.avatar} round size={100} />
        </div>
        <div className='lanting-profile-name'>
          {data?.name || data?.username}
        </div>
        <div className='lanting-profile-bio'>{data?.bio}</div>
        {canEdit && (
          <Icon
            className='lanting-profile-header-edit'
            onClick={() => navigate('/profile/edit')}
            name='edit'
          />
        )}
      </div>
      <Tabs
        sticky
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Profile;
