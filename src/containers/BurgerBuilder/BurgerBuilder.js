import { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then((res) => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }

        updatedIngredient[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    removeIngredientHandler = (type) => {

        if (this.state.ingredients[type] <= 0) {
            return;
        }

        const updatedCount = this.state.ingredients[type] - 1;

        const updatedIngredient = {
            ...this.state.ingredients
        }

        updatedIngredient[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        });
        this.updatePurchaseState(updatedIngredient);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // alert('continued');
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rohan',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '22334',
                    country: 'India'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then((res) => { this.setState({ loading: false, purchasing: false }) })
            .catch((err) => { this.setState({ loading: false, purchasing: false }) });
    }



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner></Spinner>

        if (this.state.ingredients) {

            burger = (<Aux> <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}></BuildControls></Aux>)
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            ></OrderSummary>
        }

        if (this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);