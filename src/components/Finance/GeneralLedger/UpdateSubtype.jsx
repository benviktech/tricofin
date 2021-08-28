/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGeneralLedgerSubType } from '../../../actions/generalLedger';

const UpdateSubtype = ({ typeUpdate, setModal }) => {
  const [newType, setNewType] = useState(typeUpdate.glSubType);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleChange = value => setNewType(value);

  const submitUpdate = async e => {
    e.preventDefault();
    if (newType.length > 0) {
      const data = {
        glSubTypeID: typeUpdate.glSubTypeID,
        glSubType: newType.toUpperCase(),
        glTypeID: typeUpdate.glTypeID,
        createdOn: (new Date()).toISOString(),
        createdBy: 'BENVIK',
        modifiedOn: (new Date()).toISOString(),
        modifiedBy: 'BENVIK',
      };
      await dispatch(updateGeneralLedgerSubType(data));
      setModal(false);
    } else {
      setError('Required');
    }
  };

  return (
    <form className="sub-type-update-container" onSubmit={submitUpdate}>
      <div className="inner-sub-type-update-container">
        <div className="text-black-subtype">
          UPDATE
          {' '}
          {typeUpdate.glSubType}
        </div>
        <div className="sub-type-update-container-input">
          <input
            value={newType}
            onChange={e => handleChange(e.target.value)}
            type="text"
          />
          <div className="form-error-section">
            { error && error}
            {' '}
          </div>
        </div>
        <div className="sub-type-update-container-buttons mt-4">
          <button className="ml-0" type="submit">Save</button>
          <button type="button" onClick={() => setModal(false)}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default UpdateSubtype;
