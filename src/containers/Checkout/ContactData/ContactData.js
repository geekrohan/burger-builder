import { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
            .then((res) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((err) => { this.setState({ loading: false }) });
    }
    render() {

        let form = (<form>
            <input type="text" name="name" placeholder="Your Name"></input>
            <input type="email" name="email" placeholder="Your Email"></input>
            <input type="text" name="street" placeholder="Street"></input>
            <input type="text" name="postal" placeholder="Postal Code"></input>

            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner></Spinner>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;