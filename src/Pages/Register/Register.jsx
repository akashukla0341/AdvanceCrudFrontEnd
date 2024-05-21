import React,{useState} from "react";
import Lottie from "lottie-react";
import Animation from "./Animation.json";
import { User, Mail, Radio, Image, UsersRound, MapPin,School,CalendarDays } from "lucide-react";
import "./Register.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import { registertionFunction } from "../../Services/Apis";
import Spinner from '../../Components/Spinner/Spinner'
import { gettingAllDatas } from "../../Services/Apis.js";

const Register = () => {


  const [imageUrl,setImageUrl] = useState("https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg");

  const [preview,setPreview] = useState("")

  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)


  const [registrationData,setRegistrationData] = useState({
    username:"",
    email:"",
    age:"",
    prof:"",
    address:"",
    status:"",
    gender:""
  })

    
    const handleChange = (e) => {
      setRegistrationData(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value
      }));
    }

    const handleProfile = (e)=>{
      setImageUrl(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
    
    
    const handleSubmit = async() => {

      const existingEmail = await gettingAllDatas("","All","All","new",1)
      let arr = []
      existingEmail.data.allStudents.map((val)=>(
          arr.push(val.email)
      ))


      if(registrationData.username === ""){
        toast.error("username is required!")
      }else if(registrationData.email === ""){
        toast.error("email is required!")
      
      }else if(!registrationData.email.includes('@')){
        toast.error("proper email is required!")
      }
      else if(registrationData.age === "" ){
        toast.error("age is required!")
      }
      else if(+registrationData.age < 10 ){
        toast.error("Please kindly enter the age greater than 9  !")
      }
      else if(+registrationData.age > 80){
        toast.error("Please kindly enter the age less than 81  !")
      }
      else if(registrationData.prof === ""){
        toast.error("profession is required!")
      }
      else if(registrationData.address === ""){
        toast.error("address is required!")
      }
      else if(!preview){
        toast.error("profile is required!")
      }
      else if(registrationData.status === ""){
        toast.error("status is required!")
      }
      else if(registrationData.gender === ""){
        toast.error("gender is required!")
      }else{
        const data = new FormData();
        data.append("username",registrationData.username)
        data.append("email",registrationData.email)
        data.append("age",registrationData.age)
        data.append("prof",registrationData.prof)
        data.append("address",registrationData.address)
        data.append("status",registrationData.status)
        data.append("gender",registrationData.gender)
        data.append("user_profile", imageUrl);

        const config = {
          'Content-Type':"multipart/form-data"
        }
        
        
        if(!arr.includes(registrationData.email)){
          setLoader(true)
        const response = await registertionFunction(data,config)
        if(response.status === 200){
          toast.success("Your registration is successfully done !")
          setRegistrationData({
            username:"",
            email:"",
            age:"",
            prof:"",
            address:"",
            status:"",
            gender:""
          })
          setTimeout(()=>{
            setLoader(false)
            navigate('/')
          },2000)
        }else{
          toast.error(response.data)
        }
      }else{
        toast.error("This email is already exist!" )
      }
      }
    }

  return (
    <>
      <div className="container">
        <div className="row mb-5">
        {loader?<Spinner/>:""}
          <div className="col-lg-5 col-md-5 col-12 mt-5">
            <Lottie animationData={Animation} style={{ width: "400px" }} />
            <div style={{ marginLeft: "65px" }}>
              <h2 className="font-color">Create an account</h2>
              <h6 className="font-color">Welcome! 🌟 to Our Platform!</h6>
              <p className="font-color" style={{ marginTop: "-10px" }}>
                We're thrilled you've joined us. 🎉
              </p>
              <p className="font-color" style={{ marginTop: "-10px" }}>
                If you need anything, we're here to help.
              </p>
              <h5 className="font-color">Cheers,</h5>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-12 mt-2">
            <div
              className="card mt-5 cr"
              style={{ width: "35rem", padding: "10px" }}
            >
                <div className="content_img" style={{ backgroundImage: preview?`url(${preview})`:`url(${imageUrl})` }}>
                </div>
              <div className="card-body">
                <h5 className="card-title text-center">Registration Form</h5>
                <div className="text-center p-2">
                  <label htmlFor="username" className="p-2">
                    <User />
                    Name:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={registrationData.username}
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center p-2">
                  <label htmlFor="email" className="p-2">
                    <Mail />
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={registrationData.email}
                    onChange={handleChange}
                    name="email"
                    autoComplete="off"
                  />
                </div>
                <div className="text-center p-2">
                  <label htmlFor="age" className="p-2">
                    <CalendarDays />
                    Age:
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={registrationData.age}
                    onChange={handleChange}
                    name="age"
                    autoComplete="off"
                  />
                </div>
                <div className="text-center p-2">
                  <label htmlFor="prof" className="p-2">
                    <School />
                    Profession:
                  </label>
                  <input
                    type="text"
                    id="prof"
                    value={registrationData.prof}
                    onChange={handleChange}
                    name="prof"
                    autoComplete="off"
                  />
                </div>
                <div className="text-center p-2">
                  <label htmlFor="address" className="p-2">
                    <MapPin />
                    Address:
                  </label>
                  <input
                    type="text"
                    value={registrationData.address}
                    onChange={handleChange}
                    id="address"
                    name="address"
                    autoComplete="off"
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="gender" style={{marginRight:"35px"}}>
                    <Radio />
                    Status:
                  </label>
                  <div className="form-check form-check-inline mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="active"
                      value="active"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label font-color"
                      htmlFor="active"
                    >
                      Active
                    </label>
                  </div>
                  <div className="form-check form-check-inline m-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="inactive"
                      onChange={handleChange}
                      value="inactive"
                    />
                    <label
                      className="form-check-label font-color"
                      htmlFor="inactive"
                    >
                      InActive
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  <label htmlFor="profile" style={{marginRight:"20px"}}>
                    <Image />
                    Profile:
                  </label>
                  <input
                    type="file"
                    id="profile"
                    autoComplete="off"
                    alt="pic"
                    accept=".jpg,.jpeg,.png"
                    name="user_profile"
                    onChange={handleProfile}
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="profile_pic" style={{marginRight:"50px"}}>
                    <UsersRound />
                    Gender:
                  </label>
                  <div className="form-check form-check-inline mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="maleradio"
                      onChange={handleChange}
                      value="male"
                    />
                    <label
                      className="form-check-label font-color"
                      htmlFor="maleradio"
                    >
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline m-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      onChange={handleChange}
                      id="femaleradio"
                      value="female"
                    />
                    <label
                      className="form-check-label font-color"
                      htmlFor="femaleradio"
                    >
                      Female
                    </label>
                  </div>
                </div>
                <div className="text-center">
                <button className="registerBtn" onClick={handleSubmit}>Register</button>
                </div>
                <ToastContainer position="top-center"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
