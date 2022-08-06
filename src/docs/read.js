import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { apiCalls } from '../handler/api';


const ReadComponent = ({ closeViewModal, selectedFileName }) => {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const [loader, setLoader] = useState(false);
    const [file, setFile] = useState("");

    useEffect(() => {
        fetchFileToRead();
    }, [selectedFileName]);

    const fetchFileToRead = async () => {
        setLoader(true);
        let payload = {
            fileName: selectedFileName,
            version: 1
        }
        let response = await apiCalls("POST", payload, "readfile");
        setFile(response);
        setLoader(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        closeViewModal();
    };

    return (
        <>

            <Modal title="Read Document" visible={isModalVisible} onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
            >
                {loader ? <div style={{ textAlign: "center" }}>
                    <LoadingOutlined style={{ fontSize: 24 }} spin />
                </div> : file !== "" ? <img src={URL.createObjectURL(file)} style={{ objectFit: "contain", height: "500px", width: "500px" }} /> : null}
            </Modal>
        </>
    );
};

export default ReadComponent;