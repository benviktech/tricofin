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
import Loader from '../../Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import { fetchSystemRoles } from '../../../actions/systemRole';
import { createSystemUser,RESET_USER_ALERT  } from "../../../actions/systemUser";

const SystemSecurityMaintenance = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();

  const [isCashier, setIsCashier] = useState(false);
  const [sortedRoles, setSortedRoles] = useState([]);
  const [sortedTempRoles, setSortedTempRoles] = useState([]);
  // const [value, setValue] = useState("");
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleDisable, setRoleDisable] = useState(false);
  const [isCashierDisable, setIsCashierDisable] = useState(false);
  

  const {
    modalCloser, openModel, modalText,modalOpener
  } = ModalFunction();


  const roles = useSelector(state => state.systemRoleReducer);
  const companyInfo = useSelector(state => state.companyInfoReducer);
  const user = useSelector(state => state?.systemUserReducer?.systemUser);
  const userCreated = useSelector(state => state?.systemUserReducer?.userCreated);
  
  console.log(companyInfo)

  useEffect(() => {
    dispatch(fetchSystemRoles());
    if(!formState.tempRole) {
      setRoleDisable(true);
    }else if(formState.tempRole){
      setRoleDisable(false);
    }

    if(!formState.isCashier) {
      setIsCashierDisable(true)
    }else if(formState.isCashier){
      setIsCashierDisable(false)
    }
  }, []);

  useEffect(() => {
      setTimeout(()=>{
          dispatch({type: RESET_USER_ALERT})
      },3000)  
  },[userCreated]);


  const resetAlert = () => {
    setIsLoaded(false)
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


  const filterRoles = e => {
    const { name, value} = e.target;
    setFormState(() => ({
      ...formState,
      [name]: value,
    }));
    if (value.trim().length > 0){
      console.log( roles.systemRoles)
      console.log(value)
      const filteredroles = roles.systemRoles.filter((role)=> (role.roleID.toLowerCase().includes(value.toLowerCase())));
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
      const filteredtemproles = roles.systemRoles.filter((role)=> (role.roleID.toLowerCase().includes(value.toLowerCase())));
      console.log(filteredtemproles)
      setSortedTempRoles(filteredtemproles);
    }else {
      setSortedTempRoles([]);
    }
  }

  const createUser = () => {
    console.log(formState)
      dispatch(createSystemUser(formState))
      .then(()=> {
        setIsLoaded(true) 
      })
  }

  const clearFields = (e) => {
    e.preventDefault();
    setFormState({});
  }

  console.log(formState,"staedata")


  return roles.systemRoles.length > 0 ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />

    {userCreated && <div className="alert user-alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success</strong> User {user.userName} Created Successfully
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span onClick={resetAlert} aria-hidden="true">&times;</span>
      </button>
    </div>
    }

      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: User Maintenance</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="usermaintenance-section">
            <div className="user-details-section">
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
                              <div className="modal-hide-section" />
                            ) : (

                              <div className="modal-popup-section">
                                <div className="inner-section-modal-section">
                                  {
                                    sortedRoles.map(role => (
                                    <div
                                      className="inner-section-modal-section-inner border"
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
                  </form>
              </div>
              <div className="user-details-section">
                <hr />
                    <div className="userdetails-create-header">
                      User Details
                    </div>
                    <form>
                    <div className="input-div">
                      <div className="label">Login ID</div>
                      <div className="input-box">
                        <Input
                        handleChange={handleChange} 
                        value={formState.userName}
                        name="userName" 
                        type="text" />
                      </div>
                    </div>
                    <div className="input-div">
                      <div className="input-div">
                        <div className="label">Password</div>
                        <div className="input-box-password">
                          <Input
                          handleChange={handleChange} 
                          value={formState.userpassword} 
                          name="userpassword" 
                          type="password" />
                        </div>
                      </div>
                      <div className="input-div">
                        <div className="label">Confirm Password</div>
                        <div className="input-box-password">
                          <Input 
                          handleChange={handleChange}
                          value={formState.password}  
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
                  <div className="cancel-submit-buttons-section">
                    <Button 
                    onClick = {createUser}
                    name="Add"/>
                    <Button 
                    onClick = {clearFields}
                    name="Cancel"
                    />
                  </div>
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
                        <div className="modal-hide-section-role" />
                      ) : (

                        <div className="modal-popup-section-role">
                          <div className="inner-section-modal-section-role">
                            {
                              sortedTempRoles.map(role => (
                              <div
                                className="inner-section-modal-section-inner-role border"
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
                      value={formState.tempExpiryDate}
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
                      type="checkbox"  />
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
                      type="checkbox" />
                    </div>                    
                  </div>

                  <div className="input-div">
                    <div className="label">User must change password at next Logon</div>
                    <div className="input-box">
                      <Input
                      handleChange={handleChecking} 
                      value={formState.mustChangePassword} 
                      name="mustChangePassword" 
                      type="checkbox" />
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
                </div>
                
            </div>

          </div>


        </div>
      </div>
    </div>
  ) :  (
    <div className="spinner section">
      <Loader />
    </div>
    )

};

export default SystemSecurityMaintenance;
