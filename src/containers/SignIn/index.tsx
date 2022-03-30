import React, { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import request from 'utils/request';
import Input from 'components/Input';
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button';
import * as Yup from 'yup';
import Text from 'components/Text';

interface SignInProps {}

interface FormValues {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
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

const SignIn: React.FC<SignInProps> = () => {
  const [, setUser] = useState<any>();
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
    <div className='lanting-signin'>
      <Formik
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          return request
            .post<any, SignInResponse>('/auth/signin', {
              ...values,
            })
            .then(({ token, ...user }) => {
              setUser(user);
              localStorage.setItem('lanting-token', token);
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
          isValid,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className='lanting-signin-form'>
            <div className='lanting-signin-username'>
              <label htmlFor='username'>Username</label>

              <Input
                autoComplete='off'
                name='username'
                id='username'
                value={values.username}
                onChange={handleChange}
                borderless
              />

              <Text.Error>
                {errors.username && touched.username ? errors.username : null}
              </Text.Error>
            </div>
            <div className='lanting-signin-password'>
              <label htmlFor='password'>Password</label>

              <Input
                type='password'
                autoComplete='off'
                name='password'
                id='password'
                value={values.password}
                onChange={handleChange}
                borderless
              />

              <Text.Error>
                {errors.password && touched.password ? errors.password : null}
              </Text.Error>
            </div>
            <Text.Error>{errorMsg}</Text.Error>
            <div className='lanting-signin-submit'>
              <Link to='/signup' style={{ textDecoration: 'none' }}>
                Create account
              </Link>
              <Button type='submit' disabled={isSubmitting}>
                Sign In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
