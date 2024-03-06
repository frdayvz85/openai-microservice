import React from "react";
import styles from "./Music.module.scss";
import { SidebarHeader } from "../../components";

const Music: React.FC = () => {
  return (
    <div className={styles.container}>
      <SidebarHeader
        title="Music generate"
        subtitle="Efficient Automation for Dynamic Music Generation"
      />

      <div className={styles.musicContainer}>Coming SOON</div>
    </div>
  );
};

export default Music;
