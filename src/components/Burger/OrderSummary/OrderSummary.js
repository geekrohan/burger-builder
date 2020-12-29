import Aux from '../../../hoc/Auxiliary'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }} >{igKey}:</span> {props.ingredients[igKey]}  </li>
    })

    return (
        <Aux>
            <h3>YOUR ORDER</h3>
            <p>A delicious burger with the following Ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default orderSummary;