import Aux from '../../hoc/Auxilliary';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, Side-drawer, Backdrop</div>
            <main>{props.children}</main>
        </Aux>
    );
};

export default layout;