import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngrdients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map(
                (_, i) => {
                    return <BurgerIngredient key={igkey + i} type={igkey}></BurgerIngredient>
                }
            )
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngrdients.length === 0) {
        transformedIngrdients = <p>Please Start adding Ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngrdients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger;