import Aux from '../../hoc/Auxiliary';
import classes from './layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { Component } from 'react';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });

    }

    render() {
        return (
            <Aux>
                <Toolbar></Toolbar>
                <SideDrawer closed={this.SideDrawerClosedHandler} open={this.state.showSideDrawer}></SideDrawer>
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>);
    }

}

export default Layout;