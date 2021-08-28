import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, useRouteMatch,
} from 'react-router-dom';

import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import CopySingle from './CopySingle';
import CopyMultiple from './CopyMultiple';

const ReplicateGL = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Copy GL between Branches</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <GeneralLedgerSidebar />
          </div>
          <Router>
            <div className="submit-form-top-section">
              <div className="navigation-gl-header">
                <NavLink
                  to={`${url}`}
                  exact
                  activeClassName="active-gl-verify"
                  className="copy-single-GL"
                >
                  Copy Single GL to branches
                </NavLink>
                <NavLink
                  to={`${url}/copymultiple`}
                  activeClassName="active-gl-verify"
                  className="copy-single-GL"
                >
                  Copy Multiple GLs from one Branch to others
                </NavLink>
              </div>
              <div className="router-content-section">
                <Route exact path={`${path}`} component={CopySingle} />
                <Route exact path={`${path}/copymultiple`} component={CopyMultiple} />
              </div>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default ReplicateGL;
