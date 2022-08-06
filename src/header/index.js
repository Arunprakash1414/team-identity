import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Typography } from 'antd';
import Logo from "../assets/logo.png";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { PoweroffOutlined } from "@ant-design/icons";


function Header() {
    const [userAddress, setUserAddress] = useState("");
    const [userName, setUserName] = useState("");
    useEffect(() => {
        let defAddress = Cookies.get("defAddress");
        let name = Cookies.get("name");
        setUserName(name);
        setUserAddress(defAddress);
    }, []);

    const contructUserAddress = (address) => {
        if (address) {
            return address?.substring(0, 6) + "..." + address?.substring(address.length - 6);
        }
    }

    const logoutHandler = () => {
        Cookies.remove("name");
        Cookies.remove("defAddress");
        window.location.reload();
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={Logo} alt="Logo" style={{ height: "80px", width: "80px", objectFit: "contain", marginLeft: "20px" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#" disabled>
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Typography style={{ margin: "8px", fontWeight: "600", textTransform: "capitalize" }}>Hi, {userName}</Typography>
                        <Button type="primary" shape='round' style={{ marginRight: "10px", backgroundColor: "#a43ce9", borderColor: "#a43ce9" }}>{contructUserAddress(userAddress)}</Button>
                        <Button type="primary" shape="circle" icon={<PoweroffOutlined />} onClick={() => logoutHandler()} style={{ backgroundColor: "#a43ce9", borderColor: "#a43ce9" }} />

                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;