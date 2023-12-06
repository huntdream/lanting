import React, { useState } from 'react';
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

interface Props {}

const Edit: React.FC<Props> = () => {
  const { data: user } = useSWR('/user/me');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetcher] = useRequest();
  const [toast] = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: user,
  });

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
        navigate(`/profile/${newUser.id}`);
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast(err?.message);
      });
  };

  return (
    <div className='lanting-profile-edit lanting-page'>
      <form onSubmit={handleSubmit((data) => handleSave(data))}>
        <FormItem label='Name' name='name' message={errors.name?.message}>
          <Input {...register('name')} />
        </FormItem>
        <FormItem label='Bio' name='bio'>
          <Input {...register('bio')} />
        </FormItem>
        <Button type='submit' disabled={isSubmitting}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Edit;
