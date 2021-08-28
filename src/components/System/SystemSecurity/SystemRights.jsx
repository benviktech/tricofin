/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import TreeMenu from 'react-simple-tree-menu';
import * as RiIcons from 'react-icons/ri';
import SecuritySidebar from './SecuritySideBar';
import './index.css';
import Loader from '../../Loader/Loader';
import { Button, Input } from '../../_generics/Generics';
import accessRightsValidator from '../../Validators/AccessRightsValidator';
import Spinner from '../../Spinner/Spinner';
import '../../../../node_modules/react-simple-tree-menu/dist/main.css';

const baseUrl = 'https://tricofin.azurewebsites.net';

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();

  const [activeRole, setActiveRole] = useState('');
  const [activeModule, setActiveModule] = useState('');
  const [formState, setFormState] = useState({});
  const initialFormstate = {
    roleID: activeRole,
    moduleID: activeModule,
    canView: false,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    postingLimit: 0,
    canSupervise: false,
    supervisionLimit: 0,
    createdOn: '',
    createdBy: 'BENEVIK',
    modifiedOn: '',
    modifiedBy: 'BENEVIK',
  };

  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [users, setUsers] = useState([]);
  const [sortedTempRoles, setSortedTempRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [systemData, setSystemData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [cleanData, setCleanData] = useState([]);
  const [systemModules, setSystemModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [loading, setLoading] = useState(true);
  const [modulePresent, setModulePresent] = useState(false);

  const [activeModuleLabel, setActiveModuleLabel] = useState('');
  const [errors, setErrors] = useState({});

  const [askPostingLimit, setAskPostingLimit] = useState(false);
  const [askSupervision, setAskSupervision] = useState(false);
  const [askEdit, setAskEdit] = useState(false);
  const [askDelete, setAskDelete] = useState(false);
  const [askAdd, setAskAdd] = useState(false);

  useEffect(() => {
    fetchSystemRoles();
  }, []);

  useEffect(() => {
    fetchSystemModules();
  }, [activeRole]);

  const fetchSystemRoles = async () => {
    axios
      .get(`${baseUrl}/api/System/GetRoles`)
      .then(response => {
        // handle success
        setRoles(response.data);
      })
      .catch(error => {});
  };
  const createSystemRight = async () => {
    const response = accessRightsValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      axios
        .post(`${baseUrl}/api/System/SaveRoleRights`, {
          ...formState,
          createdBy: 'BENEVIK',
          createdOn: new Date(),
          postingLimit: parseInt(formState.postingLimit),
          supervisionLimit: parseInt(formState.supervisionLimit),
        })
        .then(response => {
          // handle success
          const { columnID, ...stateData } = response.data;
          setFormState(stateData);
          setModulePresent(true);
          toast.success(
            `Added rights for ${response.data.roleID}  successfully`,
          );
        })
        .catch(error => {
          toast.error(`Failed rights for ${formState.roleID} `);
        });
    }
  };

  const updateSystemRight = async () => {
    const response = accessRightsValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      axios
        .put(`${baseUrl}/api/System/UpdateRoleRights`, {
          ...formState,
          createdBy: 'BENEVIK',
          modifiedOn: new Date(),
          postingLimit: parseInt(formState.postingLimit),
          supervisionLimit: parseInt(formState.supervisionLimit),
        })
        .then(response => {
          toast.success(
            `Edited rights for ${response.data.roleID}  successfully`,
          );
        })
        .catch(error => {
          toast.error(`Failed to change rights for ${formState.roleID}`);
        });
    }
  };

  const fetchSystemModules = async () => {
    axios
      .get(`${baseUrl}/api/StaticData/GetSystemModules`)
      .then(response => {
        // handle success
        setSystemModules(response.data);
        setLoading(false);
      })
      .catch(error => {
        // handle error
      });
  };

  const fetchSystemModuleRight = async moduleID => {
    axios
      .get(
        `${baseUrl}/api/System/GetRoleModuleRights/${activeRole}/${moduleID}`,
      )
      .then(response => {
        // handle success
        const { columnID, ...stateData } = response.data;
        setFormState(stateData);
        setModulePresent(true);
      })
      .catch(error => {
        // handle error
        const bestModule = systemModules.find(
          module => module.moduleID === moduleID,
        );
        setFormState({
          ...initialFormstate,
          roleID: activeRole,
          moduleID: bestModule.moduleID,
          modifiedOn: new Date(),
          createdOn: new Date(),
        });
        toast.warn(
          `No Rights set for role ${activeRole} on module ${bestModule.module}`,
        );
        setModulePresent(false);
      });
  };

  function addRequiredProperties(arrayData) {
    for (let i = 0; i < arrayData.length; i++) {
      arrayData[i].label = arrayData[i].module;
      arrayData[i].key = arrayData[i].moduleID;
    }
    setTempData(arrayData);
  }

  useEffect(() => {
    addRequiredProperties(systemModules);
  }, [loading]);

  useEffect(() => {
    if (tempData.length > 0) {
      setSystemData(tempData);
    }
  }, [tempData]);

  useEffect(() => {
    setCleanData(makeTree(systemData, '0'));
  }, [systemData]);

  function makeTree(moduleNodes, parentId) {
    return moduleNodes
      .filter(node => node.mainModule === parentId)
      .reduce(
        (tree, node) => [
          ...tree,
          {
            ...node,
            nodes: makeTree(moduleNodes, node.moduleID),
          },
        ],
        [],
      );
  }

  const filterTempRoles = e => {
    const { name, value } = e.target;
    setActiveRole(() => e.target.dataset.selected);
    if (value.trim().length > 0) {
      const filteredtemproles = roles.filter(role => role.roleID.toLowerCase().includes(value.toLowerCase()));
      setSortedTempRoles(filteredtemproles);
    } else {
      setSortedTempRoles([]);
      setFormState({
        ...initialFormstate,
        roleID: '',
      });
      setActiveModule('');
    }
  };

  const selectTempRole = e => {
    setFormState({
      ...formState,
      roleID: e.target.dataset.selected,
    });
    setActiveRole(() => e.target.dataset.selected);
    setSortedTempRoles([]);
    // setActiveModule("")
  };

  const handleChecking = e => {
    const { name, checked } = e.target;
    setFormState(previousState => ({
      ...previousState,
      [name]: checked,
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(previousState => ({
      ...previousState,
      [name]: value,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const companyInfo = useSelector(state => state.companyInfoReducer);

  return companyInfo ? (
    <div className="system-individual-customer-form">
      <div className="system-lower-form-section">
        <div className="system-maintenance-customer-info">
          <span>System Security: Access Rights</span>
        </div>
        <div className="security-lower-downer-section">
          <div className="security-left-inner-form-section">
            <SecuritySidebar />
          </div>
          <div className="security-submit-form-top-section">
            <div className="modules-role-section">
              <div className="role-choose">
                <div className="input-div">
                  <div className="label-role">Role</div>
                  <div className="input-box">
                    <Input
                      value={activeRole}
                      name="tempRoleID"
                      type="text"
                      handleChange={filterTempRoles}
                      className="text-input-role"
                    />
                    <br />
                    {errors.roleID && (
                      <span className="error-display">{errors.roleID}</span>
                    )}
                  </div>
                  {sortedTempRoles.length <= 0 ? (
                    <div className="modal-hide-section-role-choose" />
                  ) : (
                    <div className="modal-popup-section-role-choose">
                      <div className="inner-section-modal-section-role-choose">
                        {sortedTempRoles.map(role => (
                          <div
                            className="inner-section-modal-section-inner-role-choose border"
                            key={role.roleID}
                          >
                            <div
                              data-name="tempRoleID"
                              data-selected={role.roleID}
                              onClick={selectTempRole}
                              className="modal-customer-name-section mr-2"
                            >
                              {role.roleID}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="system-modules-container">
                <br />
                {errors.columnID && activeRole && (
                  <span className="error-display">{errors.columnID}</span>
                )}
                <div className="tree-menu-div">
                  {activeRole ? (
                    !loading ? (
                      <TreeMenu
                        onClickItem={({
                          key,
                          label,
                          activeKey,
                          askAdd,
                          askDelete,
                          askEdit,
                          askPostingLimit,
                          askSupervision,

                          ...props
                        }) => {
                          const keys = key.split('/');
                          const level = keys.length;
                          key = keys[keys.length - 1];
                          // set module options for rights
                          setAskPostingLimit(askPostingLimit);
                          setAskSupervision(askSupervision);
                          setAskEdit(askEdit);
                          setAskDelete(askDelete);
                          setAskAdd(askAdd);
                          // set active module
                          setActiveModule(key);
                          setActiveModuleLabel(label);
                          // fetch right using the key
                          fetchSystemModuleRight(key);
                        }}
                        data={cleanData}
                      />
                    ) : (
                      <div className="spinner-small">
                        <Spinner />
                      </div>
                    )
                  ) : (
                    <div className="banner-rights">
                      <p className="indicator">
                        Please Select a Role to set its rights
                        {' '}
                        <br />
                        <RiIcons.RiTeamLine
                          style={{
                            color: 'black',
                            textAlign: 'center',
                            fontSize: '1.8em',
                          }}
                        />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="access-rights">
              {activeModule ? (
                <div className="module-rights-form">
                  <p
                    style={{
                      marginBottom: '10px',
                      color: '',
                      fontSize: '14px',
                    }}
                  >
                    Rights for
                    {' '}
                    <span style={{ fontWeight: '600', fontSize: '14px' }}>
                      {activeModuleLabel}
                    </span>
                  </p>
                  <hr />
                  {askEdit && (
                    <div className="input-div">
                      <div className="label">Can Edit</div>
                      <div className="input-box">
                        <Input
                          handleChange={handleChecking}
                          value={formState.canEdit}
                          name="canEdit"
                          type="checkbox"
                          checked={
                            Object.keys(formState).length > 0
                              ? formState.canEdit
                              : false
                          }
                          className="checkbox-role"
                        />
                      </div>
                    </div>
                  )}
                  <div className="input-div">
                    <div className="label">Can View</div>
                    <div className="input-box">
                      <Input
                        handleChange={handleChecking}
                        value={formState.canView}
                        name="canView"
                        type="checkbox"
                        checked={
                          Object.keys(formState).length > 0
                            ? formState.canView
                            : false
                        }
                        className="checkbox-role"
                      />
                    </div>
                  </div>

                  {askAdd && (
                    <div className="input-div">
                      <div className="label">Can Add</div>
                      <div className="input-box">
                        <Input
                          handleChange={handleChecking}
                          value={formState.canAdd}
                          name="canAdd"
                          type="checkbox"
                          checked={
                            Object.keys(formState).length > 0
                              ? formState.canAdd
                              : false
                          }
                          className="checkbox-role"
                        />
                      </div>
                    </div>
                  )}
                  {askSupervision && (
                    <div className="input-div">
                      <div className="label">Can Supervise</div>
                      <div className="input-box">
                        <Input
                          handleChange={handleChecking}
                          value={formState.canSupervise}
                          name="canSupervise"
                          type="checkbox"
                          checked={
                            Object.keys(formState).length > 0
                              ? formState.canSupervise
                              : false
                          }
                          className="checkbox-role"
                        />
                      </div>
                    </div>
                  )}
                  {askPostingLimit && (
                    <div className="input-div">
                      <div className="label">Posting Limit</div>
                      <div className="input-box">
                        <Input
                          handleChange={handleChange}
                          value={formState.postingLimit}
                          name="postingLimit"
                          type="number"
                          className="number-role"
                        />
                      </div>
                    </div>
                  )}
                  {askPostingLimit && (
                    <div className="input-div">
                      <div className="label">Supervision Limit</div>
                      <div className="input-box">
                        <Input
                          handleChange={handleChange}
                          value={formState.supervisionLimit}
                          name="supervisionLimit"
                          type="number"
                          className="number-role"
                        />
                      </div>
                    </div>
                  )}
                  <div className="buttons-section-role">
                    {!modulePresent && (
                      <Button
                        disabled={modulePresent}
                        onClick={createSystemRight}
                        name="Add"
                      />
                    )}
                    {modulePresent && (
                      <Button
                        disabled={!modulePresent}
                        onClick={updateSystemRight}
                        name="Update"
                      />
                    )}
                    <Button onClick={clearErrors} name="Cancel" />
                  </div>
                </div>
              ) : (
                <div className="banner-access-rights">
                  <p className="indicator">
                    Kindly select a module to edit its right
                    {' '}
                    <br />
                    <RiIcons.RiUserAddLine
                      style={{
                        color: 'black',
                        textAlign: 'center',
                        fontSize: '1.8em',
                      }}
                    />
                  </p>
                </div>
              )}
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
