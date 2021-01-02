import classes from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <div>MENU</div>
            <Logo></Logo>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    )
}

export default toolbar;