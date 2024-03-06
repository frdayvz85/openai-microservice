import React from "react";
import styles from "./SidebarHeader.module.scss";


interface SidebarHeaderProps {
    title: string;
    subtitle: string
}


const SidebarHeader: React.FC<SidebarHeaderProps> = ({ title, subtitle }) => {
    return (
        <div>
            <div className={styles.sidebarHeader}>
                <h2 className={styles.sidebarTitle}>
                    {title}
                </h2>
                <p className={styles.sidebarContent}>
                    {subtitle}
                </p>
            </div>

        </div>
    );
};

export default SidebarHeader;
