import React , {useState}from 'react'
import './Deanlist.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'
import { Link, useNavigate} from 'react-router-dom'
import Profile from './Profile/Profile'

const Deanlist =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Deanlist
