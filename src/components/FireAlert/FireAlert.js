import React from 'react';
import './FireAlert.css';

const FireAlert = ({ show, onClose }) => {
    return (
        <div className={`alert-overlay ${!show ? 'hide' : ''}`}>
            <div className="alert-container">
                <div className="close-button" onClick={onClose}></div>
                <div className="warning-icon"></div>
                <div className="alert-text">CẢNH BÁO CHÁY!</div>
                <div className="instructions">
                    Vui lòng di tản ngay lập tức theo lối thoát hiểm gần nhất.
                    <br />
                    Giữ bình tĩnh và tuân theo hướng dẫn phòng cháy chữa cháy.
                </div>
            </div>
        </div>
    );
};

export default FireAlert;
