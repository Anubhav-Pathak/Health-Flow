import React, {useState, useRef} from 'react'

import useToastStore from '@/store/ToastStore';
import useLoadingStore from '@/store/LoadingStore';

import Input from './ui/Input'
import Alert from './ui/Alert'

const PatientRegisterForm = () => {

  const addToast = useToastStore((state) => state.addToast);
  const { loadingStates, setLoadingState } = useLoadingStore();

  const nameRef = useRef()
  const aadharnoRef = useRef()
  const phoneRef = useRef()
  const p_contactRef = useRef()

  const [error, setError] = useState({show: false, message: '', type: ''})

  const submitHandler = async (e) => {
    e.preventDefault()

    if (nameRef.current.value === '' || aadharnoRef.current.value === '' || phoneRef.current.value === '' || p_contactRef.current.value === '') {
      setError({show: true, message: 'Please fill in all fields', type: 'error'})
      return
    }

    setLoadingState("patient-register-form", true)
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameRef.current.value, 
        aadharno: aadharnoRef.current.value,
        phone: phoneRef.current.value,
        p_contact: p_contactRef.current.value,
        isDoctor: false
      })
    })
    if (response.error) addToast({message: response.error, type: 'error'});
    else if (response.ok) addToast({message: 'Account created successfully', type: 'success'});
    setLoadingState("patient-register-form", false)
  }

  return (
    <form onSubmit={submitHandler} className='max-w-xl grid sm:grid-cols-2 gap-x-8 gap-y-4'>
      {error.show && <Alert message={error.message} type={error.type} />}
      <Input label="Full Name" type="text" ref={nameRef} styles="col-span-full" />
      <Input label="Aadhar Number" type="text" ref={aadharnoRef} />
      <Input label="Phone" type="tel" ref={phoneRef} />
      <Input label="Emergency Contact" type="tel" ref={p_contactRef} />
      <button type="submit" className='btn btn-primary col-span-full mt-4'>{loadingStates["patient-register-form"] ? <span className="loading loading-spinner loading-md"></span> : "Register"}</button>
    </form>
  )
}

export default PatientRegisterForm