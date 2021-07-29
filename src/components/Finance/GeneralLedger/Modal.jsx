import React from 'react';
import './index.css';

const Modal = () => (
  <div className="behind-the-scenes">
    <div className="scenes-top-section">
      Behind the Scenes
    </div>
    <div className="scenes-bottom">
      <div className="left-scenes-section">
        <div className="each-scene">
          <div className="scenes-span">
            Balance:
          </div>
          <div className="scenes-details">
            <span className="mr-2">0.00</span>
          </div>
        </div>
        <div className="each-scene">
          <div className="scenes-span">
            Un supervised CR:
          </div>
          <div className="scenes-details">
            <span className="mr-2">0.00</span>
          </div>
        </div>
        <div className="each-scene">
          <div className="scenes-span">
            Un supervised DR:
          </div>
          <div className="scenes-details">
            <span className="mr-2">0.00</span>
          </div>
        </div>
      </div>
      <div className="right-scenes-section">
        <div className="each-scene">
          <div className="scenes-span">
            CR TurnOver:
          </div>
          <div className="scenes-details">
            <span className="mr-2">0.00</span>
          </div>
        </div>
        <div className="each-scene">
          <div className="scenes-span">
            DR TurnOver:
          </div>
          <div className="scenes-details">
            <span className="mr-2">0.00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
