import React,{useState,useEffect} from "react";
import Lottie from "lottie-react";
import Animation from "./Animation-edit.json";
import { User, Mail, Radio, Image, UsersRound, MapPin,School,CalendarDays } from "lucide-react";
import "./Edit.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,useParams} from 'react-router-dom'
import { API_URL } from "../../Services/Helper";
import { gettingOneData,EditOneData,gettingAllDatas } from "../../Services/Apis";
import Spinner from "../../Components/Spinner/Spinner";

const Edit = () => {


  const {id} = useParams()
  const [loader,setLoader] = useState(true)


  const [imageUrl,setImageUrl]= useState("https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg");

  const [preview,setPreview] = useState("")
  const navigate = useNavigate()

  const [editData,setEditData] = useState({
    username:"",
    email:"",
    age:"",
    prof:"",
    address:"",
    status:"",
    gender:""
  })

  const oneDataGet = async(id) => {
    const response = await gettingOneData(id)
    setEditData(response.data)
    setLoader(false)
  }

  useEffect(()=>{
    oneDataGet(id)
  },[id])


    
    const handleChange = (e) => {
      setEditData(prevData => ({
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
      let arr = existingEmail.data.allStudents.filter((val)=>{
          return val.email !== editData.email
        })

      if(editData.username === ""){
        toast.error("username is required!")
      }else if(editData.email === ""){
        toast.error("email is required!")
      
      }else if(!editData.email.includes('@')){
        toast.error("proper email is required!")
      }
      else if(editData.age === ""){
        toast.error("age is required!")
      }
      else if(editData.prof === ""){
        toast.error("profession is required!")
      }
      else if(editData.address === ""){
        toast.error("address is required!")
      }
      else if(!preview){
        toast.error("profile is required!")
      }
      else if(editData.status === ""){
        toast.error("status is required!")
      }
      else if(editData.gender === ""){
        toast.error("gender is required!")
      }else{
        const data = new FormData();
        data.append("username",editData.username)
        data.append("email",editData.email)
        data.append("age",editData.age)
        data.append("prof",editData.prof)
        data.append("address",editData.address)
        data.append("status",editData.status)
        data.append("gender",editData.gender)
        data.append("user_profile", imageUrl);
        
        if(!arr.includes(editData.email)){
          setLoader(true)
        const config = {
          'Content-Type':"multipart/form-data"
        }
        const response = await EditOneData(id,data,config)
        if(response.status === 200){
          toast.success(response.data.message)
        }
        setEditData({
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
        toast.error("Please edit your email")
      }
    }
    }

  return (
    <>
      <div className="container mb-5">
        <div className="row mb-5">
        {loader?<Spinner/>:""}
          <div className="col-lg-5 col-md-5 col-12 mt-5">
            <Lottie animationData={Animation} style={{ width: "400px" }} />
          </div>
          <div className="col-lg-7 col-md-7 col-12 mt-2">
            <div
              className="card mt-5 cr"
              style={{ width: "35rem", padding: "10px" }}
            >
              <div className="content_image" style={{ backgroundImage: preview?`url(${preview})`:`url(${API_URL}/uploads/${editData.profile})`}}>
                </div>
              <div className="card-body">
                <h5 className="card-title text-center">Edit your information</h5>
                <div className="text-center p-2">
                  <label htmlFor="username" className="p-2">
                    <User />Name:
                  </label>
                  <input
                    type="text"
                    value={editData.username}
                    id="username"
                    onChange={handleChange}
                    name="username"
                    autoComplete="off"
                  />
                </div>
                <div className="text-center p-2">
                  <label htmlFor="email" className="p-2">
                    <Mail />Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={editData.email}
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
                    onChange={handleChange}
                    name="age"
                    value={editData.age}
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
                    value={editData.prof}
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
                    id="address"
                    value={editData.address}
                    name="address"
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
                <div className="text-center ">
                  <label htmlFor="gender" style={{marginRight:"35px"}}>
                    <Radio />Status:
                  </label>
                  <div className="form-check form-check-inline mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      onChange={handleChange}
                      id="active"
                      checked={editData.status === "active"?true:false}
                      value="active"
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
                      checked={editData.status === "inactive"?true:false}
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
                  <label htmlFor="status" className="p-2" style={{marginRight:"15px"}}>
                    <Image />
                    Profile:
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleProfile}
                    autoComplete="off"
                    alt="pic"
                    name="user_profile"
                  />
                </div>
                <div className="text-center">
                  <label htmlFor="profile_pic" style={{marginRight:"65px"}}>
                    <UsersRound />Gender:
                  </label>
                  <div className="form-check form-check-inline" >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      onChange={handleChange}
                      id="maleradio"
                      checked={editData.gender === "male"?true:false}
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
                      id="femaleradio"
                      onChange={handleChange}
                      value="female"
                      checked={editData.gender === "female"?true:false}
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
                <button className="submitBtn" onClick={handleSubmit}>Submit</button>
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

export default Edit;
