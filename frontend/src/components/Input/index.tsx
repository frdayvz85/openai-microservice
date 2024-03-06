import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.inputContainer}>
            <input
                type="text"
                className={styles.input}
                value={value}
                onChange={handleChange}
            />
        </div>
    );

};

export default Input;
