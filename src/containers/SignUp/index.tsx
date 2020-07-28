import React, { useMemo } from 'react';
import { Formik, Form } from 'formik';
import request from 'utils/request';
import Input from 'components/Input';
import './style.scss';
import Button from 'components/Button';

interface SignUpProps {}

interface FormValues {
  username: string;
  password: string;
}

const SignUp: React.FC<SignUpProps> = () => {
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
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          request
            .post('/auth/signup', {
              ...values,
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
        initialValues={initialValues}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div className='lanting-signup-username'>
              <label htmlFor='username'>Username</label>
              <Input
                autoComplete='off'
                name='username'
                id='username'
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div className='lanting-signup-password'>
              <label htmlFor='password'>Password</label>
              <Input
                autoComplete='off'
                name='password'
                id='password'
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button type='submit' disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
