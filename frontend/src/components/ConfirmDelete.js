import React from 'react';

const ConfirmDelete = ({ onCancel, onConfirm }) => {
  return (
    <div className="confirm-delete">
        <div className="rectangle" style = {{left: "0px", width: "100%", height: "40px"}}> 
            <p style = {{fontSize: "17px", marginTop: "10px", color: "white"}}>Delete User</p>
        </div>
      <p>Are you sure you want to delete this user?</p>
      <hr className = "separating-line1" style = {{left: "26px", top: "90px", width: "85%", background: "RGBA(116, 116, 116, 1)"}}/>
      <button className = "cancel-button1" onClick={onCancel}>Cancel</button>
      <button className = "confirm-button" onClick={onConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmDelete;