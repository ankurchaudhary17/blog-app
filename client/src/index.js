import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import Logout from './pages/Logout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AuthorPosts from './pages/AuthorPosts'
import Authors from './pages/Authors'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPosts'
import UserProfile from './pages/UserProfile'
import Register from './pages/Register'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import UserProvider from './context/userContext';

const router=createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement:<ErrorPage/>,
    children:[
      {index:true ,element :<Home/>},
      {path:"posts/:id" ,element :<PostDetail/>},
      {path:"register" ,element :<Register/>},
      {path:"login" ,element :<Login/>},
      {path:"profile/:id" ,element :<UserProfile/>},
      {path:"authors" ,element :<Authors/>},
      {path:"create" ,element :<CreatePost/>},
      {path:"posts/categories/:category" ,element :<CategoryPosts/>},
      {path:"posts/users/:id" ,element :<AuthorPosts/>},
      {path:"myposts/:id" ,element :<Dashboard/>},
      {path:"posts/:id/edit" ,element :<EditPost/>},
      {path:"posts/:id/delete" ,element :<DeletePost/>},
      {path:"logout" ,element :<Logout/>},
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* Routerprovider shoud have a prop router which is created above to find the route which we created*/}
  <RouterProvider router={router}/>
  </React.StrictMode>
);


