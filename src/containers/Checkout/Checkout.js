import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import { purchaseBurgerStart } from "../../store/actions/index";
class Checkout extends Component {


    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutCountinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }



    render() {

        let summary = <Redirect to="/"></Redirect>
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"></Redirect> : null
            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings} checkoutCanceled={this.checkoutCanceledHandler} checkoutContinued={this.checkoutCountinuedHandler}></CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
            </div>
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);