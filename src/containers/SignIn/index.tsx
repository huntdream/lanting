import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import request from 'utils/request';
import Input from 'components/Input';
import './style.scss';
import { useHistory, Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState, IUser } from 'recoil/user';
import Button from 'components/Button';
import * as Yup from 'yup';
import Text from 'components/Text';

interface SignInProps {}

interface FormValues {
  username: string;
  password: string;
}

interface SignInResponse extends IUser {
  token: string;
}

const SignInSchema = Yup.object<FormValues>().shape({
  username: Yup.string()
    .min(5, 'Sorry, your username must be between 6 and 16 characters long.')
    .max(16, 'Sorry, your username must be between 6 and 16 characters long.')
    .required(),
  password: Yup.string()
    .min(5, 'Sorry, your username must be between 6 and 16 characters long.')
    .max(16, 'Sorry, your username must be between 6 and 16 characters long.')
    .required(),
});

const SignIn: React.FC<SignInProps> = () => {
  const setUser = useSetRecoilState(userState);
  const history = useHistory();

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
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          request
            .post<any, SignInResponse>('/auth/signin', {
              ...values,
            })
            .then(({ token, ...user }) => {
              setUser(user);
              localStorage.setItem('lanting-token', token);
              history.replace('/');
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
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
              />

              <Text.Error>{errors.username}</Text.Error>
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
              />

              <Text.Error>{errors.password}</Text.Error>
            </div>
            <div className='lanting-signin-submit'>
              <Link to='/signup' style={{ textDecoration: 'none' }}>
                Create account
              </Link>
              <Button type='submit' disabled={isSubmitting || !isValid}>
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
