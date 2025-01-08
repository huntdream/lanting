import React, { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
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

interface Props {}

const Edit: React.FC<Props> = () => {
  const { data: user, mutate } = useSWR('/user/me', {
    revalidateOnFocus: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetcher] = useRequest();
  const [toast] = useToast();
  const navigate = useNavigate();

  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  const avatar = user?.avatar ? [{ url: user?.avatar }] : [];

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

    setValue('avatar', file?.url ?? '');
  };

  return (
    <div className='lanting-profile-edit lanting-page'>
      <form
        className='form'
        onSubmit={handleSubmit((data) => handleSave(data))}
      >
        <div className='avatar'>
          <Upload
            files={avatar}
            accept='image/jpg,png,jpeg'
            onChange={handleAvatarChange}
            round
          />
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
    </div>
  );
};

export default Edit;
