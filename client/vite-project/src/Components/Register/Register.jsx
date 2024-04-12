import React , {useState}from 'react'
import './Register.css'
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

import video from '../../media/studentvid.mp4'
import students from '../../media/students3.png'


import { MdAssignment } from "react-icons/md";

const Register=() => {
  const [studentID, setstudentID] = useState('')
  const [Firstname, setFirstname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [DateOfBirth, setDateOfBirth] = useState('')
  const [Gender, setGender] = useState('')
  const [Email, setEmail] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [Origin, setOrigin] = useState('')
  const [YearGroup, setYearGroup] = useState('')
  const [Password, setPassword] = useState('')
  const [VerifyPassword, setVerifyPassword] = useState('')
  const [Undergrad, setUndergrad] = useState('')
  const [ errors, setErrors] = useState({})
  const navigateTo = useNavigate()


  const Userregister = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validation checks
    const errors = {};

    // Student ID validation
    if (!/^\d{8}$/.test(studentID)) {
      errors.studentID = "Student ID must be 8 digits long and contain only numbers";
    }

    // Firstname validation
    if (!/^[A-Za-z]{3,}$/.test(Firstname)) {
      errors.Firstname = "Firstname must contain only alphabets and have a length of 3 or more";
    }

    // Lastname validation
    if (!/^[A-Za-z]{3,}$/.test(Lastname)) {
      errors.Lastname = "Lastname must contain only alphabets and have a length of 3 or more";
    }

    // Date of Birth validation
    const currentDate = new Date();
    const selectedDate = new Date(DateOfBirth);
    const minDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
    if (selectedDate >= minDate) {
      errors.DateOfBirth = "Date of Birth must be more than 10 years old from the current year";
    }

    
    if (!Email.includes("@ashesi.edu.gh")) {
      errors.Email = "Email must be from Ashesi University (ashesi.edu.gh)";
    }

    // Phone number validation
    if (!/^\d{10}$/.test(PhoneNumber) || PhoneNumber[0] !== '0') {
      errors.PhoneNumber = "Phone Number must be 10 digits long and start with 0";
    }

    // Origin validation
    if (!/^[A-Za-z ]+$/.test(Origin)) {
      errors.Origin = "Country of Origin must contain only letters";
    }

    // Year Group validation
    if (!/^\d{4}$/.test(YearGroup)) {
      errors.YearGroup = "Year Group must be 4 digits long and contain only numbers";
    }

    // Password validation
    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(Password)) {
      errors.Password = "Password must contain at least one number, one letter, one symbol, and be at least 8 characters long";
    }

    // Verify Password validation
    if (Password !== VerifyPassword) {
      errors.VerifyPassword = "Passwords do not match";
    }

    // If there are errors, update state with error messages
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // If no errors, proceed with form submission
    Axios.post('http://localhost:3002/register', {
      studentID: studentID,
      Firstname: Firstname,
      Lastname: Lastname,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Origin: Origin,
      YearGroup: YearGroup,
      Password: Password,
      Undergrad: Undergrad
    }).then(() => {
      navigateTo('/');

      setstudentID('')
      setFirstname('')
      setLastname('')
      setDateOfBirth('')
      setGender('')
      setEmail('')
      setPhoneNumber('')
      setOrigin('')
      setYearGroup('')
      setPassword ('')
      setVerifyPassword ('')
      setUndergrad('')
    });
  }



  // Inside the return statement, render error messages conditionally
  return (
    <div className='RegisterPage flex'>
      <div className="container flex">
        <div className="videoDivcontainer">
          <video src={video} autoPlay loop muted></video>
          <div className='textDiv'>
            <h2 className='title'>Ashesi Student Registry</h2>
            <p>Sign-up</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Already have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Sign-in</button>
            </Link>
          </div>
        </div>

        <div className= "formContainer">
          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={students} alt= "Students sittin in a class" />
            </div>

            <form action="" className='form grid'>
              <div className='inputDiv'>
                <label htmlFor="studentID">Student ID:</label>
                <div className="input flex">
                  <input type="text" id='studentID' placeholder='Enter your student ID' onChange={(event) => {
                    setstudentID(event.target.value);
                    setErrors({ ...errors, studentID: '' });
                  }} required />
                  {errors.studentID && <span className="error">{errors.studentID}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="FirstName">First Name:</label>
                <div className="input flex">
                  <input type="text" id='FirstName' placeholder='Enter First Name' onChange={(event) => {
                    setFirstname(event.target.value);
                    setErrors({ ...errors, Firstname: '' }); // Clear error when input changes
                  }} required />
                  {errors.Firstname && <span className="error">{errors.Firstname}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="LastName">Last Name:</label>
                <div className="input flex">
                  <input type="text" id='LastName' placeholder='Enter Last Name' onChange={(event) => {
                    setLastname(event.target.value);
                    setErrors({ ...errors, Lastname: '' }); // Clear error when input changes
                  }} required />
                  {errors.Lastname && <span className="error">{errors.Lastname}</span>}
                </div>
              </div>
               <div className='inputDiv'>
                <label>Gender:</label>
                <div className="input flex">
                  <label htmlFor="male">Male</label>
                  <input type="radio" id="male" name="gender" value="male" onChange={(event)=>{
                    setGender(event.target.value)}} required />
                  <label htmlFor="female">Female</label>
                  <input type="radio" id="female" name="gender" value="female" onChange={(event)=>{
                    setGender(event.target.value)}} required />
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="DateOfBirth">Date of Birth:</label>
                <div className="input flex">
                  <input type="date" id='DateOfBirth' required onChange={(event) => {
                    setDateOfBirth(event.target.value);
                    setErrors({ ...errors, DateOfBirth: '' }); // Clear error when input changes
                  }} />
                  {errors.DateOfBirth && <span className="error">{errors.DateOfBirth}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="Email">Email address:</label>
                <div className="input flex">
                  <input type="email" id='Email' placeholder='Enter email' onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors({ ...errors, Email: '' }); // Clear error when input changes
                  }} required />
                  {errors.Email && <span className="error">{errors.Email}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="PhoneNumber">Phone Number:</label>
                <div className="input flex">
                  <input type="tel" id='PhoneNumber' placeholder='Enter phone number' onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setErrors({ ...errors, PhoneNumber: '' }); // Clear error when input changes
                  }} required />
                  {errors.PhoneNumber && <span className="error">{errors.PhoneNumber}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="CountryOfOrigin">Country of Origin:</label>
                <div className="input flex">
                  <input type="text" id='CountryOfOrigin' placeholder='Enter country of origin' onChange={(event) => {
                    setOrigin(event.target.value);
                    setErrors({ ...errors, Origin: '' }); // Clear error when input changes
                  }} required />
                  {errors.Origin && <span className="error">{errors.Origin}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="YearGroup">Year Group:</label>
                <div className="input flex">
                  <input type="text" id='YearGroup' placeholder='Enter year group' onChange={(event) => {
                    setYearGroup(event.target.value);
                    setErrors({ ...errors, YearGroup: '' }); // Clear error when input changes
                  }} required />
                  {errors.YearGroup && <span className="error">{errors.YearGroup}</span>}
                </div>
              </div>
              <div className='inputDiv'>
                <label>Are you Under-Graduate:</label>
                <div className="input flex">
                  <label htmlFor="yes">Yes</label>
                  <input type="radio" id="yes" name="undergrad" value="1" onChange={(event)=>{
                    setUndergrad(event.target.value)}} required />
                  <label htmlFor="no">No</label>
                  <input type="radio" id="no" name="undergrad" value="2"  onChange={(event)=>{
                    setUndergrad(event.target.value)}} required />
                </div>
              </div>
              <div className='inputDiv'>
                <label htmlFor="userpass">Password:</label>
                <div className="input flex">
                  <input type="password" id='userpass' placeholder='Enter password' onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors({ ...errors, Password: '' }); // Clear error when input changes
                  }} required />
                  {errors.Password && <span className="error">{errors.Password}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="Verifypass">Verify password:</label>
                <div className="input flex">
                  <input type="password" id='verifypass' placeholder='Verify password' onChange={(event) => {
                    setVerifyPassword(event.target.value);
                    setErrors({ ...errors, VerifyPassword: '' }); // Clear error when input changes
                  }} required />
                  {errors.VerifyPassword && <span className="error">{errors.VerifyPassword}</span>}
                </div>
              </div>

              <button type='submit' className='btn btn-primary' onClick={Userregister}>
                <span> Register</span>
                <MdAssignment className='icon' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Register
