import { isAuthenticated } from '@/lib/actions/auth.action';
import axios from 'axios';
import { redirect } from 'next/navigation';
import React from 'react'

const AuthLayout = async ({ children }: { children: React.ReactNode   }) => {
  
    const isUserAuthenticated = await isAuthenticated();
  
    if(isUserAuthenticated) {
      redirect('/dashboard')
    }

  return (
    
    <div>{children}</div>
  )
}

export default AuthLayout