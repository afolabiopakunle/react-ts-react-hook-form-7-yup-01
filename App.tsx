import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import './style.css';
import {IUserSubmitForm} from './IUserSubmitForm';

export default function App() {

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must be not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')    
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm password does not match'),
    acceptTerms: Yup.boolean()
      .required('Accept terms is required')    
  });

  return (
    <div>
      
    </div>
  );
}
