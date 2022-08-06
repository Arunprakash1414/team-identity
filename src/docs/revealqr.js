import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import QRCode from "react-qr-code";


const RevealQR = ({ closeQR }) => {
    const [isModalVisible, setIsModalVisible] = useState(true);


    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        closeQR();
    };

    return (
        <>

            <Modal title="QR Code" visible={isModalVisible} onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <div style={{ textAlign: "center" }}>
                    <QRCode value="hey" />
                </div>
            </Modal>
        </>
    );
};

export default RevealQR;