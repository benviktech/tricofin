/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SecuritySidebar from './SecuritySideBar';
import Modal from '../../Modal/Modal';
import ModalFunction from '../../Modal/ModalFunction';
import './index.css';
import Loader from '../../Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import Spinner from '../../Spinner/Spinner';
import TreeMenu  from 'react-simple-tree-menu';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';
import axios from "axios";

const baseUrl = "https://tricofin.azurewebsites.net";


const SystemSecurityRoles = () => {
  const dispatch = useDispatch();

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();
  const [activeRole, setActiveRole] = useState("");
  const [activeModule, setActiveModule] = useState("");
  const [formState, setFormState] = useState({});
  const initialFormstate = {
    columnID: formState.columnID,
    roleID: activeRole,
    moduleID: activeModule,
    canView: true,
    canAdd: true,
    canEdit: true,
    canDelete: true,
    postingLimit: 0,
    canSupervise: true,
    supervisionLimit: 0,
    createdOn: new Date(),
    createdBy: "BENEVIK",
    modifiedOn: new Date(),
    modifiedBy: "BENEVIK"
  }

  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState([]);
  const [sortedTempRoles, setSortedTempRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [systemData, setSystemData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [cleanData, setCleanData] = useState([]);
  const [systemModules, setSystemModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [activeModuleLabel, setActiveModuleLabel] = useState("");
  const [rightCreated, setRightCreated] = useState(false)



  useEffect(() => {
    fetchSystemRoles();
  }, []);

  useEffect(() => {
    fetchSystemModules();
  }, [activeRole]);



  



const fetchSystemRoles = async () => {
  
  axios.get(`${baseUrl}/api/System/GetRoles`)
      .then(function (response) {
          // handle success
          console.log(response.data)
          setRoles(response.data);
      })
      .catch(function (error) {
          // handle error
          // console.log(error);
          // setDataLoadFailed(true);
      })        

}
const createSystemRight = async () => {
  console.log(formState);
  axios.post(`${baseUrl}/api/System/SaveRoleRights`,{
    ...formState,
    createdBy:"BENEVIK"
  })
      .then(function (response) {
          // handle success
          console.log(response.data)
      })
      .catch(function (error) {
          // handle error
          // console.log(error);
          // setDataLoadFailed(true);
      })        

}

const fetchSystemModules = async () => {
  console.log("fired a get roles request")
  axios.get(`${baseUrl}/api/StaticData/GetSystemModules`)
  .then(function (response) {
      // handle success
      console.log(response.data)
      setSystemModules(response.data) 
      setLoading(false);      
  })
  .catch(function (error) {
      // handle error
      console.log(error)
  })
}

const fetchSystemModuleRight = async (moduleID) => {
  console.log("fired a get modulerights reques request")
  axios.get(`${baseUrl}/api/System/GetRoleModuleRights/${activeRole}/${moduleID}`)
  .then(function (response) {
      // handle success
      console.log(response.data)
      setFormState(response.data)       
  })
  .catch(function (error) {
      // handle error
      console.log("reset form state")
      setFormState({
        ...initialFormstate,
      });
      console.log(error)
      
  })
}

 

  function addRequiredProperties (arrayData) {

    for (let i = 0; i < arrayData.length; i++) {
      arrayData[i].label = arrayData[i].module;
      arrayData[i].key = arrayData[i].moduleID;
      console.log(arrayData[i])
    }
    setTempData(arrayData);
  }

  useEffect(() => {
    addRequiredProperties(systemModules);
  }, [loading]);

  useEffect(() => {
    if(tempData.length > 0){
      setSystemData(tempData)
    }

  },[tempData])

  useEffect(()=>{
    console.log(systemData,"systemdata")
    setCleanData(makeTree(systemData,"0"));
  },[systemData])



  function makeTree(moduleNodes, parentId) {
    return moduleNodes
      .filter((node) => node.mainModule === parentId)
      .reduce(
        (tree, node) => [
          ...tree,
          {
            ...node,
            nodes: makeTree(moduleNodes, node.moduleID),
          },
        ],
        [],
      )
  }

  const filterTempRoles = e => {
    const { name, value} = e.target;
    setActiveRole(()=>(e.target.dataset.selected));
    if (value.trim().length > 0){
      const filteredtemproles = roles.filter((role)=> (role.roleID.toLowerCase().includes(value.toLowerCase())));
      console.log(filteredtemproles)
      setSortedTempRoles(filteredtemproles);
    }else {
      setSortedTempRoles([]);
    }
  }

  const selectTempRole = (e) => {
    setActiveRole(()=>(e.target.dataset.selected));
    setSortedTempRoles([]);
    // setActiveModule("")
  }

  const handleChecking = e => {
    const { name, checked } = e.target;
    console.log(name)
    setFormState(() => ({
      ...formState,
      [name]: checked,
    }));
  };

  const resetAlert = () => {
    setRightCreated(false)
  }


  const companyInfo = useSelector(state => state.companyInfoReducer);
  // console.log(companyInfo)


  useEffect(() => {
    console.log(selectedModule)
  }, [selectedModule])


  return companyInfo ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />

      {rightCreated && <div className="alert user-alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success</strong> User {} Created Successfully
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span onClick={resetAlert} aria-hidden="true">&times;</span>
          </button>
        </div>
      }

      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: Access Rights</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section">
              <div className="modules-role-section">
                  <div className="role-choose">
                    <div className="input-div">
                          <div className="label">Role</div>
                          <div className="input-box">
                            <Input  value={activeRole} name="tempRoleID" type="text" handleChange={filterTempRoles}  />
                          </div>
                          {
                            sortedTempRoles.length <= 0 ? (
                              <div className="modal-hide-section-role-choose" />
                            ) : (

                              <div className="modal-popup-section-role-choose">
                                <div className="inner-section-modal-section-role-choose">
                                  {
                                    sortedTempRoles.map(role => (
                                    <div
                                      className="inner-section-modal-section-inner-role-choose border"
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
                  </div>  
                  <div className="system-modules-container">
                    <div className="tree-menu-div">
                        { 
                          activeRole ?
                            !loading ?
                            <TreeMenu
                            onClickItem={(
                              { key, label,activeKey,canView, canAdd, canEdit, canSupervise,canDelete, ...props }
                              ) => {
                              // this.navigate(props.url); // user defined prop
                              const keys = key.split("/")
                              const level = keys.length
                              key = keys[keys.length - 1]
                              if(activeModule === key) {
                                // setActiveModule("")
                                // setFormState(initialFormstate);
                                console.log(props)
                              }else {
                                setActiveModule(key);
                                setActiveModuleLabel(label);
                                fetchSystemModuleRight(key)
                              }
                            }}
                            data={cleanData}        
                            />
                            : 
                            <div className="spinner-small">
                              <Spinner />
                              
                            </div>  
                          :
                            <div className="spinner-small">
                                <h4>Please Select a Role to set its rights</h4>
                            </div>

                        
                      }
                    </div>
                  </div>                
              </div>
                    
              <div className="access-rights">
                  { activeModule ?
                    <div className="module-rights-form">
                        <h4 style={{marginBottom:"40px"}}>Rights for <span style={{fontWeight:"600",fontSize:"22px"}}>{activeModuleLabel}</span></h4>
                        <hr />
                        <div className="input-div">
                          <div className="label">Can Edit</div>
                          <div className="input-box">
                          <Input 
                          handleChange={handleChecking} 
                          value={formState.canEdit} 
                          name="canEdit" 
                          type="checkbox" 
                          checked={Object.keys(formState).length > 0 ? formState.canEdit : false}
                          />
                          </div>                    
                      </div>
                      <div className="input-div">
                          <div className="label">Can View</div>
                          <div className="input-box">
                          <Input 
                          handleChange={handleChecking} 
                          value={formState.canView} 
                          name="canView" 
                          type="checkbox" 
                          checked={Object.keys(formState).length > 0 ? formState.canView: false}
                          />
                          </div>                    
                      </div>
                      <div className="input-div">
                          <div className="label">Can Add</div>
                          <div className="input-box">
                          <Input 
                          handleChange={handleChecking} 
                          value={formState.canAdd} 
                          name="canAdd" 
                          type="checkbox" 
                          checked={Object.keys(formState).length > 0 ?formState.canAdd : false}
                          />
                          </div>                    
                      </div>
                      <div className="input-div">
                          <div className="label">Can Add</div>
                          <div className="input-box">
                          <Input 
                          handleChange={handleChecking} 
                          value={formState.canSupervise} 
                          name="canSupervise" 
                          type="checkbox" 
                          checked={Object.keys(formState).length > 0 ? formState.canSupervise: false}
                          />
                          </div>                    
                      </div>
                      <div className="cancel-submit-buttons-section">
                        <Button 
                        onClick = {createSystemRight}
                        name="Add"/>
                        <Button 
                        // onClick = {clearFields}
                        name="Cancel"
                        />
                      </div>
                    </div>
                    :
                    <div className="select-module">
                      <h4>Kindly select a module to edit its right</h4>
                    </div>
                  }
              </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner section">
      <Loader />
    </div>
  );
};

export default SystemSecurityRoles;
