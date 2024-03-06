import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    onClick?: () => void;
    label: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, type }) => {
    return (
        <button className={styles.button} type={type} >
            {label}
        </button>
    );
};

export default Button;
