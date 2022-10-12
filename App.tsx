import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import './style.css';
import { IUserSubmitForm } from './IUserSubmitForm';

export default function App() {
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must be not exceed 20 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password does not match'),
    acceptTerms: Yup.boolean().required('Accept terms is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  function onSubmitForm() {}

  return (
    <div className="container p-3">
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="form-group mb-3">
            <label htmlFor="fullname">Full name</label>
            <input
              id="fullname"
              name="fullname"
              className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
              type="text"
              {...register('fullname')}
            />
            <div className="invalid-feedback">{errors.fullname?.message}</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register('username')}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              type="text"
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className='form-group mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" {...register('password')} 
            className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
          </div>

          <div className='form-group mb-3'>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input type="password" 
            {...register('confirmPassword')}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </div>

          <div className="form-group mb-3 form-check">
            <label htmlFor="acceptTerms">I have read and agree to the Terms</label>
            <input id='acceptTerms' className={`form-check-input ${errors.acceptTerms ? "is-invalid" : ''}`} type="checkbox" />
            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-primary">Register</button>
            <button type='button' className="btn btn-danger">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
