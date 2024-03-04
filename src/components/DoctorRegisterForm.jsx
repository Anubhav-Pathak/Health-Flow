import React, {useState, useRef} from 'react'

import useToastStore from '@/store/ToastStore';
import useLoadingStore from '@/store/LoadingStore';

import Radio from './ui/Radio';
import Input from './ui/Input'
import Alert from './ui/Alert'
import Select from './ui/Select';

import data from '@/data.json';

const RegisterForm = () => {

  const addToast = useToastStore((state) => state.addToast);
  const { loadingStates, setLoadingState } = useLoadingStore();

  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const genderRef = useRef()
  const specialityRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [error, setError] = useState({show: false, message: '', type: ''})

  const submitHandler = async (e) => {
    e.preventDefault()

    if (nameRef.current.value === '' || emailRef.current.value === '' || phoneRef.current.value === '' || genderRef.current.value === '' || specialityRef.current.value === '' || passwordRef.current.value === '' || confirmPasswordRef.current.value === '') {
      setError({show: true, message: 'Please fill in all fields', type: 'error'})
      return
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError({show: true, message: 'Passwords do not match', type: 'error'})
      return
    }


    setLoadingState("doctor-register-form", true)
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRef.current.value, 
        email: emailRef.current.value, 
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
        gender: genderRef.current.value,
        speciality: specialityRef.current.value,
      })
    })
    if (response.error) addToast({message: response.error, type: 'error'});
    else if (response.ok) addToast({message: 'Account created successfully', type: 'success'});
    setLoadingState("doctor-register-form", false)
  }

  return (
    <form onSubmit={submitHandler} className='max-w-xl grid sm:grid-cols-2 gap-x-8 gap-y-4'>
      {error.show && <Alert message={error.message} type={error.type} />}
      <Input label="Full Name" type="text" ref={nameRef} styles="col-span-full" />
      <Input label="Email" type="email" ref={emailRef} />
      <Input label="Phone" type="tel" ref={phoneRef} />
      <label className='form-control w-full'>
        <div className='label'>
          <span className="label-text">Gender</span>
        </div>
          <Radio label="Male" name="Gender" ref={genderRef}/>
          <Radio label="Female" name="Gender" ref={genderRef}/>
      </label>
      <label className='form-control w-full'>
        <div className='label'>
          <span className="label-text">Specialization</span>
        </div>
          <Select options={data.specialties} ref={specialityRef} description="Choose one" />
      </label>
      <Input label="Password" type="password" ref={passwordRef}/>
      <Input label="Confirm Password" type="password" ref={confirmPasswordRef}/>
      <button type="submit" className='btn btn-primary col-span-full mt-4'>{loadingStates["doctor-register-form"] ? <span className="loading loading-spinner loading-md"></span> : "Register"}</button>
    </form>
  )
}

export default RegisterForm