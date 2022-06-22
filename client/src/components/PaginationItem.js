import {React} from "react";

function PaginationItem({ item,itemIsClicked }) {

 
  return (
    <div
      className={`py-2 px-4   text-sm font-medium text-white ${item == itemIsClicked ? "bg-gradient-to-r from-indigo-500 border border-indigo-300     ": " border border-gray-900 bg-gray-900  hover:bg-gradient-to-r from-indigo-500"}`}
    >
      {item}
    </div>
  );
}

export default PaginationItem;
