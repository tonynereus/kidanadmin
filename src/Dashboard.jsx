import { Space, Typography } from "antd";
import "./App.css";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "./concept/appConcept";
import Swal from "sweetalert2";




function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const SideToggler = () => {
        return (
            <div onClick={toggleSidebar} className="sidebar-toggler d-md-none mx-2">
                <FontAwesomeIcon icon={faBars} />
            </div>
        )
    }
    const mLocation = useLocation();
    const appC = useContext(AppContext);
    const { setLogin, setToken } = appC;
    useEffect(() => {
        setLogin(mLocation.state.data);
        setToken(mLocation.state.token);
    },[mLocation.state]);
    return (
        <div className="App">
            <div className={`dashboard ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar h-100">
                    {/* Sidebar content */}
                    <div className="sideHeader bg-dark p-2">
                        <div onClick={() => { nav("/") }}>
                            <Typography.Title className="text-white" >Kidan</Typography.Title>
                        </div>
                    </div>
                    <div className="h-100 bg-danger">
                        <SideMenu />
                    </div>
                </div>
                <div className="content" onClick={() => { sidebarOpen ? setSidebarOpen(false) : null }}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <AppHeader Extra={SideToggler} />
                            </Col>
                        </Row>
                        <PageContent></PageContent>
                        {/* Main content */}
                    </Container>
                </div>
            </div>
        </div>
    );
}
function Redirect() {
    const nav = useNavigate();
    useEffect(() => {
        Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You can't access this page"
        }).then(
            x => {
                nav("/login");
            }
        )
    }, [])

    return (
        <></>
    )
}
export default () => {
    const mLocation = useLocation();
    console.log(mLocation.state);
    return (
        <>
            {
                !mLocation.state ? <Redirect /> : <Dashboard />
            }
        </>
    )
};
