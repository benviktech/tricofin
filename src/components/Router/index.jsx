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
import ContactInfo from '../Pages/ContactInfo';

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
        <Route path="/contactinfo/:id" component={ContactInfo} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default Router;
