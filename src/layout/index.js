import React, { useEffect, useState } from "react";
import Header from "../header";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const Layout = (props) => {

    const [redirect, setRedirect] = useState(true)

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = () => {
        let defAddress = Cookies.get("defAddress");
        if (!defAddress) {
            setRedirect(false)
        }
    }
    return (
        !redirect ? <Redirect to="/" /> : <div>
            <main>
                <Header />
                <div className="container">
                    {props.children}
                </div>
            </main>
        </div>
    );
}

export default Layout;