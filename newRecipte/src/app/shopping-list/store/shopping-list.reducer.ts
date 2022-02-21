
import { Ingredient } from "../../shared/ingredient.model";
// import { ADD_INGRIDENT } from './shopping-list.actions';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
            ingredients: Ingredient[];
            editedIngredient: Ingredient;
            editedIngredientIndex: number;
}


const initialState: State = {
      // Ingredients model을 생략해도 자동적용됨
      ingredients: [new Ingredient('Apples', 5),new Ingredient('Tomatoes', 10)],
      editedIngredient : null,
      editedIngredientIndex: -1
}

//current state을 initial state로 설정한다
export function shoppingListReducer(state: State = initialState,
                                    action: ShoppingListActions.ShoppingListActions) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:          // ...(array lateral구문) state.ingredients.push()하고 같은 기능
                          return { ...state, ingredients: [...state.ingredients, action.payload]};
    case ShoppingListActions.ADD_INGREDIENTS:
                          return { ...state, ingredients: [...state.ingredients, ...action.payload]}
    case ShoppingListActions.UPDATE_INGREDIENT:
                            const ingredient = state.ingredients[state.editedIngredientIndex];
                            console.log('Current Ingredient...' + ingredient);
                            const updateIngredient = {
                              ...ingredient,
                              ...action.payload
                            };
                            console.log('Updated Ingredient...' + updateIngredient);
                            const updateIngredients = [...state.ingredients];
                            console.log('Updated Ingredients...' + updateIngredients);
                            updateIngredients[state.editedIngredientIndex] = updateIngredient;
                            return {
                              ...state,
                              ingredients: updateIngredients,
                              editedIngredientIndex: -1,
                              editedIngredient: null
                            }
    case ShoppingListActions.DELETE_INGREDIENT:
                            return {
                              ...state,
                              ingredients: state.ingredients.filter( (ig, igIndex) => {
                                return igIndex !== state.editedIngredientIndex;
                              }),
                              editedIngredientIndex: -1,
                              editedIngredient: null
                            };
    case ShoppingListActions.START_EDIT:
                            return {
                              ...state,
                              editedIngredientIndex: action.payload,
                              editedIngredient: {...state.ingredients[action.payload]}
                            };
    case ShoppingListActions.STOP_EDIT:
                            return {
                              ...state,
                              editedtIngredient: null,
                              editedIngredientIndex: -1
                            }
    default: return state;
  }

}
