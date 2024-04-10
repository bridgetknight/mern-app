import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import styles from "../Navbar.module.css";
import SubHeader from "../components/subheader"

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:
  // eslint-disable-next-line
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  function renderSubHeader() {
    const path = location.pathname;
    switch (path) {
      case "/":
        return <SubHeader pageTitle="Route Planner" />;
      case "/home":
        return <SubHeader pageTitle="Route History" />;
      case "/userLocationsPage":
        return <SubHeader pageTitle="Help" />;
      case "/accountManagementPage":
        return <SubHeader pageTitle="Profile" />;
      default:
        return null;
    }
  }

  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <>
      <BootstrapNavbar className={`${styles.header} ${styles.main_header}`}>
        <Container style={{ display: "flex", justifyContent: "space-between" }}>
          <BootstrapNavbar.Brand href="/" className={styles.title}>
            MBTA Trip Assistant
          </BootstrapNavbar.Brand>
          <Nav style={{ flex: 1 }}>
            <Nav.Link href="/" className={styles.navLink}>Route Planner</Nav.Link>
            <Nav.Link href="/history" className={styles.navLink}>Route History</Nav.Link>
            <Nav.Link href="/userLocationsPage" className={styles.navLink}>Help</Nav.Link>
          </Nav>
          <Nav style={{ position: "absolute", right: "30px" }}>
            <Nav.Link href="/accountManagementPage" className={styles.navLink}>Profile</Nav.Link>
          </Nav>
        </Container>
      </BootstrapNavbar>
      {renderSubHeader()}
    </>
  )
}