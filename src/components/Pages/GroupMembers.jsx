import React from 'react';
import { GroupMaintenanceSidebar } from '../Sidebar/Sidebar';

const GroupMembers = () => (
  <div className="individual-customer-form">
    <div className="lower-form-section">
      <div className="maintenance-customer-info">
        <span>Group Members Section</span>
      </div>
      <div className="lower-downer-section">
        <div className="left-inner-form-section">
          <GroupMaintenanceSidebar />
        </div>
        <form className="submit-form-top-section identification-form">
          <div className="identification-section">
            <div className="main-groups-section">
              <div className="id-display-section border p-2 mb-1">
                <div className="main-group-top-left">Group ID:</div>
                <div className="main-group-top-right">
                  <div className="group-top-input-left border">20021</div>
                  <div className="group-top-input-right border">SAMPLE GROUP</div>
                </div>
              </div>
              <div className="customer-information-section border">
                <div className="customer-more-info">
                  Member&apos;s Information
                </div>
                <div className="lower-customer-info-section">
                  <div className="left-lower-customer-info-section">
                    <div className="first-lower-customer-info-section">
                      <div className="label-lower-customer-info-section">Search Member :</div>
                      <div className="input-lower-customer-info-section"><input type="text" /></div>
                    </div>
                    <div className="second-lower-customer-info-section">
                      <div className="label-lower-customer-info-section">Residential Address :</div>
                      <div className="input-lower-customer-info-section"><input type="text" /></div>
                    </div>
                  </div>
                  <div className="left-lower-customer-info-section">
                    <div className="first-lower-customer-info-section">
                      <div className="label-lower-customer-info-section">Join Date :</div>
                      <div className="input-lower-customer-info-section"><input type="text" /></div>
                    </div>
                    <div className="second-lower-customer-info-section">
                      <div className="label-lower-customer-info-section">Post :</div>
                      <div className="input-lower-customer-info-section"><input type="text" /></div>
                    </div>
                  </div>
                  <div className="right-lower-customer-info-section">
                    <div className="image-section">
                      image here
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="identification-listing">
            <div className="top-section members-listings mb-1 d-flex justify-content-center align-items-center p-1">
              Members Listings
            </div>
            <div className="top-section">
              <div className="idcode-section">
                MemberID
              </div>
              <div className="idcode-section">
                Name
              </div>
              <div className="idcode-section">
                RAddress
              </div>
              <div className="idcode-section">
                JoinDate
              </div>
              <div className="idcode-section">
                Post
              </div>
              <div className="idcode-section">
                Photo
              </div>
              <div className="idcode-section">
                Remove
              </div>
            </div>
            <div className="out-form-loop">
              <div className="middle-section">
                <div className="idcode-section-inner first-border-left">
                  202010098
                </div>
                <div className="idcode-section-inner">
                  MARTINE OLGER
                </div>
                <div className="idcode-section-inner">
                  KAMPALA
                </div>
                <div className="idcode-section-inner">
                  08/Mar/2021
                </div>
                <div className="idcode-section-inner">
                  M
                </div>
                <div className="idcode-section-inner">
                  sample
                </div>
                <div className="idcode-section-inner delete-info">
                  <button
                    type="button"
                  >
                    Delete
                  </button>
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
);

export default GroupMembers;
