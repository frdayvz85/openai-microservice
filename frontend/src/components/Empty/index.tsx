import styles from './Empty.module.scss';

interface EmptyProps {
    label: string;
}

const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className={styles.empty}>
            <div className={styles.emptyImage}>
                <img src="https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <p className={styles.emptyText}>
                {label}
            </p>
        </div>
    );
};


export default Empty
