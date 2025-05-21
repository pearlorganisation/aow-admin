import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardPage from '../Components/Common/Dashboard'
import { useNavigate } from 'react-router-dom'

const CommonLayout = () => {
  const navigate = useNavigate()

  useEffect(()=>{
  const isLogin = localStorage.getItem("login")
  if (!isLogin) {
    navigate("/login")
  }
  },[])

  return (
    <div className="flex flex-row">

      <nav className='h-full'>
        <DashboardPage />
      </nav>
      <div className='flex flex-col w-full'>
        <main className='w-full '> <Outlet /></main>

        <footer className='mt-auto'>
          footer
        </footer>
      </div>
    </div>
  )
}

export default CommonLayout


