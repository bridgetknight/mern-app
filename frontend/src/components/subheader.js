import React from "react";
import styles from "../Navbar.module.css";

const SubHeader = ({ pageTitle }) => { // Receive pageTitle prop
  return (
    <div className={styles.subHeader} id="sub_header" style={{ width: "100%" }}>
      <div className={`${styles.navLink} ${styles.subtitle}`} id="subtitle">{pageTitle}</div> {/* Use pageTitle prop */}
    </div>
  );
};

export default SubHeader;