import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { SendOutlined } from '@ant-design/icons';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";


const Welcome = () => {
    const [userName, setUserName] = useState("");
    const history = useHistory();
    useEffect(() => {
        let name = Cookies.get("name");
        setUserName(name)
    }, [])
    const redirectDocs = () => {
        history.push("/home");
    }
    return (
        <div>
            <p style={{ fontSize: "20px", marginTop: "100px" }}><span style={{ fontWeight: "700", textTransform: "capitalize" }}>Hi, {userName}!</span> </p>
            <p style={{ fontSize: "20px", marginTop: "20px" }}>Your profile has been stored in a privacy enabled personalized secure storage network. You can start uploading your documents to your ZKP enabled secure<a href="https://www.iome.ai" target="_blank" style={{ color: "#a43ce9", fontWeight: "700" }}> I0ME</a> wallet.</p>
            <Button type="primary" size="large" icon={<SendOutlined style={{ marginTop: "-10px" }} />} shape="round"
                onClick={() => redirectDocs()}
                style={{ backgroundColor: "#a43ce9", borderColor: "#a43ce9" }}
            > Proceed Further</Button >
        </div>
    );
}

export default Welcome;