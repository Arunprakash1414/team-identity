import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload, notification, Input } from 'antd';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { apiCalls } from '../handler/api';
import { useHistory } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
const { Dragger } = Upload;




const UploadDocs = () => {

    const [fileName, setFileName] = useState("");
    const [files, setFiles] = useState("");
    const history = useHistory();
    const [loader, setLoader] = useState(false);

    const props = {
        name: "file",
        multiple: false,
        beforeUpload: () => {
            return false;
        },
        onChange(info) {
            const { status } = info.file;

            // if (info.file.status !== "uploading") {
            //     let reader = new FileReader();
            //     reader.readAsDataURL(info.file);
            //     console.log(info.file)
            // }
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
                setFiles(info.file);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        }
    };

    const handleUploadFile = async () => {
        try {
            if (fileName == "") {
                notification.error({ message: "Error", description: "File name cannot be empty", placement: "bottomRight" })
                return;
            }
            if (files == "") {
                notification.error({ message: "Error", description: "Upload doc cannot be empty", placement: "bottomRight" })
                return;
            }
            setLoader(true);
            let defAddress = Cookies.get("defAddress");
            let dirUrl = "makedir?path=/" + defAddress;
            let dirResponse = await apiCalls("GET", {}, dirUrl);
            let formData = new FormData();
            formData.append("fileName", defAddress + "/" + fileName);
            formData.append("file", files);
            let _response = await apiCalls("POST", formData, "writefile");
            if (_response?.meta?.code == 200) {
                notification.success({ message: "Success", description: "Document uploaded successfully", placement: "bottomRight" })
                history.push("/yourdocs");
            } else {
                notification.error({ message: "Error", description: "Something went wrong. Try again later.", placement: "bottomRight" })
            }
            setLoader(false);
        }
        catch (err) {
            setLoader(false);
            notification.error({ message: "Error", description: err?.message, placement: "bottomRight" })
        }
    }
    return (
        <div>
            <p style={{ marginTop: "30px", fontSize: "16px", fontWeight: "700", marginBottom: "30px" }}>Upload documents</p>
            <div style={{ marginBottom: "10px" }}>
                <Input placeholder="File name"
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>
            <Dragger multiple={false}
                //  beforeUpload={onChangeImage}
                //action=""
                {...props}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Supported file formats are jpeg, jpg, png, pdf
                </p>
            </Dragger>
            <div style={{ marginTop: "30px", textAlign: "center" }}>
                {!loader ? <Button type='primary' size='large' style={{ textTransform: "uppercase", backgroundColor: "#a43ce9", borderColor: "#a43ce9" }} onClick={() => handleUploadFile()}>Upload your doc</Button> :

                    <LoadingOutlined style={{ fontSize: 24 }} spin />}
            </div>
        </div>
    )
};

export default UploadDocs;


