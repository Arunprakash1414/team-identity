import { DownloadOutlined, QrcodeOutlined, FolderViewOutlined } from '@ant-design/icons';
import { List, Space, notification } from 'antd';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { apiCalls } from '../handler/api';
import ReadComponent from './read';
import RevealQR from './revealqr';




const YourDocs = () => {

    const [showQr, setShowQr] = useState(false);
    const [showReadModal, setShowReadModal] = useState(false);
    const [allFiles, setAllFiles] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState("");

    useEffect(() => {
        fetchDocs();
    }, []);


    const fetchDocs = async () => {
        try {
            let defAddress = Cookies.get("defAddress");
            let payload = {
                path: "/" + defAddress
            }
            let _response = await apiCalls("POST", payload, "listfiles");
            setAllFiles(_response?.data)
        }
        catch (err) {
            console.log(err);
            notification.error({ message: "Error", description: err?.message, placement: "bottomRight" })
        }
    }


    const IconText = ({ icon, text, value, fileName }) => {
        return (
            <Space onClick={() => {
                if (value == 1) {
                    setShowQr(true)
                }
                else if (value == 2) {
                    setSelectedFileName(fileName);
                    setShowReadModal(true);
                }
            }} style={{ cursor: "pointer" }
            }>
                {React.createElement(icon)}
                {text}
            </Space >)
    };

    const closeQR = () => {
        setShowQr(false);
    }

    const closeViewModal = () => {
        setShowReadModal(false)
    }
    return (
        <div>
            {showReadModal ? <ReadComponent closeViewModal={closeViewModal}
                selectedFileName={selectedFileName}

            /> : null}
            {showQr ? <RevealQR closeQR={closeQR} /> : null}
            <p style={{ marginTop: "30px", fontSize: "16px", fontWeight: "700", marginBottom: "0px" }}>Your documents</p>
            <List
                style={{ background: "#fff", padding: "20px" }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={allFiles}
                renderItem={(item) => (
                    <List.Item
                        key={item.path}
                        actions={[
                            <IconText icon={QrcodeOutlined} text="Reveal QR Code" key="list-vertical-star-o" value={1} fileName={item?.directory + item?.path} />,
                            <IconText icon={FolderViewOutlined} text="View Doc" key="list-vertical-message" value={2} fileName={item?.directory + item?.path} />,
                            // <IconText icon={DownloadOutlined} text="Download Doc" key="list-vertical-like-o" value={3} fileName={item?.directory + item?.path} />,
                        ]}

                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={item.avatar} />}
                            title={item.path}
                            description={item.hash}
                        />
                        {/* {item.hash} */}
                    </List.Item>
                )}
            />
        </div>)
};

export default YourDocs;