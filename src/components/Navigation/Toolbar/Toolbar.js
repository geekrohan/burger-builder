import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo></Logo>
            <nav>
                ...
        </nav>
        </header>
    )
}

export default toolbar;