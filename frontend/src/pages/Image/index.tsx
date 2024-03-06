import React from "react";
import styles from "./Image.module.scss";
import { SidebarHeader } from "../../components";

const Image: React.FC = () => {
  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Image generate"
        subtitle="Efficient Automation for Dynamic Image Generation"
      />

      <div className={styles.imageContainer}>Coming SOON</div>
    </div>
  );
};

export default Image;
