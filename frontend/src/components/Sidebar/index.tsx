import React, { useState } from "react";
import styles from "./Sidebar.module.scss"; // Import SCSS module
import { FaChevronCircleLeft, FaCode, FaMusic, FaImage } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarClosed((prevState) => !prevState);
  };

  return (
    <nav className={`${styles.sidebar} ${isSidebarClosed ? styles.close : ""}`}>
      <header className={styles.header}>
        <div className={styles.imageText}>
          {" "}
          {/* Use styles.imageText */}
          <span className={styles.image}>
            <img
              src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg"
              alt="logo"
            />
          </span>
          <div className={styles.headerText}>
            {" "}
            {/* Use styles.text */}
            <span className={styles.main}>AI</span>
            <span className={styles.sub}>Generator</span>
          </div>
        </div>
        <FaChevronCircleLeft
          onClick={handleToggleSidebar}
          className={styles.toggle}
        />
      </header>

      <div className={styles.menuBar}>
        <div className={styles.menu}>
          <ul className={styles.menuLinks}>
            {/* <li className={styles.searchBar}>
                            <IoSearchOutline className={`bx bx-search ${styles.icons}`} />
                            <input type="search" placeholder="Search..." />
                        </li> */}
            <li className={styles.navLink}>
              <Link to="/">
                <MdDashboard className={styles.icons} />
                <span className={styles.navText}>Dashboard</span>
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link to="/code-generate">
                <FaCode className={styles.icons} />
                <span className={styles.navText}>Code Generate</span>
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link to="/video-generate">
                <RxVideo className={styles.icons} />
                <span className={styles.navText}>Video Generate</span>
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link to="/music-generate">
                <FaMusic className={styles.icons} />
                <span className={styles.navText}>Music Generate</span>
              </Link>
            </li>
            <li className={styles.navLink}>
              <Link to="/image-generate">
                <FaImage className={styles.icons} />
                <span className={styles.navText}>Image Generate</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.bottomContent}>
          <ul>
            {/* <li className={styles.navLink}>
              <a href="#">
                <SlLogout className={styles.icons} />
                <span className={styles.navText}>Log Out</span>
              </a>
            </li> */}
            <li className={styles.mode}>
              <div className={styles.moonSun}>
                <i className={`bx bx-moon ${styles.icons} ${styles.moon}`}></i>
                <i className={`bx bx-sun ${styles.icons} ${styles.sun}`}></i>
              </div>
              <span className={`${styles.modeText} ${styles.text}`}>
                Dark Mode
              </span>
              <div className={styles.toggleSwitch}>
                <span className={styles.switch}></span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
