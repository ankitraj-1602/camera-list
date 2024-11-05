import React from "react";
import '../style/NoDataFound.css'; 

const NoDataFound = ({ message }) => {
    return (
        <div className="no-data-container">
            {/* Display the message when no data is found */}
            <p className="no-data-message">{message}</p>
        </div>
    );
};

export default NoDataFound;
