/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecuritySidebar from './SecuritySideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from './Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import { fetchSystemRoles } from '../../../actions/systemRole';
import { createSystemUser, updateSystemUser, deleteSystemUser, RESET_USER_ALERT } from "../../../actions/systemUser";
import axios from "axios";
import Spinner from '../../Spinner/Spinner';

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemSecurityUpdateUser = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const [isCashier, setIsCashier] = useState(false);
  const [sortedRoles, setSortedRoles] = useState([]);
  const [sortedTempRoles, setSortedTempRoles] = useState([]);
  const [sortedTempUsers, setSortedTempUsers] = useState([]);
  // const [value, setValue] = useState("");
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dataLoadFailed, setDataLoadFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roleDisable, setRoleDisable] = useState(false);
  const [isCashierDisable, setIsCashierDisable] = useState(false);
  

  const {
    modalCloser, openModel, modalText,modalOpener
  } = ModalFunction();


//   const roles = useSelector(state => state.systemRoleReducer);
  const companyInfo = useSelector(state => state.companyInfoReducer);
  const user = useSelector(state => state?.systemUserReducer?.systemUser);
  const userUpdated = useSelector(state => state?.systemUserReducer?.userUpdated);
  const deletedUser = useSelector(state => state?.systemUserReducer?.deletedUser);
  
  console.log(companyInfo)

  useEffect(() => {
    fetchSystemUsers();
  }, []);

  useEffect(() => {
      setTimeout(()=>{
          dispatch({type: RESET_USER_ALERT})
      },3000)
    
  }, [userUpdated]);

  useEffect(() => {
 
    setFormState({});
    setTimeout(()=>{
        dispatch({type: RESET_USER_ALERT})
    },3000) 
}, [deletedUser]);


  const reloadPage = () => {
    setIsLoading(true);
    fetchSystemUsers();  
  }

  const fetchSystemUsers = async () => {
        axios.get(`${baseUrl}/api/System/GetSystemUsers`)
        .then(function (response) {
            // handle success
                setUsers(response.data);
                axios.get(`${baseUrl}/api/System/GetRoles`)
                .then(function (response) {
                    // handle success
                    setRoles(response.data);
                })
                .catch(function (error) {
                    // handle error
                    // console.log(error);
                    setDataLoadFailed(true);
                })
                
        })
        .catch(function (error) {
            // handle error
            console.log(error)
            setDataLoadFailed(true);
        })
       

  }

  const fetchSelectedUser = async (userName) => {
    axios.get(`${baseUrl}/api/System/GetSystemUser/${userName}`)
    .then(function (response) {
        // handle success
        console.log(response.data);
         setFormState(response.data)
         if (response.data.tempRole) {
            setRoleDisable(false);
        } else if (!response.data.tempRole) {
            setRoleDisable(true);
        }
        if (response.data.isCashier) {
            setIsCashierDisable(false);
        } else if (!response.data.isCashier) {
            setIsCashierDisable(true);
        }
        
    })
    .catch(function (error) {
        // handle error
        console.log(error)
        setDataLoadFailed(true);
    })
   

}


  const handleChange = e => {
    const { name, value } = e.target;
    if (errors.hasOwnProperty(name)) {
      console.log("inside");
      setErrors({...errors, [name]:""});
    }
    console.log(formState, 'data state');
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleChecking = e => {
    const { name, checked } = e.target;
    console.log(name)
    if (name === "tempRole" && !checked) {
        console.log("locked role inputs")
        setRoleDisable(true);
    } else if (name === "tempRole" && checked) {
        setRoleDisable(false);
    }
    if (name === "isCashier" && !checked) {
        console.log("locked cashier")
        setIsCashierDisable(true);
    } else if (name === "isCashier" && checked) {
        setIsCashierDisable(false);
    }
    if (errors.hasOwnProperty(name)) {
      console.log("inside");
      setErrors({...errors, [name]:""});
    }
    console.log(formState, 'data state');
    setFormState(() => ({
      ...formState,
      [name]: checked,
    }));
  };

  const selectRole = (e) => {
    setFormState(()=>({
      ...formState,
      [e.target.dataset.name]:e.target.dataset.selected
    }));
    setSortedRoles([]);
  }

  const selectTempRole = (e) => {
    setFormState(()=>({
      ...formState,
      [e.target.dataset.name]:e.target.dataset.selected
    }));
    setSortedTempRoles([]);
  }

  const selectTempUser = (e) => {
    fetchSelectedUser(e.target.dataset.selected)
    console.log(formState)
    setSortedTempUsers([]);
  }


  const filterRoles = e => {
    const { name, value} = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0){
      console.log( roles.systemRoles)
      console.log(value)
      const filteredroles = roles.filter((role)=> (role.roleID.toLowerCase().includes(value.toLowerCase())));
      console.log(filteredroles)
      setSortedRoles(filteredroles);
    }else {
      setSortedRoles([]);
    }
  }

  const filterTempRoles = e => {
    const { name, value} = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0){
      console.log( roles.systemRoles)
      console.log(value)
      const filteredtemproles = roles.filter((role)=> (role.roleID.toLowerCase().includes(value.toLowerCase())));
      console.log(filteredtemproles)
      setSortedTempRoles(filteredtemproles);
    }else {
      setSortedTempRoles([]);
    }
  }

  const filterTempUsers = e => {
    const { name, value} = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0){
      console.log( roles.systemRoles)
      console.log(value)
      const filteredtempusers = users.filter((user)=> (user.userName.toLowerCase().includes(value.toLowerCase())));
      console.log(filteredtempusers)
      setSortedTempUsers(filteredtempusers);
    }else {
        setSortedTempUsers([]);
    }
  }

  const createUser = () => {
    console.log(formState)
      dispatch(createSystemUser(formState))
      .then(()=> {
        setIsLoaded(true) 
      })
  }

  const updateUser = () => {
    console.log(formState)
      dispatch(updateSystemUser(formState))
      .then(()=> {
        setIsLoaded(true) 
      })
  }

  const deleteUser = () => {
      dispatch(deleteSystemUser(formState))
  }

  const formatDateTime = (datevalue) => {
    let currentDate = new Date(datevalue);
    let date = currentDate.getDate();
    let month = currentDate.getMonth(); 
    let year = currentDate.getFullYear();
    // return  year + "-" + +"0"+(month+1)  + "-" + "0"+date;
    return currentDate.toISOString().split('T')[0];

  }

  const clearFields = (e) => {
    e.preventDefault();
    setFormState({})
  }

  console.log(formState,"staedata")


  return roles.length > 0 ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />

    {userUpdated && <div className="alert user-alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success</strong> User {user.userName} Updated Successfully
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span  aria-hidden="true">&times;</span>
      </button>
    </div>
    }

    {deletedUser && <div className="alert user-alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success</strong> User Deleted Successfully
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span  aria-hidden="true">&times;</span>
        </button>
        </div>
    }

      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: User Update Section</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="usermaintenance-section">
            <div className="user-details-section">
                <div className="user-details-data-section">
                        <div className="userdetails-create-header">
                        User Details
                        </div>
                        <form>
                        <div className="input-div">
                            <div className="label">Search a Login ID</div>
                            <div className="input-box">
                                <Input
                                handleChange={filterTempUsers} 
                                value={formState.userName}
                                name="userName" 
                                type="text" />
                            </div>
                            {
                                sortedTempUsers.length <= 0 ? (
                                    <div className="modal-hide-section-user-useredit" />
                                ) : (

                                    <div className="modal-popup-section-user-useredit">
                                    <div className="inner-section-modal-section-user-useredit">
                                        {
                                        sortedTempUsers.map(user => (
                                        <div
                                            className="inner-section-modal-section-inner-user-useredit border"
                                            key={user.userName}
                                            
                                        >
                                            <div 
                                            data-name = "userName"
                                            data-selected={user.userName}
                                            onClick = {selectTempUser} 
                                            className="modal-customer-name-section mr-2"
                                            >
                                            {user.userName}
                                            </div>
                                        </div>
                                        ))
                                    }
                                    </div>
                                    </div>
                                )
                                }
                        </div>
                        <div className="input-div">
                        <div className="input-div">
                            <div className="label">Password</div>
                            <div className="input-box-password">
                            <Input
                            handleChange={handleChange} 
                            value={formState.userPassword} 
                            name="userPassword" 
                            type="password" />
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Confirm Password</div>
                            <div className="input-box-password">
                            <Input 
                            handleChange={handleChange}
                            value={formState.userPassword}  
                            name="password" 
                            type="password" />
                            </div>
                        </div>
                        
                        </div>
                        <div className="input-div">
                        <div className="label">Surname</div>
                        <div className="input-box">
                            <Input 
                            handleChange={handleChange}
                            value={formState.surName}  
                            name="surName" 
                            type="text" />
                        </div>
                        </div>
                        <div className="input-div">
                        <div className="label">Other Names</div>
                        <div className="input-box">
                            <Input 
                            handleChange={handleChange}
                            value={formState.otherNames}  
                            name="otherNames" 
                            type="text" />
                        </div>
                        </div>
                        <div className="input-div">
                        <div className="input-div">
                            <div className="label">Phone1</div>
                            <div className="input-box-phone">
                            <Input
                            handleChange={handleChange} 
                            value={formState.phoneNo1}   
                            name="phoneNo1" 
                            type="text" />
                            </div>
                        </div>
                        <div className="input-div">
                            <div className="label">Phone2</div>
                            <div className="input-box-phone">
                            <Input 
                            handleChange={handleChange} 
                            value={formState.phoneNo2}
                            name="phoneNo2" 
                            type="text" />
                            </div>
                        </div>
                        
                        </div>
                    </form>
                    
                </div>
              <div className="userroleadd-section">
                <div className="userrole-create-header">
                  User Role
                </div>
                  <form>
                    <div className="input-div">
                      <div className="label">Search a Role ID</div>
                      <div className="input-box">
                        <Input value={formState.roleID}  name="roleID" handleChange={filterRoles} type="text"  />
                      </div>
                          {
                            sortedRoles.length <= 0 ? (
                              <div className="modal-hide-section-useredit" />
                            ) : (

                              <div className="modal-popup-section-useredit">
                                <div className="inner-section-modal-section-useredit">
                                  {
                                    sortedRoles.map(role => (
                                    <div
                                      className="inner-section-modal-section-inner-useredit border"
                                      key={role.roleID}
                                      
                                    >
                                      <div
                                        data-name = "roleID" 
                                        data-selected={role.roleID}
                                        onClick = {selectRole} 
                                        className="modal-customer-name-section mr-2"
                                      >
                                        {role.roleID}
                                      </div>
                                    </div>
                                  ))
                                }
                                </div>
                              </div>
                            )
                          }
                    </div>
                    <div className="input-div">
                        <div className="label">Account is Verified</div>
                        <div className="input-box">
                        <Input 
                        handleChange={handleChecking} 
                        value={formState.isVerified} 
                        name="isVerified" 
                        type="checkbox" 
                        checked={formState.isVerified}
                        />
                        </div>                    
                    </div>
                    <div className="input-div">
                        <div className="label">Account is Deleted</div>
                        <div className="input-box">
                        <Input 
                        handleChange={handleChecking} 
                        value={formState.isDeleted} 
                        name="isDeleted" 
                        type="checkbox"
                        checked={formState.isDeleted} 
                        />
                        </div>                    
                    </div>

                  </form>
              </div>
               
            </div>

            <div className="user-settings-section">
              
              <div className="user-temporary-role">
                <form>

                <div className="input-div">
                  <div className="label">Temporary Role</div>
                  <div className="input-box">
                    <Input 
                    handleChange={handleChecking} 
                    value={formState.tempRole} 
                    name="tempRole" 
                    type="checkbox"
                    checked={formState.tempRole}
                    
                     />
                  </div>                    
                </div>

                <div className="input-div">
                    <div className="label">Role</div>
                    <div className="input-box">
                      <Input disabled={roleDisable} value={formState.tempRoleID} name="tempRoleID" type="text" handleChange={filterTempRoles}  />
                    </div>
                    {
                      sortedTempRoles.length <= 0 ? (
                        <div className="modal-hide-section-role-useredit" />
                      ) : (

                        <div className="modal-popup-section-role-useredit">
                          <div className="inner-section-modal-section-role-useredit">
                            {
                              sortedTempRoles.map(role => (
                              <div
                                className="inner-section-modal-section-inner-role-useredit border"
                                key={role.roleID}
                                
                              >
                                <div 
                                data-name = "tempRoleID"
                                  data-selected={role.roleID}
                                  onClick = {selectTempRole} 
                                  className="modal-customer-name-section mr-2"
                                >
                                  {role.roleID}
                                </div>
                              </div>
                            ))
                          }
                          </div>
                        </div>
                      )
                    }
                </div>

                <div className="input-div">
                    <div className="label">Expiry Date</div>
                    <div className="input-box">
                      <Input 
                      handleChange={handleChange} 
                      value={formState.tempExpiryDate ? formatDateTime(formState.tempExpiryDate) : formState.tempExpiryDate}
                      name="tempExpiryDate" 
                      type="date"
                      disabled={roleDisable}  
                      />
                    </div>
                </div>

                
              </form>

              </div>
              <div className="user-advanced-settings">
                    <div className="userdetails-create-header">
                        Advanced Settings
                    </div>
                    <hr />
                    <form>
                    <div className="input-div">
                        <div className="label">Is Cashier</div>
                        <div className="input-box">
                        <Input 
                        handleChange={handleChecking}
                        value={formState.isCashier} 
                        name="isCashier" 
                        type="checkbox"
                        checked={formState.isCashier}
                        
                          />
                        </div>                    
                    </div>
                    <div className="input-div">
                        <div className="label">CashierGL</div>
                        <div className="input-box">
                            <Input name="cashierGL" disabled={isCashierDisable} type="search"  placeholder="Search a GL" />
                            <span></span>
                        </div>
                    </div>
                    <div className="input-div">
                        <div className="label">Password Never Expires</div>
                        <div className="input-box">
                        <Input 
                        handleChange={handleChecking} 
                        value={formState.passwordNeverExpires}
                        name="passwordNeverExpires" 
                        type="checkbox" 
                        checked={formState.passwordNeverExpires}
                        />
                        </div>                    
                    </div>

                    <div className="input-div">
                        <div className="label">User must change password at next Logon</div>
                        <div className="input-box">
                        <Input
                        handleChange={handleChecking} 
                        value={formState.mustChangePassword} 
                        name="mustChangePassword" 
                        type="checkbox"
                        checked = {formState.mustChangePassword} 
                        />
                        </div>                    
                    </div>

                    <div className="input-div">
                        <div className="label">Account is Disabled</div>
                        <div className="input-box">
                        <Input 
                        handleChange={handleChecking} 
                        value={formState.isDisabled} 
                        name="isDisabled" 
                        type="checkbox" />
                        </div>                    
                    </div>

                    </form>

                        <div className="cancel-submit-buttons-section">
                            <Button 
                            onClick = {updateUser}
                            name="Update User"/>
                            <Button 
                            onClick = {clearFields}
                            name="Clear Data"
                            />
                            <Button 
                            onClick = {deleteUser}
                            name="Delete User"
                            />
                        </div>
                </div>
                
            </div>

          </div>


        </div>
      </div>
    </div>
  ) : dataLoadFailed ? (
    <div className="page-refresh">
        <div >
            <p>Page Load Failed Please Click <button onClick={reloadPage} >{isLoading ? <Spinner /> : "Here" }</button> to Reload </p>
            {console.log("in this condition")}
        </div>
    </div>) : isLoading ? (
    <div className="spinner section">
      <Loader headerText="System Security: Edit User" />
    </div>
    ) : (
    <div className="spinner section">
      <Loader headerText="System Security: Edit User" />
    </div>
    )

};

export default SystemSecurityUpdateUser;
