import React, {useRef} from 'react'
import Link from 'next/link'
import {signIn} from 'next-auth/react'

import useToastStore from '@/store/ToastStore';
import Input from './ui/Input';

const LoginForm = () => {

  const addToast = useToastStore((state) => state.addToast);

  const usernameRef = useRef();
  const passwordRef = useRef();
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await signIn('credentials', {username, password, redirect: false})

    console.log({response});

    if(response.error) addToast({message: response.error, type: 'error'});
  }

  return (
    <form onSubmit={submitHandler} className='card-body'>
      <Input ref={usernameRef} type="text" label="Username" />
      <Input ref={passwordRef} type="password" label="Password" />
      <Link href="/forgot-password" className='text-sm hover:underline'>Forgot password?</Link>
      <button type="submit" className="btn btn-primary mt-4">Log In</button>
      <p>Don&apos;t have an account? <Link href="/register" className='hover:underline'>Register</Link></p>
    </form>
  )
}

export default LoginForm