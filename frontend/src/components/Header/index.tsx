import React from "react";
import { FaHome } from "react-icons/fa"
import { SiOpenai } from "react-icons/si";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header id={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <Link className={styles.logo} to="/">
            AI Generator
          </Link>
          <nav className={styles.navlinks}>
            <ul>
              <li>
                <Link to="/">
                  <FaHome className={`${styles.icon} ${styles.homeIcon}`} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/models">
                  <SiOpenai
                    className={`${styles.icon} ${styles.barIcon}`}
                  />
                  <span>Models</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
