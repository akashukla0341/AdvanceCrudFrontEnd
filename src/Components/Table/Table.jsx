import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Table.css";
import { gettingAllDatas, deleteData } from "../../Services/Apis";
import { API_URL } from "../../Services/Helper";
import Spinner from "../Spinner/Spinner";
import { statusChange } from "../../Services/Apis";

const Table = ({ search, gender, status, short }) => {
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const activeStatusChange = async (id, value) => {
    const response = await statusChange(id, value);
    toast.success(response.data.message);
    const responseData = await getAllDatas(search, gender, status, short);
    if (responseData.status === 200) {
    setGetData(responseData.data.allStudents);
    }
  };

  const navigate = useNavigate();

  const [getData, setGetData] = useState([]);

  useEffect(() => {
    getAllDatas(search, gender, status, short, page).then(
      (res) => {
        setGetData(res.data.allStudents);
        setPageCount(res.data.pagination.pageCount);
        setLoader(false);
      }
    )
  }, [search, gender, status, short, page]);

  async function getAllDatas(search, gender, status, short, page) {
    const response = await gettingAllDatas(search, gender, status, short, page);
    return response;
  }

  const previousPagination = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };
  const nextPagination = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };

  const deleteOneData = async (id) => {
    if (id.trim() === "") {
      return;
    } else {
      if (window.confirm("Are you sure want to Delete!")) {
        setLoader(true);
        const response = await deleteData(id);
        toast.success(response.data.message)
        setGetData((prevData) => prevData.filter((item) => item._id !== id));
        setLoader(false);
        navigate("/");
      }
    }
  };

  return (
    <div className="row">
      <div className="container">
        <div className="col-lg-12 col-md-12 col-12">
          {loader ? <Spinner /> : ""}
          <table className="table mt-5 table-light" responsive="sm">
            {getData.length < 1 ? (
              ""
            ) : (
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full-name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age</th>
                  <th scope="col">Address</th>
                  <th scope="col">Profession</th>
                  <th scope="col">Status</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
            )}
            {/* <tbody className="">
              {getData.length < 1 ? (
                <div>No data found....!</div>
              ) : (
                getData.map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1 + (page-1) * 5}</th>
                    <td>{val.username}</td> <td>{val.email}</td>{" "}
                    <td>{val.gender}</td> <td>{val.age}</td>{" "}
                    <td>{val.address}</td> <td>{val.prof}</td>{" "}
                    <td>
                      <div className="dropdown">
                        <button
                          className={
                            val.status === "active"
                              ? "dropdown-toggle btn btn-sm btn-primary"
                              : "dropdown-toggle btn btn-sm btn-danger"
                          }
                          type="button"
                          id="dropdownMenuButton2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span style={{ color: "black" }}>{val.status}</span>{" "}
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton2"
                        >
                          <li
                            className="short"
                            onClick={() =>
                              activeStatusChange(val._id, "active")
                            }
                          >
                            <h6 className="font-color">Active</h6>
                          </li>
                          <hr />
                          <li
                            className="short"
                            onClick={() =>
                              activeStatusChange(val._id, "inactive")
                            }
                          >
                            <h6 className="font-color">InActive</h6>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <img
                        src={`${API_URL}/uploads/${val.profile}`}
                        alt="User"
                        style={{ width: "35px", marginLeft: "8px" }}
                      />{" "}
                    </td>
                    <td className="mx-2">
                      <div className="dropdown all-list">
                        <i
                          className="fa-solid fa-ellipsis-vertical"
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButton1"
                          style={{ marginLeft: "20px" }}
                        ></i>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className="short">
                            <Link
                              className="font-color"
                              to={`/edit/${val._id}`}
                            >
                              Edit
                            </Link>{" "}
                          </li>
                          <hr />
                          <li className="short">
                            <Link
                              className="font-color"
                              to={`/profile/${val._id}`}
                            >
                              View
                            </Link>{" "}
                          </li>
                          <hr />
                          <li className="short">
                            <Link
                              className="font-color"
                              onClick={() => deleteOneData(val._id)}
                            >
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody> */}
            <tbody>
              {getData.length < 1 ? (
                <tr>
                  <td colSpan="10">No data found....!</td>
                </tr>
              ) : (
                getData.map((val, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1 + (page - 1) * 5}</th>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td>{val.gender}</td>
                    <td>{val.age}</td>
                    <td>{val.address}</td>
                    <td>{val.prof}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className={
                            val.status === "active"
                              ? "dropdown-toggle btn btn-sm btn-primary"
                              : "dropdown-toggle btn btn-sm btn-danger"
                          }
                          type="button"
                          id="dropdownMenuButton2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span style={{ color: "black" }}>{val.status}</span>
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton2"
                        >
                          <li
                            className="short"
                            onClick={() =>
                              activeStatusChange(val._id, "active")
                            }
                          >
                            <h6 className="font-color">Active</h6>
                          </li>
                          <hr />
                          <li
                            className="short"
                            onClick={() =>
                              activeStatusChange(val._id, "inactive")
                            }
                          >
                            <h6 className="font-color">InActive</h6>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <img
                        src={`${API_URL}/uploads/${val.profile}`}
                        alt="User"
                        style={{ width: "35px", marginLeft: "8px" }}
                      />
                    </td>
                    <td className="mx-2">
                      <div className="dropdown all-list">
                        <i
                          className="fa-solid fa-ellipsis-vertical"
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                          id="dropdownMenuButton1"
                          style={{ marginLeft: "20px" }}
                        ></i>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <li className="short">
                            <Link
                              className="font-color"
                              to={`/edit/${val._id}`}
                            >
                              Edit
                            </Link>{" "}
                          </li>
                          <hr />
                          <li className="short">
                            <Link
                              className="font-color"
                              to={`/profile/${val._id}`}
                            >
                              View
                            </Link>{" "}
                          </li>
                          <hr />
                          <li className="short">
                            <Link
                              className="font-color"
                              onClick={() => deleteOneData(val._id)}
                            >
                              Delete
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    aria-label="Previous"
                    onClick={previousPagination}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="">Previous</span>
                  </button>
                </li>
                <span
                  style={{
                    fontSize: "18px",
                    margin: "1px",
                    color: "blue",
                    backgroundColor: "#fff",
                    paddingTop: "5px",
                    paddingRight: "3px",
                  }}
                >
                  {page} of {pageCount}
                </span>
                <li className="page-item">
                  <button
                    className="page-link"
                    aria-label="Next"
                    onClick={nextPagination}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="">Next</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Table;
