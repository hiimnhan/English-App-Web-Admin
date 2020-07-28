import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { connect } from 'react-redux';

import './styles.scss';
import { authActions } from '../../redux/actions/auth.actions';
function LoginForm(props) {
  const { login, loggingIn } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (values) => {
    login(values);
    setIsSubmitting(true);
  };
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string()
          .required('No password provided')
          .min(5, 'Password is too short - should be 5 character minimum'),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className='form-login'>
            <div className='form-panel one'>
              <div className='form-content'>
                <form onSubmit={handleSubmit}>
                  <div className='form-login-group'>
                    <label className='login-label' htmlFor='username'>
                      Username
                    </label>
                    <input
                      type='text'
                      id='username'
                      name='username'
                      className='login-input'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.username && touched.username && (
                      <div className='login-input__feedback'>
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div className='form-login-group'>
                    <label className='login-label' htmlFor='password'>
                      Password
                    </label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      className='login-input'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password && (
                      <div className='login-input__feedback'>
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className='form-login-group'>
                    <button
                      className={[
                        'login-button',
                        loggingIn ? 'disabled' : '',
                      ].join(' ')}
                      type='submit'
                      disabled={loggingIn}
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...dispatch,
    login: (params) => dispatch(authActions.signInRequest(params)),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
