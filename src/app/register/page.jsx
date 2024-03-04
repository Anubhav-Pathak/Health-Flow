"use client";

import React from 'react'

import DoctorRegisterForm from '@/components/DoctorRegisterForm'
import Toast from "@/components/ui/Toast";

const Register = () => {
  return (
    <main className='m-12'>
      <div role="tablist" className="tabs tabs-boxed">
        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Register as Doctor"  />
        <div role="tabpanel" className="tab-content p-10"><DoctorRegisterForm /></div>

        <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Register as Patient" defaultChecked/>
        <div role="tabpanel" className="tab-content p-10">Tab content 2</div>
      </div>
      <Toast />
    </main>
  )
}

export default Register