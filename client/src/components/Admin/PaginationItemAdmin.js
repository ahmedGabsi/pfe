import { useDispatch } from "react-redux";
import { changeItemPagination } from "../../actions/users";

function PaginationItemAdmin({ item,onCHangeItemIsClicked,itemIsClicked }) {
  const dispatch = useDispatch();

  const onChangeItemPagination=()=>{
    dispatch(changeItemPagination(Number(item)))
    onCHangeItemIsClicked(item)
  }
 
  return (
    <div
      className={`py-2 px-3  border border-gray-300  dark:border-gray-700 dark:bg-gray-700 dark:text-white ${item === itemIsClicked ? "bg-blue-50 text-blue-600 hover:text-blue-700 hover:bg-blue-100": "text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-100"}`}
      onClick={onChangeItemPagination}
    >
      {item}
    </div>
  );
}

export default PaginationItemAdmin;
