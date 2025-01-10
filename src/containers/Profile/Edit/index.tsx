import React, { useContext, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { IUser } from 'typing/user';
import Button from 'components/Button';
import './style.scss';
import useRequest from 'hooks/useRequest';
import useToast from 'components/Toast/useToast';
import { useNavigate } from 'react-router-dom';
import FormItem from 'components/FormItem';
import { t } from 'i18next';
import Upload from 'components/Upload';
import { IFile } from 'hooks/useUpload';
import Textarea from 'components/Textarea';
import Avatar from 'components/Avatar';
import Modal from 'components/Modal';
import Cropper from 'components/Cropper';

interface Props {}

const Edit: React.FC<Props> = () => {
  const { data: user, mutate } = useSWR('/user/me', {
    revalidateOnFocus: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string>('');
  const [fetcher] = useRequest();
  const [toast] = useToast();
  const navigate = useNavigate();

  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  const avatar = getValues('avatar');

  const handleSave = (data: IUser) => {
    setIsSubmitting(true);

    fetcher<IUser, any>('/user/update', {
      method: 'post',
      data: {
        ...user,
        ...data,
      },
    })
      .then((newUser) => {
        toast('Profile saved!');
        setIsSubmitting(false);
        mutate('/user/me', newUser);
        navigate(`/profile/${newUser.id}`);
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast(err?.message);
      });
  };

  const handleAvatarChange = (files: IFile[]) => {
    const file = files[0];
    if (!file) return;

    setImage(file?.url || '');
    setVisible(true);
  };

  const handleCrop = (file: IFile) => {
    if (!file) return;

    setValue('avatar', file.url || '');
    setVisible(false);
  };

  return (
    <div className='lanting-profile-edit lanting-page'>
      <form
        className='form'
        onSubmit={handleSubmit((data) => handleSave(data))}
      >
        <div className='header'>
          <div className='avatar'>
            <Avatar src={avatar} size={100} round />
            <Upload round showList={false} onChange={handleAvatarChange}>
              <Button icon='edit' color='secondary'></Button>
            </Upload>
          </div>

          <div className='username'>{user?.username}</div>
        </div>

        <FormItem label='Name' name='name' message={errors.name?.message}>
          <Input
            {...register('name', {
              required: t('textRequired', { type: t('username') }),
            })}
          />
        </FormItem>
        <FormItem label='Bio' name='bio'>
          <Textarea {...register('bio')} />
        </FormItem>
        <div className='save'>
          <Button type='submit' disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Cropper image={image} onCrop={handleCrop} />
      </Modal>
    </div>
  );
};

export default Edit;
