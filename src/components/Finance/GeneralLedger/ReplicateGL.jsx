import React from 'react';
import {
  BrowserRouter, Route, Link,
} from 'react-router-dom';
import { useRouteMatch } from 'react-router';

import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import CopySingle from './CopySingle';
import CopyMultiple from './CopyMultiple';

const ReplicateGL = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Replicate GL Accounts</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <div className="submit-form-top-section">
            <BrowserRouter>
              <div className="navigation-gl-header">
                <Link to={`${url}`} className="copy-single-GL">Copy Single GL to branches</Link>
                <Link to={`${url}/copymultiple`} className="copy-single-GL">Copy Multiple GLs from one Branch to others</Link>
              </div>
              <div className="router-content-section">
                <Route exact path={`${path}`} component={CopySingle} />
                <Route path={`${path}/copymultiple`} component={CopyMultiple} />
              </div>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplicateGL;
