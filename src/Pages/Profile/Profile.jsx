import React,{useEffect, useState} from "react";
import './Profile.css'
import { gettingOneData } from "../../Services/Apis";
import {useParams,Link} from 'react-router-dom'
import { API_URL } from "../../Services/Helper";
import Spinner from "../../Components/Spinner/Spinner";

const Profile = () => {

  const {id} = useParams()
  const [data,setData] = useState(null)
  const [loader,setLoader] = useState(true)
  
  useEffect(()=>{
    oneDataGet(id)
  },[id])

  const oneDataGet = async(id) => {
    const response = await gettingOneData(id)
    setData(response.data)
    setLoader(false)
  }


  return (
    <div className="container">
      <div className="row">
       {loader? <Spinner/>:""}
        <div className="col-lg-12 col-md-12 col-12 text-center mt-5 mb-5">
          <div className="profile-page">
            <div className="content">
              <div className="content__cover">
                <div className="content__avatar" style={{ backgroundImage: `url(${API_URL}/uploads/${data && data.profile})` }}>
                </div>
                <div className="content__bull">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="content__actions">
                <Link to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path
                      fill="currentColor"
                      d="M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z"
                    ></path>
                  </svg>
                  <div>
                  <span>Go to Home</span>
                  </div>
                </Link>
                <div>
                  <span style={{color:"#d782d9"}}>{data && data.gender ?data.gender:""}, {data && data.age ?data.age:""}</span>
                  <div style={{color:"#d782d9"}}>Created On: {data && data.dateCreated ?data.dateCreated.split("T")[0]:""}</div>
              </div>
              </div>
              <div className="content__title">
                <h1>{data && data.username ?data.username:""}</h1>
                <div>{data && data.email ?data.email:""}</div>
                <span style={{color:"#d782d9"}}>Status: {data && data.status ?data.status:""}</span>
              </div>
              <div className="content__description">
                <p>{data && data.prof ?data.prof:""}</p>
                <p>{data && data.address ?data.address:""}</p>
              </div>
            </div>
            <div className="bg">
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
