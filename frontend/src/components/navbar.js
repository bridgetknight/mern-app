import React, { useEffect, useState } from "react";
import getUserInfo from "../utilities/decodeJwt";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Navbar.module.css";
import SubHeader from "../components/subheader";

// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:
  // eslint-disable-next-line
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  function renderSubHeader() {
    const path = location.pathname;
    switch (path) {
      case "/":
        return <SubHeader pageTitle="Route Planner" />;
      case "/userLocationsPage":
        return <SubHeader pageTitle="My Locations" />;
      case "/accountManagementPage":
        return <SubHeader pageTitle="Profile" />;
      default:
        return null;
    }
  }

  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };

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
          <Nav style={{ position: "absolute", left: "200px", flex: 1 }}>
            <Nav.Link href="/" className={styles.navLink}>
              Route Planner
            </Nav.Link>
            <Nav.Link href="/userLocationsPage" className={styles.navLink}>
              Saved Locations
            </Nav.Link>
          </Nav>
          <Nav style={{ position: "absolute", right: "10px" }}>
            {user && (
              <>
                <Nav.Link
                  href="/accountManagementPage"
                  className={styles.navLink}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  href="/"
                  className={styles.navLink}
                  onClick={handleLogout}
                >
                  Log Out
                </Nav.Link>
              </>
            )}
            {!user && (
              <>
                <Nav.Link href="/login" className={styles.navLink}>
                  Log In
                </Nav.Link>
                <Nav.Link href="/signup" className={styles.navLink}>
                  Register
                </Nav.Link>
                <Nav.Link href="/help" className={styles.navLink}>
                  Help
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </BootstrapNavbar>
      {renderSubHeader()}
    </>
  );
}
