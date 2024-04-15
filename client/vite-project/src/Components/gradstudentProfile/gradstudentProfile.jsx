import React , {useState}from 'react'
import './gradstudentProfile.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const gradstudentProfile =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default gradstudentProfile
