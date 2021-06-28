/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SecuritySidebar from "./SecuritySideBar";
import "./index.css";
import Loader from "../../Loader/Loader";
import { Button, Input } from "../../_generics/Generics";
import accessRightsValidator from "../../Validators/AccessRightsValidator";
import Spinner from "../../Spinner/Spinner";
import TreeMenu from "react-simple-tree-menu";
import "../../../../node_modules/react-simple-tree-menu/dist/main.css";
import axios from "axios";
import * as RiIcons from "react-icons/ri";

const baseUrl = "https://tricofin.azurewebsites.net";

const SystemSecurityRoles = () => {
  const dispatch = useDispatch();

  const [activeRole, setActiveRole] = useState("");
  const [activeModule, setActiveModule] = useState("");
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
    createdOn: "",
    createdBy: "BENEVIK",
    modifiedOn: "",
    modifiedBy: "BENEVIK",
  };

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
  const [modulePresent, setModulePresent] = useState(false);

  const [activeModuleLabel, setActiveModuleLabel] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSystemRoles();
  }, []);

  useEffect(() => {
    fetchSystemModules();
  }, [activeRole]);

  const fetchSystemRoles = async () => {
    axios
      .get(`${baseUrl}/api/System/GetRoles`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setRoles(response.data);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        // setDataLoadFailed(true);
      });
  };
  const createSystemRight = async () => {
    const response = accessRightsValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      console.log(formState);
      axios
        .post(`${baseUrl}/api/System/SaveRoleRights`, {
          ...formState,
          createdBy: "BENEVIK",
          createdOn: new Date(),
        })
        .then(function (response) {
          // handle success
          const { columnID, ...stateData } = response.data;
          console.log(stateData);
          setFormState(stateData);
          setModulePresent(true);
          toast.success(
            `Added rights for ${response.data.roleID}  successfully`
          );
        })
        .catch(function (error) {
          toast.success(`Failed rights for ${response.data.roleID} `);
        });
    }
  };

  const updateSystemRight = async () => {
    const response = accessRightsValidator(formState);
    setErrors(response);
    if (Object.keys(response).length === 0) {
      console.log(formState);
      axios
        .put(`${baseUrl}/api/System/UpdateRoleRights`, {
          ...formState,
          createdBy: "BENEVIK",
          modifiedOn: new Date(),
        })
        .then(function (response) {
          toast.success(
            `Edited rights for ${response.data.roleID}  successfully`
          );
        })
        .catch(function (error) {
          toast.error(`Failed to change rights for ${response.data.roleID}`);
        });
    }
  };

  const fetchSystemModules = async () => {
    console.log("fired a get roles request");
    axios
      .get(`${baseUrl}/api/StaticData/GetSystemModules`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setSystemModules(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const fetchSystemModuleRight = async (moduleID) => {
    console.log("fired a get modulerights reques request");
    axios
      .get(
        `${baseUrl}/api/System/GetRoleModuleRights/${activeRole}/${moduleID}`
      )
      .then(function (response) {
        // handle success
        const { columnID, ...stateData } = response.data;
        console.log(stateData);
        setFormState(stateData);
        setModulePresent(true);
      })
      .catch(function (error) {
        // handle error
        console.log("reset form state");
        const bestModule = systemModules.find(
          (module) => module.moduleID === moduleID
        );
        console.log(bestModule, "Best module");
        setFormState({
          ...initialFormstate,
          roleID: activeRole,
          moduleID: bestModule.moduleID,
          modifiedOn: new Date(),
          createdOn: new Date(),
        });
        toast.warn(
          `No Rights set for role ${activeRole} on module ${bestModule.module}`
        );
        setModulePresent(false);
      });
  };

  function addRequiredProperties(arrayData) {
    for (let i = 0; i < arrayData.length; i++) {
      arrayData[i].label = arrayData[i].module;
      arrayData[i].key = arrayData[i].moduleID;
      console.log(arrayData[i]);
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
    console.log(systemData, "systemdata");
    setCleanData(makeTree(systemData, "0"));
  }, [systemData]);

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
        []
      );
  }

  const filterTempRoles = (e) => {
    const { name, value } = e.target;
    setActiveRole(() => e.target.dataset.selected);
    if (value.trim().length > 0) {
      const filteredtemproles = roles.filter((role) =>
        role.roleID.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filteredtemproles);
      setSortedTempRoles(filteredtemproles);
    } else {
      setSortedTempRoles([]);
      setFormState({
        ...initialFormstate,
        roleID: "",
      });
      setActiveModule("");
    }
  };

  const selectTempRole = (e) => {
    console.log(e.target.dataset.selected, "role set");
    setFormState({
      ...formState,
      roleID: e.target.dataset.selected,
    });
    setActiveRole(() => e.target.dataset.selected);
    setSortedTempRoles([]);
    // setActiveModule("")
  };

  const handleChecking = (e) => {
    const { name, checked } = e.target;
    console.log(name);
    setFormState((previousState) => ({
      ...previousState,
      [name]: checked,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const companyInfo = useSelector((state) => state.companyInfoReducer);
  // console.log(companyInfo)

  useEffect(() => {
    console.log(selectedModule);
  }, [selectedModule]);

  return companyInfo ? (
    <div className="individual-customer-form">
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
                        {sortedTempRoles.map((role) => (
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
                          canView,
                          canAdd,
                          canEdit,
                          canSupervise,
                          canDelete,
                          ...props
                        }) => {
                          const keys = key.split("/");
                          const level = keys.length;
                          key = keys[keys.length - 1];
                          console.log(props, "column id");
                          setActiveModule(key);
                          setActiveModuleLabel(label);
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
                    <div className="spinner-small">
                      <p className="indicator">
                        Please Select a Role to set its rights <br />
                        <RiIcons.RiTeamLine
                          style={{
                            color: "black",
                            textAlign: "center",
                            fontSize: "1.8em",
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
                      marginBottom: "10px",
                      color: "",
                      fontSize: "14px",
                    }}
                  >
                    Rights for{" "}
                    <span style={{ fontWeight: "600", fontSize: "14px" }}>
                      {activeModuleLabel}
                    </span>
                  </p>
                  <hr />
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
                <div className="select-module">
                  <p className="indicator">
                    Kindly select a module to edit its right <br />
                    <RiIcons.RiUserAddLine
                      style={{
                        color: "black",
                        textAlign: "center",
                        fontSize: "1.8em",
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
