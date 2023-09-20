import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactSearchBox from "react-search-box";
import { Scrollbars } from "react-custom-scrollbars";
import Buttons from "./Buttons";
import data from "./Api.json";
import { Link } from "react-router-dom";
// import axios from 'axios';
// import contactsData from './api';
import ModalC from "./ModalC";
const Modals = () => {
  const [pnum, setPnum] = useState([]);
  const [details, setDetails] = useState(false);
  const [showEvenContacts, setShowEvenContacts] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalA, setModalA] = useState(false);

  const ModalABtn = () => {
    const contactArray = Object.values(data.contacts); // Convert the object into an array
    setPnum(contactArray);
    setDetails(true);
  };

  const checkbox = () => {
    setShowEvenContacts(!showEvenContacts);
    setDetails(false);
  };




 
//api not working just for example:
  useEffect(() => {
    const apiUrl = 'https://api.dev.pastorsline.com/api/contacts.json';
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4';
  
    // Set up Axios with the authorization header
    const axiosInstance = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    axiosInstance.get(apiUrl)
      .then((response) => {
        // setContacts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error.message);
      });
  }, []);
  


  
  const modalc = () => {
    setShowModal(true);
    
    console.log("kkkkkkkkkkkkkkkk");
  };

  const close = () => {
    // setModalA(true);
    setShowModal(false)
    console.log("lllllll");
    // console.log(modalA);
  };

  useEffect(() => {
    const filteredContacts = Object.values(data.contacts).filter((contact) => {
      return (
        (!showEvenContacts || (showEvenContacts && contact.id % 2 === 0)) &&
        (searchText === "" ||
          contact.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          contact.last_name.toLowerCase().includes(searchText.toLowerCase()))
      );
    });

    setPnum(filteredContacts);
  }, [showEvenContacts, searchText]);

  console.log(pnum[0], "numbers");

  return (
    <>
      <div className="container text-center mt-5">
        <div className="buttons">
          <Link to="/modala">
            <button
              type="button"
              class="btn btn-primary m-4"
              data-toggle="modal"
              data-target="#exampleModal"
              style={{ backgroundColor: "#46139f", border: "none" }}
              onClick={() => setModalA(true)}
            >
              Button A
            </button>
          </Link>
          <Link to="/modalb">
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal2"
              style={{ backgroundColor: "#ff7f50", border: "none" }}
            >
              Button B
            </button>
          </Link>
        </div>

        {/* <!-- Modal A--> tech tr */}

        {modalA && (
          <div className="ModalA">
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal A
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="container mt-3">
                    <ReactSearchBox
                      placeholder="Search"
                      value={searchText}
                      data={pnum.map((contact) => ({
                        key: contact.id,
                        value: `${contact.first_name} ${contact.phone_number}`,
                      }))}
                      callback={(record) => setSearchText(record.searchText)}
                    />
                  </div>
                  <Scrollbars style={{ width: 500, height: 200 }}>
                    <div className="container">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details
                            ? pnum.map((val, index) => {
                                return (
                                  <>
                                    <tr
                                      onClick={modalc}
                                      data-toggle="modal"
                                      data-target="#exampleModal3"
                                    >
                                      <th scope="row">{val.id}</th>
                                      <td>{val.first_name}</td>
                                      <td>{val.phone_number}</td>
                                    </tr>
                                  </>
                                );
                              })
                            : pnum.map((value, index) => {
                                if (
                                  !showEvenContacts ||
                                  (showEvenContacts && value.id % 2 === 0)
                                ) {
                                  return (
                                    <>
                                      <tr
                                        onClick={modalc}
                                        data-toggle="modal"
                                        data-target="#exampleModal3"
                                      >
                                        <th scope="row">{value.id}</th>
                                        <td>{value.first_name}</td>
                                        <td>{value.phone_number}</td>
                                      </tr>
                                    </>
                                  );
                                }
                              })}
                        </tbody>
                      </table>
                    </div>
                  </Scrollbars>

                  <Buttons />
                  <div class="modal-footer justify-content-start">
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          onClick={checkbox}
                        />
                        <label class="form-check-label" for="gridCheck">
                          Only even
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal ? (
          <>
            {/* <!-- Modal --> */}
            <div className="modal-overlay" style={{ zIndex: showModal ? 99999 : "" }}>
              <div className="modal-content3">
                <div
                  class="modal fade"
                  id="exampleModal3"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Modal C
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div className="container">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">0</th>
                                <td>Lisa</td>
                                <td>9824543510</td>
                              </tr>

                              <tr>
                                <th scope="row">1</th>
                                <td>John</td>
                                <td>1234567890</td>
                              </tr>

                              <tr>
                                <th scope="row">3</th>
                                <td>Jane</td>
                                <td>1876543210</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={close}
                        >
                          Close
                        </button>
                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* <!-- Modal B--> */}
        <div className="ModalB">
          <div
            class="modal fade"
            id="exampleModal2"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal B
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div className="container mt-3">
                  <ReactSearchBox
                    placeholder="Search"
                    value={searchText}
                    data={pnum.map((contact) => ({
                      key: contact.id,
                      value: `${contact.first_name} ${contact.phone_number}`,
                    }))}
                    callback={(record) => setSearchText(record.searchText)}
                  />
                </div>
                <Scrollbars style={{ width: 500, height: 200 }}>
                  <div className="container">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pnum
                          .filter((val) => val.country_id === 226)
                          .map((val, index) => {
                            return (
                              <tr key={index}>
                                <th scope="row">{val.id}</th>
                                <td>{val.first_name}</td>
                                <td>{val.phone_number}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </Scrollbars>
                <Buttons />
                <div class="modal-footer justify-content-start"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modals;
