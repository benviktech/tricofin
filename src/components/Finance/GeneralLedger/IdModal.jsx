/* eslint-disable react/prop-types */

import React from 'react';

const initialProp = {
  createdBy: '',
  createdOn: '',
  glName: '',
  glSubType: '',
  glType: '',
  glid: '',
  modifiedBy: '',
  modifiedOn: '',
};

const IdModal = ({ generalLedgerID }) => {
  const newData = { ...initialProp, ...generalLedgerID };
  return (
    <div className="behind-the-scenes">
      <div className="scenes-top-section">
        Behind the Scenes
      </div>
      <div className="scenes-bottom">
        <div className="left-scenes-section">
          <div className="each-scene">
            <div className="scenes-span">
              Total Balance:
            </div>
            <div className="scenes-details-buttons">
              <div className="scenes-details-last-one">
                <span className="mr-1">0.00</span>
              </div>
              <div className="scenes-details-last-two">
                <span>+</span>
              </div>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              CR TurnOver:
            </div>
            <div className="scenes-details-buttons">
              <div className="scenes-details-last-one">
                <span className="mr-1">0.00</span>
              </div>
              <div className="scenes-details-last-two">
                <span>+</span>
              </div>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Created By:
            </div>
            <div className="scenes-details">
              {
                newData.createdBy.length > 0 ? (
                  <span className="mr-2">{ newData.createdBy }</span>
                ) : <span className="mr-2">0.00</span>
              }
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Modified By:
            </div>
            <div className="scenes-details">
              {
                newData.modifiedBy.length > 0 ? (
                  <span className="mr-2">{ newData.modifiedBy }</span>
                ) : <span className="mr-2">0.00</span>
              }
            </div>
          </div>
        </div>
        <div className="right-scenes-section">
          <div className="each-scene">
            <div className="scenes-span">
              DR TurnOver:
            </div>
            <div className="scenes-details-buttons">
              <div className="scenes-details-last-one">
                <span className="mr-1">0.00</span>
              </div>
              <div className="scenes-details-last-two">
                <span>+</span>
              </div>
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Created On:
            </div>
            <div className="scenes-details">
              {
                newData.createdOn.length > 0 ? (
                  <span className="mr-2">
                    {
                    new Date(newData.createdOn).toUTCString().split(' ').slice(0, 4)
                      .join(' ')
                     }
                  </span>
                ) : <span className="mr-2">0.00</span>
              }
            </div>
          </div>
          <div className="each-scene">
            <div className="scenes-span">
              Modified On:
            </div>
            <div className="scenes-details">
              {
                newData.createdOn.length > 0 ? (
                  <span className="mr-2">
                    {
                    new Date(newData.createdOn).toUTCString().split(' ').slice(0, 4)
                      .join(' ')
                     }
                  </span>
                ) : <span className="mr-2">0.00</span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdModal;
