import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from '../Home';
import Navbar from '../Navbar';
import 'react-toastify/dist/ReactToastify.css';
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
import SystemSecurityRoles from '../System/SystemSecurity/SystemRoles';
import SystemSecurityRights from '../System/SystemSecurity/SystemRights';
import SystemSecurityMaintenance from '../System/SystemSecurity/SystemMaintenance';
import UpdateCompanyInfo from '../System/SystemSettings/UpdateCompanyInfo';
import SystemHolidays from '../System/SystemSettings/SystemHolidays';
import GroupMaintenance from '../GroupMaintenance/GroupMaintenance';
import GroupMaintenanceView from '../GroupMaintenance/GroupMaintenanceView';
import GroupMembers from '../Pages/GroupMembers';
import UpdateGroupMaintenance from '../GroupMaintenance/UpdateGroupMaintenance';
import GeneralLedgerMaintenance from '../Finance/GeneralLedger/GeneralLedgerMaintenance';
import Transaction from '../Finance/Transactions/Transaction';
import GeneralLedgerSubtypes from '../Finance/GeneralLedger/GeneralLedgerSubtypes';
import GeneralLedgerIds from '../Finance/GeneralLedger/GeneralLedgerIds';
import SingleGeneralLedgerId from '../Finance/GeneralLedger/SingleGeneralLedgerId';
import GeneralLedgerView from '../Finance/GeneralLedger/GeneralLedgerView';
import BulkAuthorize from '../Finance/GeneralLedger/BulkAuthorize';
import ReplicateGL from '../Finance/GeneralLedger/ReplicateGL';
import TransactionView from '../Finance/GeneralLedger/TransactionView';
import GeneralLedgerPayments from '../Finance/GeneralLedgerPayments/GeneralLedgerPayments';
import GeneralLedgerReport from '../Finance/GeneralLedgerReports/GeneralLedgerReport';
import CashRegister from '../Finance/Transactions/CashRegister';

const Router = () => (
  <div className="router-section">
    <BrowserRouter>
      <Navbar />
      <ToastContainer hideProgressBar limit={1} />
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
        <Route path="/groupmaintenanceview/:id" component={GroupMaintenanceView} />
        <Route path="/groupmembers/:id" component={GroupMembers} />
        <Route path="/updategroupmember/:id" component={UpdateGroupMaintenance} />
        <Route path="/identificationinfo/:id" component={NonIndividualIdentification} />
        <Route path="/system/systemsettings/updatecompanyinfo" component={UpdateCompanyInfo} />
        <Route path="/system/systemsecurity/roles" component={SystemSecurityRoles} />
        <Route path="/system/systemsecurity/rights" component={SystemSecurityRights} />
        <Route path="/system/systemsecurity/adduser" component={SystemSecurityMaintenance} />
        <Route path="/system/holiday/holidays" component={SystemHolidays} />
        <Route exact path="/generaledgermaintenance" component={GeneralLedgerMaintenance} />
        <Route path="/transactions" component={Transaction} />
        <Route path="/glsubtypes" component={GeneralLedgerSubtypes} />
        <Route path="/glidentification" component={GeneralLedgerIds} />
        <Route exact path="/genlidentification/:id" component={SingleGeneralLedgerId} />
        <Route exact path="/generaledgermaintenance/:id" component={GeneralLedgerView} />
        <Route path="/bulkauthorize" component={BulkAuthorize} />
        <Route path="/glreplicate" component={ReplicateGL} />
        <Route path="/transactionviews" component={TransactionView} />
        <Route path="/generaledgerpayments" component={GeneralLedgerPayments} />
        <Route path="/generaledgerreports" component={GeneralLedgerReport} />
        <Route path="/cashregister" component={CashRegister} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
);

export default Router;
