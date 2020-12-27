import Aux from '../../hoc/Auxilliary';
import classes from './layout.module.css';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Side-drawer, Backdrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

export default layout;