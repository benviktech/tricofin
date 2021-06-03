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
import Spinner from '../../Spinner/Spinner';
import { fetchSystemModules } from "../../../actions/systemRight";
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();

  const {
    modalCloser, modalOpener, openModel, modalText,
  } = ModalFunction();

  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [systemData, setSystemData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [cleanData, setCleanData] = useState([]);
  const [systemModules, setSystemModules] = useState([]);


  useEffect(() => {
    dispatch(fetchSystemModules());
    setSystemModules(systemInfo.systemModules)
  }, []);

  const systemInfo = useSelector(state => state.systemModuleReducer);

  

  const rls =[{id:1, name:"admin",desc:"Administrator"},{id:2, name:"manager",desc:"management"}]
  const us = [{
    id:1,
    expires:"27th 05 2021",
    surnames: "Benevik",
    otherNames : "Beneviv IT solutions",
  },
  {
    id:1,
    expires:"27th 05 2021",
    surnames: "Benevik",
    otherNames : "Beneviv IT solutions",
  },
  {
    id:1,
    expires:"27th 05 2021",
    surnames: "Benevik",
    otherNames : "Beneviv IT solutions",
  }]

 

  function addRequiredProperties (arrayData) {

    for (let i = 0; i < arrayData.length; i++) {
      arrayData[i].label = arrayData[i].module;
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
    setCleanData(makeTree(systemData,"0"));
  },[systemData])



  function makeTree(nodes, parentId) {
    return nodes
      .filter((node) => node.mainModule === parentId)
      .reduce(
        (tree, node) => [
          ...tree,
          {
            ...node,
            children: makeTree(nodes, node.moduleID),
          },
        ],
        [],
      )
  }



  const onChange = (currentNode, selectedNodes) => {
    console.log('onChange::', currentNode, selectedNodes)
  }
  const onAction = (node, action) => {
    console.log('onAction::', action, node)
  }
  const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
  }

  const companyInfo = useSelector(state => state.companyInfoReducer);
  console.log(companyInfo)

  useEffect(() => {
    setTimeout(() => {
      setRoles(rls)
    }, 3000)
  }, []);

  

  useEffect(() => {
    if (roles.length > 0) {
      selectRole(roles[0])
    }
  }, [roles]);

  function selectRole (role) {
    console.log(role)
    setRole(role.name);
    setDescription(role.desc)
    setLoading(true)

    setTimeout(() => {
      //success
      setLoading(false)
      setUsers(us)
    }, 3000);
  }


  return companyInfo ? (
    <div className="individual-customer-form">
      <Modal
        modalText={modalText}
        modalCloser={modalCloser}
        openModel={openModel}
      />
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>System Security: Access Rights</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="submit-form-top-section">
                    <h4 className="internal-headings">User Role</h4>
                    <hr />
              <div className="userrole-container">

                    <table style={{borderSpacing:"50px 10px",borderCollapse: "separate"}}>
                      <tr>
                        <td>Search a role: </td>
                        <td><input placeholder="Search a role" style={{textAlign:"center"}} type="search" className="form-input-role" id="site-search"/></td>
                      </tr>
                      <tr >
                        <td >Role ID: </td>
                        <td></td>
                      </tr>
                      <tr style={{padding:"0 10px"}}>
                        <td >Description: </td>
                        <td></td>
                      </tr>
                    </table>
                    
              </div>
                    <h4 className="internal-headings">Access Rights</h4>
                    <hr />
              <div className="access-rights">
                  <h5 className="internal-headings">User Role Listing</h5>
                  <div className="rights-container">
                    {!loading ?
                          <DropdownTreeSelect className="rights-dropdown-container" showDropdown="always" data={cleanData} onChange={onChange} onAction={onAction} onNodeToggle={onNodeToggle} />
                              : 
                          <div className="spinner-small">
                            <Spinner />
                          </div>    
                          
                    }
                  </div>
                  <div className="data-entry-rights">
                    <hr className="blue-banner" />
                    <h5 className="internal-headings">Data Entry Rights</h5>
                    <div className="data-entry">
                      <table style={{borderSpacing:"50px 0",borderCollapse: "separate"}}>
                        <tr><td>Can Add :</td>    
                        <td><input type="checkbox" name="add" disabled /></td></tr>
                        
                        <tr><td>Can Edit:</td>
                        <td><input type="checkbox" name="edit" disabled /></td></tr>
                        <tr><td>Can Delete:</td>    
                        <td><input type="checkbox" name="delete" disabled /></td></tr>
                      </table>
                    </div>
                    <h5 className="internal-headings">Supervision Rights</h5>
                    <div className="supervision">
                    <table style={{borderSpacing:"30px 0",borderCollapse: "separate"}}>
                        <tr><td>Can Supervise :</td>    
                        <td><input type="checkbox" name="supervise"  disabled/></td></tr>
                      </table>
                    </div>
                  </div>
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
