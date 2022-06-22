import React from 'react'
import ReactDOM from 'react-dom';
function Spinner() {



  return ReactDOM.createPortal(
      <div className="spinner bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
    <div className="sk-folding-cube ">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
</div>
</div>
,

document.getElementById('spinner')


  );
}
export default Spinner