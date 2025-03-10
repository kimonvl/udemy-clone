import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentViewHeader from './StudentViewHeader'

const StudentViewCommonLayout = () => {
  return (
    <div>
        <StudentViewHeader/>
        <Outlet/>
    </div>
  )
}

export default StudentViewCommonLayout