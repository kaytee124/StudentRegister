import React , {useState}from 'react'
import './Dashboard.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const Dashboard =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Dashboard
