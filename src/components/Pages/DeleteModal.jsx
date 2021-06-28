/* eslint-disable react/prop-types */
import React from 'react';

const DeleteModal = ({ text, cancelDelete, continueDelete }) => (
  <div className="delete-modal-section">
    <div className="overal-delete-section">
      <div className="confirm-delete-section">
        Are you sure you want to delete
        {' '}
        {text}
        {' '}
        ?
      </div>
      <div className="confirm-delete-button-section">
        <button
          onClick={cancelDelete}
          type="button"
          className="cancel-delete-btn"
        >
          Cancel
        </button>
        <button
          onClick={continueDelete}
          type="button"
          className="accept-delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
