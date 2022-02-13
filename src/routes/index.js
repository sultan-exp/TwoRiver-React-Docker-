import Landing from "../Pages/Landing";
import { PayBillStepper } from "../Components/PayBill/PayBillStepper";
import Login from "../Pages/Login";
import Transactions from "../Pages/Transactions";
import Dashboard from '../Pages/Dashboard/Dashboard.js';
// import InvoicePage from "../Pages/InvoicesPage";
import InvoicePage from "../Pages/Invoice";
import DashboardHome from '../Pages/Dashboard/index.js';
import PayTransaction from '../Pages/Dashboard/PayTransaction';

import SendMoney from '../Pages/Dashboard/SendMoney';
var indexRoutes = [
  {
    path: "/landing",
    name: "landing",
    component: Landing,
    loginRequired: false,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    loginRequired: false,
  },
  {
    path: "/pay-bill",
    name: "pay-bill",
    component: PayBillStepper,
    loginRequired: false,
  },
  {
    path: "/widget/pay-bill",
    name: "pay-bill-widget",
    component: PayBillStepper,
    loginRequired: false,
  },

  {
    path: "/transactions",
    name: "transactions",
    component: Transactions,
    loginRequired: true,
  },

  {
    path: "/invoice",
    name: "invoice",
    component: InvoicePage,
    loginRequired: true,
  },
  {
    path: "/",
    name: "landing",
    component: Dashboard,
    loginRequired: false,
  },
  {
    path: "/dashboard/",
    name: "dashboard",
    component: DashboardHome,
    loginRequired: false,
  },
  {
    path: "/dashboard/pay-transaction",
    name: "dashboard",
    component: PayTransaction,
    loginRequired: false,
  },
  {
    path: "/sendmoney/selectcustomer",
    name: "sendmoney",
    component: SendMoney,
    loginRequired: false,
  }

];

export default indexRoutes;
