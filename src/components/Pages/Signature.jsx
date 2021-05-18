import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import '../Customer/index.css';
import './index.css';
import { SignaturePhotoAddition } from '../../actions/individualCustomer';

const Signature = () => {
  const [photo, setPhoto] = React.useState(null);
  const [signature, setSignature] = React.useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const addSignaturePhoto = e => {
    e.preventDefault();
    const form = new FormData();
    form.append('custID', id);
    form.append('photoOrSignature', 'P');
    form.append('imageName', 'id');
    form.append('imageFile', photo);
    form.append('createdOn', '2021-05-18T08:24:25.200Z');
    form.append('modifiedOn', '2021-05-18T08:24:25.200Z');
    form.append('createdBy', 'BENVIK');
    form.append('modifiedBy', 'BENVIK');
    dispatch(SignaturePhotoAddition(form, history, id));
  };

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Customer Signature and Photo Section</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <Sidebar />
          </div>
          <div className="submit-form-top-section">
            <form className="main-form" onSubmit={addSignaturePhoto}>
              <div className="signature-photo-section">
                <div className="signature-section">
                  <div className="uploaded-image">
                    <div className="inner-image-section">
                      {
                        photo ? (
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={photo.name}
                            style={{
                              width: '90%',
                              height: '90%',
                            }}
                          />
                        ) : (<div className="photo-header">Photo</div>)
                      }
                    </div>
                  </div>
                  <div className="input-section">
                    <div className="over-section-div">
                      Upload Image
                    </div>
                    <div className="upload-input">
                      <input
                        type="file"
                        onChange={e => setPhoto(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="photo-section">
                  <div className="uploaded-image">
                    <div className="inner-image-section">
                      {
                        signature ? (
                          <img
                            src={URL.createObjectURL(signature)}
                            alt={signature.name}
                            style={{
                              width: '90%',
                              height: '90%',
                            }}
                          />
                        ) : (<div className="photo-header">Signature</div>)
                      }
                    </div>
                  </div>
                  <div className="input-section">
                    <div className="over-section-div">
                      Upload Signature
                    </div>
                    <div className="upload-input">
                      <input
                        type="file"
                        onChange={e => setSignature(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="submit-button-section">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signature;