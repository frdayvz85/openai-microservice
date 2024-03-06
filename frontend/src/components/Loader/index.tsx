import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
    return (
        <section className={styles.loading}>
            <div className={styles.loader}>
                <div className={`${styles.upper} ${styles.ball}`}></div>
                <div className={`${styles.right} ${styles.ball}`}></div>
                <div className={`${styles.lower} ${styles.ball}`}></div>
                <div className={`${styles.left} ${styles.ball}`}></div>
            </div>
        </section>
    );
};

export default Loader;
