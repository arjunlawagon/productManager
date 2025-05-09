import React from 'react';

const AlertMsg = ({ alertVariant, alertMessage }) => {
  return (
      <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
        {alertMessage}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
  );
};

export default AlertMsg;
