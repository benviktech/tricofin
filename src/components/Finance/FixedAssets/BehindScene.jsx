/* eslint-disable react/prop-types */
import React from 'react';

const BehindScene = ({
  addState, editState, saveFixedAsset, setEditStateFnc,
  setAddStateFnc, cancelSubmit, deleteFixedAsset,
}) => (
  <div className="fixed-assets-details-behind-scene">
    <div className="fixed-assets-details-behind-scene-header">
      Behind the Scene
    </div>
    <div className="fixed-assets-details-behind-scene-header-container">
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">NetBook Value:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content">0.00</div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">Clear Balance:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content-second">
          <div className="fixed-assets-details-behind-scene-header-container-content-first">0.00</div>
          <div className="fixed-assets-details-behind-scene-header-container-content-third">+</div>
        </div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">Accum Dep:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content-second">
          <div className="fixed-assets-details-behind-scene-header-container-content-first">0.00</div>
          <div className="fixed-assets-details-behind-scene-header-container-content-third">+</div>
        </div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">UnSupCR:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content-second">
          <div className="fixed-assets-details-behind-scene-header-container-content-first">0.00</div>
          <div className="fixed-assets-details-behind-scene-header-container-content-third">+</div>
        </div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">UnSupDR:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content-second">
          <div className="fixed-assets-details-behind-scene-header-container-content-first">0.00</div>
          <div className="fixed-assets-details-behind-scene-header-container-content-third">+</div>
        </div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">Remaining Terms:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content">0.00</div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">Last Modified By:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content">0.00</div>
      </div>
      <div className="fixed-assets-details-behind-scene-header-container-grid">
        <div className="fixed-assets-details-behind-scene-header-container-label">Last Modified On:</div>
        <div className="fixed-assets-details-behind-scene-header-container-content">0.00</div>
      </div>
    </div>
    <div className="fixed-assets-details-behind-scene-button">
      <button type="button">Supervise</button>
      <button
        className={editState === true ? 'btn btn-info' : ''}
        disabled={editState === true}
        onClick={setAddStateFnc}
        type="button"
      >
        Add
      </button>
      <button
        className={editState === false ? 'btn btn-info' : ''}
        disabled={editState === false}
        onClick={setEditStateFnc}
        type="button"
      >
        Edit
      </button>
      <button
        disabled={addState === false && editState === false}
        className={addState === false && editState === false ? 'btn btn-info' : ''}
        onClick={saveFixedAsset}
        type="button"
      >
        Save
      </button>
      <button onClick={cancelSubmit} type="button">Cancel</button>
      <button
        className={editState === false ? 'btn btn-info' : ''}
        disabled={editState === false}
        onClick={deleteFixedAsset}
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
);

export default BehindScene;
