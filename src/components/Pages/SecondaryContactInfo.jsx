import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const SecondaryContactInfo = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info">
        <span>Secondary Contact Info</span>
      </div>
      <div className="lower-downer-section">
        <div className="left-inner-form-section">
          <Sidebar />
        </div>
        <div className="submit-form-top-section">
          <form className="contact-info-section">
            <div className="left-address-section">
              <div className="building-name">
                <div className="label-unit">Building Name:</div>
                <div className="building-input">
                  <input type="text" />
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit">
                  Unit No:
                </div>
                <div className="unit-section">
                  <input type="text" />
                  <div className="floor-section">
                    <div className="inner-label-unit">
                      Floor No:
                    </div>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit">
                  LC/Street:
                </div>
                <div className="unit-section">
                  <input type="text" />
                  <div className="floor-section">
                    <div className="inner-label-unit">
                      Plot/Street No:
                    </div>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit">
                  Parish:
                </div>
                <div className="unit-section select-area">
                  <select>
                    <option>select</option>
                    <option>first</option>
                    <option>second</option>
                  </select>
                  <div className="floor-section">
                    <div className="inner-label-unit">
                      Suburb:
                    </div>
                    <select>
                      <option>select</option>
                      <option>first</option>
                      <option>second</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit">
                  Village:
                </div>
                <div className="unit-section select-area">
                  <select>
                    <option>select</option>
                    <option>first</option>
                    <option>second</option>
                  </select>
                  <div className="floor-section">
                    <div className="inner-label-unit">
                      County/Town:
                    </div>
                    <select>
                      <option>select</option>
                      <option>first</option>
                      <option>second</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="building-name">
                <div className="label-unit">District:</div>
                <div className="building-input">
                  <input type="text" />
                </div>
              </div>
              <div className="building-name">
                <div className="label-unit">Region:</div>
                <div className="building-input">
                  <select>
                    <option>select</option>
                    <option>first</option>
                    <option>second</option>
                  </select>
                </div>
              </div>
              <div className="building-name">
                <div className="label-unit">Country:</div>
                <div className="building-input">
                  <select>
                    <option>select</option>
                    <option>first</option>
                    <option>second</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="right-address-section">
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  P.O Box No:
                </div>
                <div className="unit-section unit-right-section">
                  <input type="text" />
                  <div className="floor-section lower-floor-section">
                    <div className="inner-label-unit">
                      Post Office Town:
                    </div>
                    <select>
                      <option>select</option>
                      <option>first</option>
                      <option>second</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  Been At Address Since:
                </div>
                <div className="unit-section unit-right-section">
                  <div className="lower-floor-section">
                    <input type="date" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  Primary Tel No:
                </div>
                <div className="unit-section unit-right-section">
                  <input type="text" />
                  <div className="floor-section lower-floor-section">
                    <div className="inner-label-unit">
                      Other No:
                    </div>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  Mobile No:
                </div>
                <div className="unit-section unit-right-section">
                  <input type="text" />
                  <div className="floor-section lower-floor-section">
                    <div className="inner-label-unit">
                      Fax No:
                    </div>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  Email Address:
                </div>
                <div className="unit-section unit-right-section">
                  <div className="lower-floor-section ">
                    <input type="input" />
                  </div>
                </div>
              </div>
              <div className="unit-floor-section">
                <div className="label-unit unit-left-section">
                  Website:
                </div>
                <div className="unit-section unit-right-section">
                  <div className="lower-floor-section ">
                    <input type="input" />
                  </div>
                </div>
              </div>
              <div className="add-form-data-button">
                <button
                  type="submit"
                >
                  Add
                </button>
                <button
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default SecondaryContactInfo;
