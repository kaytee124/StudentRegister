import React from 'react'
import './sidebar.css'
import { FaUniversity, FaMedal } from "react-icons/fa";
import { BiHome, BiMessage, BiHelpCircle} from "react-icons/bi";
import { VscCircleSlash } from "react-icons/vsc";

const Sidebar =() => {

  return (
    <div className='menu'>
        <div className='logo'>
          <FaUniversity />
          <h2>Ashesi</h2>
        </div>

        <div className='menu--list'>
            <a href = "/dashboard" className='item active'>
            <BiHome className='icon' />
            Dashboard
            </a>
        </div>
        <div className='menu--list'>
            <a href = "/deanlist" className='item'>
            <FaMedal className='icon'/>
            Deans List
            </a>
        </div>
        <div className='menu--list'>
            <a href = "#" className='item'>
            <VscCircleSlash  className='icon'/>
            Probation List
            </a>
        </div>
        <div className='menu--list'>
            <a href = "#" className='item'>
            <BiMessage  className='icon'/>
            Messages
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
