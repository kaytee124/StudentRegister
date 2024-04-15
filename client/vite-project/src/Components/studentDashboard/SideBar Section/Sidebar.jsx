import React from 'react'
import './sidebar.css'
import { FaUniversity, FaUser} from "react-icons/fa";
import { BiHome, BiMessage, BiHelpCircle} from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { IoMdPeople } from "react-icons/io";

const Sidebar =() => {

  return (
    <div className='menu'>
        <div className='logo'>
          <FaUniversity />
          <h2>Ashesi</h2>
        </div>

        <div className='menu--list'>
            <a href = "/stuDashboard" className='item active'>
            <BiHome className='icon' />
            Dashboard
            </a>
        </div>
        <div className='menu--list'>
            <a href = "stuProfile" className='item'>
            <FaUser className='icon'/>
            Profile
            </a>
        </div>
        <div className='menu--list'>
            <a href = "stuCourses" className='item'>
            <SiCoursera className='icon'/>
            Courses
            </a>
        </div>
        <div className='menu--list'>
            <a href = "stumessages" className='item'>
            <BiMessage  className='icon'/>
            Messages
            </a>
        </div>
        <div className='menu--list'>
            <a href = "stupage" className='item'>
            <IoMdPeople className='icon' />
            Students
            </a>
        </div>
        <div className='menu--list'>
            <a href = "#" className='item'>
            <BiHelpCircle className='icon' />
            Help
            </a>
        </div>

    </div>
  )
}

export default Sidebar
