import React, { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import request from 'utils/request';
import Input from 'components/Input';
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button';
import * as Yup from 'yup';
import Text from 'components/Text';
import { useUser } from 'context/App';
import { IUser } from 'typing/user';
import useToast from 'components/Toast/useToast';

interface LoginProps {}

interface FormValues {
  username: string;
  password: string;
}

const Schema: Yup.SchemaOf<FormValues> = Yup.object({
  username: Yup.string()
    .min(5, 'Username must be between 5 and 16 characters long.')
    .max(16, 'Username must be between 6 and 16 characters long.')
    .required(),
  password: Yup.string()
    .min(6, 'Password must be between 6 and 16 characters long.')
    .max(16, 'Password must be between 6 and 16 characters long.')
    .required(),
});

const Login: React.FC<LoginProps> = () => {
  const [, setUser] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [toast] = useToast();

  const initialValues: FormValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    []
  );

  return (
    <div className='lanting-login'>
      <Formik
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          return request
            .post<any, IUser>('/auth/login', {
              ...values,
            })
            .then(({ token, ...user }) => {
              toast('Welcome back!');
              setUser(user);
              localStorage.setItem('lanting-token', token!);
              navigate('/');
            })
            .catch((err) => {
              setErrorMsg(err.message);
              setSubmitting(false);
              toast(err.message);
            });
        }}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          isSubmitting,
          isValid,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className='lanting-login-form'>
            <div className='lanting-login-username'>
              <label htmlFor='username'>Username</label>

              <Input
                autoComplete='off'
                name='username'
                id='username'
                value={values.username}
                onChange={handleChange}
              />

              <Text.Error>
                {errors.username && touched.username ? errors.username : null}
              </Text.Error>
            </div>
            <div className='lanting-login-password'>
              <label htmlFor='password'>Password</label>

              <Input
                type='password'
                autoComplete='off'
                name='password'
                id='password'
                value={values.password}
                onChange={handleChange}
              />

              <Text.Error>
                {errors.password && touched.password ? errors.password : null}
              </Text.Error>
            </div>
            <Text.Error>{errorMsg}</Text.Error>
            <div className='lanting-login-submit'>
              <Link to='/signup' style={{ textDecoration: 'none' }}>
                Create account
              </Link>
              <Button type='submit' disabled={isSubmitting}>
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
