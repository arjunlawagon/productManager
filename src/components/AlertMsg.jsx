import React from 'react';

const AlertMsg = ({ alertVariant, alertMessage, onDismiss }) => {
    return (
        <div className={`alert alert-${alertVariant} alert-dismissible fade show`} role="alert">
            {alertMessage}
            <button
                type="button"
                className="btn-close"
                onClick={onDismiss}
                aria-label="Close">
            </button>
        </div>
    );
};

export default AlertMsg;
