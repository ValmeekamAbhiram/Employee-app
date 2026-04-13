import React from 'react'
import { createBrowserRouter,RouterProvider,Navigate } from 'react-router'
import RootLayout from './components/RootLayout'
import Header from './components/Header'
import CreateEmp from './components/CreateEmp'
import Home from './components/Home'
import ListOfEmps from './components/ListOfEmps'
import Employee from './components/Employee'
import EditEmployee from './components/EditEmployee'

function App() {
   const routerObj=createBrowserRouter([
        {
            path:"/",
            element:<RootLayout/>,
            children:[
                {
                    path:"",
                    element:<Home/>
                },
                {
                    path:"create-emp",
                    element:<CreateEmp/>
                },
                {
                    path:"list",
                    element:<ListOfEmps/>,
                },
                {
                    path: "employee",
                    element: <Employee />
                },
                {
                    path: "edit",
                    element: <EditEmployee/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={routerObj}/>
  )
}

export default App