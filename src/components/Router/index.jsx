import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Navbar from '../Navbar';
import IndividualCustomerForm from '../Customer/IndividualCustomerForm';
import ViewIndividualCustomer from '../Customer/IndividualCustomerView';
import UpdateIndividualCustomer from '../Customer/UpdateIndividualCustomer';
import Footer from '../Footer/Footer';
import Signature from '../Pages/Signature';
import Indentification from '../Pages/Indentification';
import PrimaryContactInfo from '../Pages/PrimaryContactInfo';
import SecondaryContactInfo from '../Pages/SecondaryContactInfo';
import NonIndidualCustomerForm from '../NonIdividual/NonIndidualForm';
import NonIndividualCustomerView from '../NonIdividual/NonIndividualCustomerView';
import UpdateNonIndidualCustomerForm from '../NonIdividual/UpdateNonIndividual';
import NonIndividualSecondaryContact from '../Pages/NonIndividualSecondaryContact';
import NonIndividualPrimaryContact from '../Pages/NonIndividualPrimaryContact';
import NonIndividualIdentification from '../Pages/NonIndividualIdentification';
import DirectorsInfo from '../Pages/DirectorsInfo';
import GroupMaintenance from '../GroupMaintenance/GroupMaintenance';

const Router = () => (
  <div className="router-section">
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/individualcustomerform" component={IndividualCustomerForm} />
        <Route path="/viewindividualcustomerform/:id" component={ViewIndividualCustomer} />
        <Route path="/updatecustomer/:id" component={UpdateIndividualCustomer} />
        <Route path="/signature/:id" component={Signature} />
        <Route path="/identification/:id" component={Indentification} />
        <Route path="/primarycontactinfo/:id" component={PrimaryContactInfo} />
        <Route path="/secondarycontactinfo/:id" component={SecondaryContactInfo} />
        <Route path="/nonindidualcustomerform" component={NonIndidualCustomerForm} />
        <Route path="/viewnonindividualcustomerform/:id" component={NonIndividualCustomerView} />
        <Route path="/updatenonindividualcustomer/:id" component={UpdateNonIndidualCustomerForm} />
        <Route path="/nonindividualsecondarycontactinfo/:id" component={NonIndividualSecondaryContact} />
        <Route path="/nonindividualprimarycontactinfo/:id" component={NonIndividualPrimaryContact} />
        <Route path="/directorsinformation/:id" component={DirectorsInfo} />
        <Route path="/identificationinfo/:id" component={NonIndividualIdentification} />
        <Route path="/groupmaintenanceform" component={GroupMaintenance} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default Router;
