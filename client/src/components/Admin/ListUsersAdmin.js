import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../actions/users";
import PaginationAdmin from "./PaginationAdmin";
import SideBar from "./SideBar";

function ListUsersAdmin() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { users, startItemPagination, endItemPagination } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex space-x-5 h-screen bg-gray-50">
    <SideBar/>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <div className="p-4 flex justify-between">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Rechercher un email d'utlisateur"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <PaginationAdmin data={users} />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Adressse email
            </th>
            <th scope="col" className="px-6 py-3">
              Pr??nom
            </th>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Num??ro de t??l??phone
            </th>
          
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.slice(startItemPagination, endItemPagination).filter(user=>value !=="" ? user.email.includes(value):user).map((user) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={user._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.email}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.firstName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.lastName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {user.phone}
                </th>
                <th scope="col" className="px-6 py-3">
                <button type="button" 
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                onClick={()=>dispatch(deleteUser(user._id))}
                >Supprimer</button>
            </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ListUsersAdmin;
