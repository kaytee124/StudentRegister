import React , {useState}from 'react'
import { FaMedal,FaClipboardList } from "react-icons/fa";




const cardvals= [
    {
        title:"Dean's list",
        icon:<FaMedal/>,
    },
    {
        title:"Probation List",
        icon:<FaClipboardList />,
    },

];
const Card =() => {
  return (
    <div className='Card-container'>
        {cardvals.map((item) => (
            <div className='card'>
                <div className='card-cover'>
                    {item.icon}
                </div>
                <div className='card-title'>
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Card
