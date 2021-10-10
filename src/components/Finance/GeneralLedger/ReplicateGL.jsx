/* eslint-disable  jsx-a11y/click-events-have-key-events */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable  react/prop-types */
/* eslint-disable  react/jsx-props-no-spreading */

import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, useRouteMatch, useHistory,
} from 'react-router-dom';

import { GeneralLedgerSidebar } from '../../Sidebar/Sidebar';
import CopySingle from './CopySingle';
import CopyMultiple from './CopyMultiple';

const ReplicateGL = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const routeBack = () => history.goBack();

  return (
    <div className="individual-customer-form">
      <div className="lower-form-section">
        <div className="maintenance-customer-info">
          <span>Copy GL between Branches</span>
        </div>
        <div className="lower-downer-section">
          <div className="left-inner-form-section">
            <div className="back-button-section">
              <i
                className="fas fa-arrow-circle-left"
                style={{ fontSize: '20px', marginRight: '10px', cursor: 'pointer' }}
                onClick={routeBack}
              />
            </div>
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
                <Route
                  exact
                  path={`${path}`}
                  render={props => <CopySingle key={props.location.key} {...props} />}
                />
                <Route
                  exact
                  path={`${path}/copymultiple`}
                  render={props => <CopyMultiple key={props.location.key} {...props} />}
                />
              </div>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default ReplicateGL;
