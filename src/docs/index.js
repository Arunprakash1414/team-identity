import React from "react";
import Document from "../assets/document.png";
import Upload from "../assets/upload.png"
import { Card } from 'antd';
import { useHistory } from "react-router-dom";


const Docs = () => {
    const history = useHistory();

    const redirectPages = (type) => {
        if (type == 1) {
            history.push("/yourdocs")
        } else if (type == 2) {
            history.push("/uploaddocs")
        }
    }

    return (
        <div style={{ margin: "100px" }}>
            <p style={{ fontSize: "20px", fontWeight: "700" }}>Getting started is quick and easy</p>
            <div className="row">
                <div className="col-md-6">
                    <Card
                        onClick={() => redirectPages(1)}
                        hoverable
                        style={{ padding: "50px", display: "flex", justifyContent: "center" }}
                        bodyStyle={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "50px"
                        }}
                        cover={<img src={Document} alt="Your documents" style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                    >
                        {/* <Meta title="Your documents" description="" /> */}
                        <p style={{ fontSize: "15px", fontWeight: "700" }}>Your documents</p>
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card
                        onClick={() => redirectPages(2)}
                        style={{ padding: "50px", display: "flex", justifyContent: "center" }}
                        bodyStyle={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "50px"
                        }}
                        hoverable
                        headStyle={{ fontSize: "40px" }}
                        cover={<img alt="Upload document" src={Upload} style={{ width: "200px", height: "200px", objectFit: "contain" }} />}
                    >
                        {/* <Meta title="Upload document" description="" /> */}
                        <p style={{ fontSize: "15px", fontWeight: "700" }}>Upload document</p>
                    </Card>
                </div>
            </div>
        </div >
    );
}

export default Docs;