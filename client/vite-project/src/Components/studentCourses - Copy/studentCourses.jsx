import React from 'react'
import './studentCourses.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const studentDashboard =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default studentDashboard
