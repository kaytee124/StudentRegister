import React from 'react'
import './gradstudentPage.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const gradstudentPage =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default gradstudentPage
