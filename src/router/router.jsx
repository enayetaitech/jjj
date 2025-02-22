import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import View from "../pages/View";
import Pricing from "../pages/Pricing";
import Create from "../pages/Create";
import Account from "../pages/Account";
import EditVideo from '../pages/EditVideo';
import ViewGenerations from '../pages/ViewGenerations';

import Billing from "../pages/Billing";
import PrivateRoute from "./PrivateRoute";
import CreateUi from "../pages/CreateUI";
import VideoCreationWizard from "../pages/CreateUI2";
import AffiliateCreate from "../pages/AffiliateCreate";
import Contact from "../pages/Contact";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/pricing',
        element: <Billing />
      },

    ]
  },{
    path:"dashboard",
    element:<PrivateRoute><DashboardLayout/></PrivateRoute>,
    children:[
      {
        index:true,
        element:<PrivateRoute><View/></PrivateRoute>
      },
      {
        path:'create',
        element:<PrivateRoute><VideoCreationWizard/></PrivateRoute>
      },
      {
        path:'account',
        element:<PrivateRoute><Account/></PrivateRoute>
      },
      {
        path:'billing',
        element:<PrivateRoute><Billing/></PrivateRoute>
      },
      {
        path:'affiliate',
        element:<PrivateRoute><AffiliateCreate/></PrivateRoute>
      },
      {
        path: 'edit-video',
        element: <PrivateRoute><EditVideo /></PrivateRoute>
      },
      {
        path: 'viewGenerations',
        element: <PrivateRoute><ViewGenerations /></PrivateRoute>
      },
    ]
  }
]);

export default router;