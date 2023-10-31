import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button';
import Text from 'components/Text';
import { useUser } from 'context/App';
import { IUser } from 'typing/user';
import useToast from 'components/Toast/useToast';
import { useForm } from 'react-hook-form';
import useRequest from 'hooks/useRequest';

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
  const { t } = useTranslation();
  const [request] = useRequest();

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset();
    setErrorMsg('');
  }, [isLogin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>();

  useEffect(() => {
    const subscribe = watch((data, { name, type }) => {
      setErrorMsg('');
    });

    return () => subscribe.unsubscribe();
  }, [watch]);

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
          <label htmlFor='username'>{t('username')}</label>

          <Input
            autoComplete='off'
            placeholder={t('username')}
            {...register('username', {
              required: t('textRequired', { type: t('username') }),
            })}
          />

          <Text.Error>{errors.username && errors.username.message}</Text.Error>
        </div>
        <div className='lanting-login-password'>
          <label htmlFor='password'>{t('password.label')}</label>

          <Input
            type='password'
            autoComplete='off'
            placeholder={t('password.label')}
            {...register('password', {
              required: t('textRequired', { type: t('password.label') }),
              minLength: {
                value: 8,
                message: t('password.min'),
              },
            })}
          />

          <Text.Error>{errors.password && errors.password.message}</Text.Error>
        </div>

        <div className='lanting-login-submit'>
          <Button type='submit' disabled={isSubmitting} wide>
            {isLogin ? t('login') : t('register')}
          </Button>
        </div>
        <Text.Error>{errorMsg}</Text.Error>
        <div className='lanting-login-footer'>
          {isLogin ? t('createAccount') : t('alreadyHave')}
          <Link
            to={isLogin ? '/signup' : '/login'}
            replace
            style={{ textDecoration: 'none' }}
            className='lanting-login-link'
          >
            {isLogin ? t('register') : t('login')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
