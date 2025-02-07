import React from 'react'
import FormInput from '../components/FormInput'

function Login() {
  return (
    <div className='flex'>
      <div className='bg-[url("./images/bgPhoto_h.jpg")]'>
      </div>
      <div>
        <FormInput/>
        <FormInput/>
      </div>
    </div>
  )
}

export default Login
