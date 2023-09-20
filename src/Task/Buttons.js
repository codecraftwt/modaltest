import React from "react";

const Buttons = () => {
  return (
    <>
      <div class="modal-body">
        <button type="button" class="btn btn-primary m-2" style={{backgroundColor:"#46139f", border:"none"}}>
          All Contacts
        </button>
        <button type="button" class="btn btn-primary m-2" style={{backgroundColor:"#ff7f50", border:"none"}}>
          US Contacts
        </button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" style={{backgroundColor:"white",border:"2px solid #46139f",color:"black"}}>
          Close
        </button>
      </div>
    </>
  );
};

export default Buttons;
