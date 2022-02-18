
import { Ingredient } from "../../shared/ingredient.model";
// import { ADD_INGRIDENT } from './shopping-list.actions';
import * as ShoppingListActions from './shopping-list.actions';
const initialState = {

  // Ingredients model을 생략해도 자동적용됨

  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
}
//current state을 initial state로 설정한다
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGRIDENT:          // ...(array lateral구문) state.ingredients.push()하고 같은 기능
                          return { ...state, ingredients: [...state.ingredients, action.payload]};
    default: return state;
  }

}
