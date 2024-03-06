import classes from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={classes.Loader}>
            <div className={classes.Circle}></div>
        </div>
    );
};

export default Loading;