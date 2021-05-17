import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Navbar from '../Navbar';
import IndividualCustomerForm from '../Customer/IndividualCustomerForm';
import ViewIndividualCustomer from '../Customer/IndividualCustomerView';
import UpdateIndividualCustomer from '../Customer/UpdateIndividualCustomer';
import Footer from '../Footer/Footer';
import SystemSettingsCompanyInfo from '../System/SystemSettings/SystemSettings';
import SystemSettingsOtherSettings from '../System/SystemSettings/OtherSettings';

const Router = () => (
  <div className="router-section">
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/individualcustomerform" component={IndividualCustomerForm} />
        <Route path="/viewindividualcustomerform/:id" component={ViewIndividualCustomer} />
        <Route path="/updatecustomer/:id" component={UpdateIndividualCustomer} />
        <Route path="/systemsettingscompanyinfo" component={SystemSettingsCompanyInfo} />
        <Route path="/systemsettingsothersettings" component={SystemSettingsOtherSettings} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default Router;
