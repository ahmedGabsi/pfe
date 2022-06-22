import React from 'react'
import CategoriesAdmin from './CategoriesAdmin'
import ListUsersAdmin from './ListUsersAdmin'
import PaginationAdmin from './PaginationAdmin'
import SideBar from './SideBar'
import TransactionsAdmin from './TransactionsAdmin'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CategoryAdmin from './CategoryAdmin'
function Dashboard() {
  return (
    <div className="flex space-x-5 h-screen bg-gray-50">
      <Router>
      <SideBar/>
      <Routes>
      <Route exact path="/admin/category" element={<CategoryAdmin />} />
        <Route exact path="/admin/users" element={<ListUsersAdmin />} />
        <Route exact path="/admin/transations" element={<TransactionsAdmin />} />
        <Route exact path="/admin/categories" element={<CategoriesAdmin />} />


      </Routes>
      </Router>
      
        {/* <ListUsersAdmin/>  */}
         {/* <TransactionsAdmin/>  */}
         <CategoriesAdmin/>
    </div>
  )
}

export default Dashboard