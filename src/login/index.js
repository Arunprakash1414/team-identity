import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Logo from "../assets/logo.png";
import MOI from "../assets/moi.png";
import { LoadingOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import "./style.css";
import "../App.css";


const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let userName = Cookie.get("defAddress");
        if (userName) {
            setRedirect(true);
        }
    }, [])

    const handleSubmit = async () => {
        try {
            if (userName == "") {
                notification.error({ message: "Error", description: "Username cannot be empty", placement: "bottomRight" })

                return;
            }
            if (password == "") {
                notification.error({ message: "Error", description: "Password cannot be empty", placement: "bottomRight" })
                return;
            }
            // implement login functionality using js-moi-id
            setLoader(true);
            let _res = await window.moi_id.login(userName, password, { unlockWallet: true });

            if (!_res) {
                notification.error({ message: "Error", description: "Invalid credentials", placement: "bottomRight" })
            } else {
                Cookie.set("name", userName);
                let userAddress = await window.moi_id.getDefaultMoiIDAddress();
                Cookie.set("defAddress", userAddress);
                setRedirect(true);
            }
            setLoader(false);

        }
        catch (err) {
            notification.error({ message: "Error", description: err?.message, placement: "bottomRight" })
            setLoader(false);
            return;
        }
    }
    return (
        redirect ? <Redirect to="/welcome" /> :
            <div className="App">
                <div className="container">
                    <p style={{ fontWeight: "700", fontSize: "30px", marginBottom: "0px" }}>Welcome to Identity Wallet </p>
                    <p style={{ fontWeight: "700", fontSize: "20px" }}>Your identity secured on Blockchain !</p>
                    <div className="d-flex justify-content-center">
                        <Card className="loginCard">
                            <div className="align-center" >
                                <img src={Logo} className="logo" alt="iome-logo" />
                                {/* <p className="logoFontSize">Identity Wallet</p> */}
                                <input className="form-control marginBottom20" type="text" placeholder="Name" onChange={(e) => setUserName(e.target.value)} />
                                <input className="form-control marginBottom20" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                {!loader ? <Button variant="info" className="form-control loginBtn" onClick={() => handleSubmit()}>Login with Moi-Id</Button> :
                                    <LoadingOutlined style={{ fontSize: 24 }} spin />}
                                <p target="_blank" className="poweredBy">Dont have an account?<a href="https://www.iome.ai" target="_blank" style={{ color: "#8221c5" }}> Signup here</a></p>
                                <p className="poweredBy">Powered By <span> <a href="https://www.moi.technology" target="_blank" ><img src={MOI} className="moiLogo" alt="moi-logo" /></a></span></p>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
    );
}

export default Login