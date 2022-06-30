import React, { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import request from 'utils/request';
import Input from 'components/Input';
import Button from 'components/Button';
import Text from 'components/Text';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import './style.scss';
import { IUser } from 'typing/user';
import { useUser } from 'context/App';

interface SignUpProps {}

interface FormValues {
  username: string;
  password: string;
}

const Schema = Yup.object({
  username: Yup.string()
    .min(5, 'Username must be between 5 and 16 characters long.')
    .max(16, 'Username must be between 6 and 16 characters long.')
    .required(),
  password: Yup.string()
    .min(6, 'Password must be between 6 and 16 characters long.')
    .max(16, 'Password must be between 6 and 16 characters long.')
    .required(),
});

const SignUp: React.FC<SignUpProps> = () => {
  const [, setUser] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const initialValues: FormValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    []
  );

  return (
    <div className='lanting-signup'>
      <Formik
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          return request
            .post<any, IUser>('/auth/signup', {
              ...values,
            })
            .then(({ token, ...user }) => {
              setUser(user);
              localStorage.setItem('lanting-token', token!);
              setSubmitting(false);
              navigate('/');
            })
            .catch((err) => {
              setErrorMsg(err.message);
              setSubmitting(false);
            });
        }}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          isSubmitting,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className='lanting-signup-form'>
            <div className='lanting-signup-username'>
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
            <div className='lanting-signup-password'>
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
            <div className='lanting-signup-submit'>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                Already have an account？
              </Link>
              <Button type='submit' disabled={isSubmitting}>
                Sign Up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
