import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Navbar from "../Navbar";
import IndividualCustomerForm from "../Customer/IndividualCustomerForm";
import ViewIndividualCustomer from "../Customer/IndividualCustomerView";
import UpdateIndividualCustomer from "../Customer/UpdateIndividualCustomer";
import Footer from "../Footer/Footer";
import Signature from "../Pages/Signature";
import Indentification from "../Pages/Indentification";
import PrimaryContactInfo from "../Pages/PrimaryContactInfo";
import SecondaryContactInfo from "../Pages/SecondaryContactInfo";
import NonIndidualCustomerForm from "../NonIdividual/NonIndidualForm";
import NonIndividualCustomerView from "../NonIdividual/NonIndividualCustomerView";
import UpdateNonIndidualCustomerForm from "../NonIdividual/UpdateNonIndividual";
import NonIndividualSecondaryContact from "../Pages/NonIndividualSecondaryContact";
import NonIndividualPrimaryContact from "../Pages/NonIndividualPrimaryContact";
import NonIndividualIdentification from "../Pages/NonIndividualIdentification";
import DirectorsInfo from "../Pages/DirectorsInfo";
import SystemSettingsCompanyInfo from "../System/SystemSettings/SystemSettings";
import SystemSettingsOtherSettings from "../System/SystemSettings/OtherSettings";
import SystemSecurityRoles from "../System/SystemSecurity/SystemRoles";
import SystemSecurityRights from "../System/SystemSecurity/SystemRights";
import SystemSecurityMaintenance from "../System/SystemSecurity/SystemMaintenance";
import UpdateCompanyInfo from "../System/SystemSettings/UpdateCompanyInfo";
import SystemSecurityUpdateUser from "../System/SystemSecurity/SystemUpdateUser";

const Router = () => (
  <div className="router-section">
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/individualcustomerform"
          component={IndividualCustomerForm}
        />
        <Route
          path="/viewindividualcustomerform/:id"
          component={ViewIndividualCustomer}
        />
        <Route
          path="/updatecustomer/:id"
          component={UpdateIndividualCustomer}
        />
        <Route path="/signature/:id" component={Signature} />
        <Route path="/identification/:id" component={Indentification} />
        <Route path="/primarycontactinfo/:id" component={PrimaryContactInfo} />
        <Route
          path="/secondarycontactinfo/:id"
          component={SecondaryContactInfo}
        />
        <Route
          path="/nonindidualcustomerform"
          component={NonIndidualCustomerForm}
        />
        <Route
          path="/viewnonindividualcustomerform/:id"
          component={NonIndividualCustomerView}
        />
        <Route
          path="/updatenonindividualcustomer/:id"
          component={UpdateNonIndidualCustomerForm}
        />
        <Route
          path="/nonindividualsecondarycontactinfo/:id"
          component={NonIndividualSecondaryContact}
        />
        <Route
          path="/nonindividualprimarycontactinfo/:id"
          component={NonIndividualPrimaryContact}
        />
        <Route path="/directorsinformation/:id" component={DirectorsInfo} />
        <Route
          path="/identificationinfo/:id"
          component={NonIndividualIdentification}
        />
        <Route
          path="/systemsettingscompanyinfo"
          component={SystemSettingsCompanyInfo}
        />
        <Route
          path="/systemsettingsothersettings"
          component={SystemSettingsOtherSettings}
        />
        <Route
          path="/system/systemsettings/updatecompanyinfo"
          component={UpdateCompanyInfo}
        />
        <Route
          path="/system/systemsecurity/roles"
          component={SystemSecurityRoles}
        />
        <Route
          path="/system/systemsecurity/rights"
          component={SystemSecurityRights}
        />
        <Route
          path="/system/systemsecurity/adduser"
          component={SystemSecurityMaintenance}
        />
        <Route
          path="/system/systemsecurity/editUser"
          component={SystemSecurityUpdateUser}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default Router;
