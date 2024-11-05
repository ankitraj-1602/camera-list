import React from 'react';

// Importing assets
import warningIcon from "../assets/warningIcon.svg";
import cloudIcon from "../assets/Cloud.svg";
import deviceIcon from "../assets/Edge.svg";
import actionInactiveIcon from "../assets/ActionInactiveIcon.svg";
import actionActiveIcon from "../assets/ActionActiveIcon.svg";
import Ellipse from "../assets/Ellipse.svg";
import EllipseFull from "../assets/EllipseFull.svg";
import Delete from "../assets/Delete.svg";

const Table = ({ data, onDelete, onStatusChange }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" className="table-checkbox" />
                    </th>
                    <th>NAME</th>
                    <th>HEALTH</th>
                    <th>LOCATION</th>
                    <th>RECORDER</th>
                    <th>TASKS</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.length ? data.map((camera) => (
                    <tr key={camera._id}>
                        <td><input type="checkbox" className="table-checkbox" /></td>
                        <td>
                            <div className="name">
                                <div className="name-top">
                                    {/* Status indicator for the camera */}
                                    <div className="name-status" style={{ backgroundColor: camera.current_status === "Online" ? "#029262" : "#DC3545" }}></div>
                                    <div className="name-text">{camera.name}</div>
                                    {camera.hasWarning && <img src={warningIcon} alt="warning-icon" className="name-warning" />}
                                </div>
                            </div>
                            <div className="name-bottom">
                                <span>sherwinwilliams@wobot.ai</span>
                            </div>
                        </td>
                        <td>
                            <div className="health" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {/* Cloud health indicator */}
                                <div className="health-cloud" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <img src={cloudIcon} alt="cloud-icon" style={{ width: '16px', height: '16px' }} />
                                    <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                        <img
                                            src={camera.health.cloud === 'A' ? EllipseFull : Ellipse}
                                            alt="ellipse-icon"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                fontSize: '12px',  // Font size for cloud health
                                            }}
                                        >
                                            {camera.health.cloud}
                                        </span>
                                    </div>
                                </div>

                                {/* Device health indicator */}
                                <div className="health-device" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <img src={deviceIcon} alt="device-icon" style={{ width: '16px', height: '16px' }} />
                                    <div style={{ position: 'relative', width: '24px', height: '24px' }}>
                                        <img
                                            src={camera.health.device === 'A' ? EllipseFull : Ellipse}
                                            alt="ellipse-icon"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                fontSize: '12px',  // Font size for device health
                                            }}
                                        >
                                            {camera.health.device}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span className="location">{camera.location}</span>
                        </td>
                        <td>
                            <span className="recorder">{camera.recorder !== "" ? camera.recorder : 'N/A'}</span>
                        </td>
                        <td>
                            <span className="tasks">{camera.tasks} Tasks</span>
                        </td>
                        <td>
                            <div className="status" style={{ backgroundColor: camera.status === "Active" ? '#0292621A' : "#F0F0F0" }}>
                                <span className="status-text"
                                    style={{
                                        color: camera.status === "Active" ? '#029262' : "#545454"
                                    }}>
                                    {camera.status === 'Active' ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Status change action */}
                            <div
                                className="action"
                                onClick={() => onStatusChange(camera.id, camera.status === "Active" ? "Inactive" : "Active")}
                                style={{ cursor: 'pointer' }} // Cursor pointer for clickable action
                            >
                                {camera.status === "Active" ?
                                    <img src={actionActiveIcon} alt="action-icon" style={{ width: '25px', height: '25px' }} />
                                    :
                                    <img src={actionInactiveIcon} alt="action-icon" style={{ width: '15px', height: '15px' }} />}
                            </div>
                            {/* Delete action */}
                            <div className="delete-row" onClick={() => onDelete(camera._id)} style={{ cursor: 'pointer' }}>
                                <img src={Delete} alt="delete-icon" style={{ width: '15px', height: '15px' }} />
                            </div>
                        </td>
                    </tr>
                )) : <tr><td colSpan="9">No data available</td></tr>} {/* Placeholder if no data */}
            </tbody>
        </table>
    )
}

export default Table;
