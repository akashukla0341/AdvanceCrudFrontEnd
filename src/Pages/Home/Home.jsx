import React,{useState} from "react";
import "./Home.css";
import { UserPlus, Search } from "lucide-react";
import Table from "../../Components/Table/Table";
import {Link} from 'react-router-dom'
import { exportToCsv } from "../../Services/Apis";

const Home = () => {

  const[search,setSearch] = useState("");
  const[gender,setGender] = useState("All");
  const[status,setStatus] = useState("All");
  const[short,setShort] = useState("new");

  const changeSearch = (e) => {
    setSearch(e.target.value)
  }

  const printFunction = () => {
    window.print()
  }

  const exporttoCsv = async() => {
      const response = await exportToCsv();
      if(response.status === 200){
        window.open(response.data.downloadUrl,'_blank')
      }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-12 col-md-12 col-12 d-flex justify-content-between align-items-center">
          <div>
            <input type="text" placeholder="Search by Name" style={{border:"2px solid #5C8374"}} onChange={changeSearch}/>
            <button className="btn-search" type="button">
              <Search />
            </button>
          </div>
          <div>
            <Link to="/registration" className="btn-search" type="button">
              <UserPlus /> Add User
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-3 col-6 mt-5">
          <div>
            <button className="btn-search" type="button" onClick={exporttoCsv}>
              Export To Csv
            </button>
            <button className="btn-search" type="button" onClick={printFunction}>
              Print
            </button>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 mt-4">
          <h5 className="font-color">Filter By Gender</h5>
          <div className="">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="allradio"
                onChange={(e)=>setGender(e.target.value)}
                defaultChecked
                value="All"
              />
              <label className="form-check-label font-color" htmlFor="allradio">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={(e)=>setGender(e.target.value)}
                id="maleradio"
                value="male"
              />
              <label className="form-check-label font-color" htmlFor="maleradio">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={(e)=>setGender(e.target.value)}
                id="femaleradio"
                value="female"
              />
              <label className="form-check-label font-color" htmlFor="femaleradio">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 mt-4">
          <h5 className="font-color">Short By Data</h5>
          <div className="">
            <div className="dropdown">
              <button
                className="btn-search dropdown-toggle mx-5 "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-sort"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="short">
                  <h6 className="font-color" onClick={(e)=>setShort("old")}>Old Data</h6>
                </li>
                <hr />
                <li className="short">
                  <h6 className="font-color" onClick={(e)=>setShort("new")}>New Data</h6>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6 mt-4">
          <h5 className="font-color">Filter By Status</h5>
          <div className="">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="allstatus"
                defaultChecked
                onChange={(e)=>setStatus(e.target.value)}
                value="All"
              />
              <label className="form-check-label font-color" htmlFor="allstatus">
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="active"
                onChange={(e)=>setStatus(e.target.value)}
                value="active"
              />
              <label className="form-check-label font-color" htmlFor="active">
                Active
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="status"
                id="inactive"
                onChange={(e)=>setStatus(e.target.value)}
                value="inactive"
              />
              <label className="form-check-label font-color" htmlFor="inactive">
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>
      <Table search={search} gender={gender} status={status} short={short}/>
    </div>
  );
};

export default Home;
