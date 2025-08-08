import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Input from 'components/Input';
import { useForm } from 'react-hook-form';
import { IUser } from 'typing/user';
import Button from 'components/Button';
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
import Cropper, { CropperRef } from 'components/Cropper';
import './style.scss';

interface Props {}

const Edit: React.FC<Props> = () => {
  const queryClient = useQueryClient();
  const [fetcher] = useRequest();

  const { data: user } = useQuery<IUser>({
    queryKey: ['user', 'me'],
    queryFn: () => fetcher('/user/me'),
  });

  const mutation = useMutation({
    mutationFn: (updatedUser: IUser) => {
      return fetcher<IUser, any>('/user/update', {
        method: 'post',
        data: updatedUser,
      });
    },
    onSuccess: (data) => {
      toast('Profile saved!');
      queryClient.setQueryData(['user', 'me'], data);
      navigate(`/profile/${data.id}`);
    },
    onError: (err: any) => {
      toast(err?.message);
    },
  });

  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string>('');
  const [cropping, setCropping] = useState(false);
  const [toast] = useToast();
  const navigate = useNavigate();

  const cropperRef = useRef<CropperRef>(null);

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
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const avatar = getValues('avatar');

  const handleSave = (data: IUser) => {
    const newUser = {
      ...user,
      ...data,
    };
    mutation.mutate(newUser as IUser);
  };

  const handleAvatarChange = (files: IFile[]) => {
    const file = files[0];
    if (!file) return;

    setImage(file?.url || '');
    setVisible(true);
  };

  const handleCrop = () => {
    if (!cropperRef.current) return;
    setCropping(true);

    cropperRef.current
      .crop()
      .then((file?: IFile) => {
        if (file) {
          setValue('avatar', file.url || '');
          setVisible(false);
        }
      })
      .finally(() => {
        setCropping(false);
      });
  };

  return (
    <div className='lanting-edit-profile'>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className='lanting-edit-profile-container'>
          <div className='lanting-edit-profile-avatar'>
            <Avatar src={avatar} size={100} round />
            <div className='lanting-edit-profile-upload'>
              <Upload onChange={handleAvatarChange}>
                <Button>{t('edit')}</Button>
              </Upload>
            </div>
          </div>
          <div className='lanting-edit-profile-form'>
            <FormItem label={t('username')} message={errors.username?.message}>
              <Input
                placeholder={t('username')}
                {...register('username', {
                  required: t('form.required'),
                })}
              />
            </FormItem>
            <FormItem label='Name' message={errors.name?.message}>
              <Input placeholder='Name' {...register('name')} />
            </FormItem>
            <FormItem label='Bio' message={errors.bio?.message}>
              <Textarea placeholder='Bio' {...register('bio')} />
            </FormItem>
            <Button
              type='submit'
              className='lanting-edit-profile-save'
              loading={mutation.isPending}
            >
              {t('article.save')}
            </Button>
          </div>
        </div>
      </form>
      <Modal
        title={t('edit')}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <Cropper ref={cropperRef} image={image} />
      </Modal>
    </div>
  );
};

export default Edit;
