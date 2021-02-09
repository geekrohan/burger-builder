import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const initIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then((res) => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed())
            });
    }
}