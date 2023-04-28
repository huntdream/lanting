import React, { useState } from 'react';
import request from 'utils/request';
import Input from 'components/Input';
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import { useUser } from 'context/App';
import { IUser } from 'typing/user';
import useToast from 'components/Toast/useToast';
import { useForm } from 'react-hook-form';

interface LoginProps {
  isLogin?: boolean;
}

interface FormValues {
  username: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ isLogin }) => {
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const [toast] = useToast();

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleLogin = (values: FormValues) => {
    console.log(values);

    setIsSubmitting(true);

    if (isLogin) {
      return request
        .post<any, IUser>('/auth/login', {
          ...values,
        })
        .then(({ token, ...user }) => {
          setIsSubmitting(false);

          toast('Welcome back!');
          setUser(user);
          localStorage.setItem('lanting-token', token!);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          setErrorMsg(err.message);
          toast(err.message);
          setIsSubmitting(false);
        });
    } else {
      return request
        .post<any, IUser>('/auth/signup', {
          ...values,
        })
        .then(({ token, ...user }) => {
          setIsSubmitting(false);

          setUser(user);
          localStorage.setItem('lanting-token', token!);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          setErrorMsg(err.message);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className='lanting-login'>
      <form
        onSubmit={handleSubmit((data) => handleLogin(data))}
        className='lanting-login-form'
      >
        <div className='lanting-login-username'>
          <label htmlFor='username'>Username</label>

          <Input
            autoComplete='off'
            placeholder='Username'
            {...register('username', { required: 'Username is required' })}
          />

          <Text.Error>{errors.username && errors.username.message}</Text.Error>
        </div>
        <div className='lanting-login-password'>
          <label htmlFor='password'>Password</label>

          <Input
            type='password'
            autoComplete='off'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Use 8 characters or more for your password',
              },
            })}
          />

          <Text.Error>{errors.password && errors.password.message}</Text.Error>
        </div>
        <Text.Error>{errorMsg}</Text.Error>
        <div className='lanting-login-submit'>
          <Link
            to={isLogin ? '/signup' : '/login'}
            replace
            style={{ textDecoration: 'none' }}
          >
            {isLogin ? 'Create account' : 'Already have an account？'}
          </Link>
          <Button type='submit' disabled={isSubmitting}>
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
