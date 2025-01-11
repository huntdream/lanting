import React, { useContext, useEffect, useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
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
  const { data: user, mutate } = useSWR('/user/me', {
    revalidateOnFocus: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState<string>('');
  const [cropping, setCropping] = useState(false);
  const [fetcher] = useRequest();
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
    reset(user);
  }, [user]);

  const avatar = getValues('avatar');

  const handleSave = (data: IUser) => {
    setIsSubmitting(true);
    const newUser = {
      ...user,
      ...data,
    };
    fetcher<IUser, any>('/user/update', {
      method: 'post',
      data: newUser,
    })
      .then((newUser) => {
        toast('Profile saved!');
        setIsSubmitting(false);
        mutate(newUser);
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
    <div className='lanting-profile-edit lanting-page'>
      <form
        className='form'
        onSubmit={handleSubmit((data) => handleSave(data))}
      >
        <div className='header'>
          <div className='avatar'>
            <Avatar src={avatar} size={100} round />
            <Upload
              accept='image/jpg,image/jpeg,image/png'
              round
              showList={false}
              onChange={handleAvatarChange}
            >
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
      <Modal
        className='lanting-profile-cropper'
        visible={visible}
        onClose={() => setVisible(false)}
        width={400}
      >
        <div className='lanting-profile-cropper-container'>
          <Cropper image={image} ref={cropperRef} />
        </div>

        <div className='footer'>
          <Button color='primary' wide onClick={handleCrop} loading={cropping}>
            Set New Profile Picture
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
