
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer (state = initialState,
                              action: RecipesActions.RecipesActions)
{
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]  //action.payload 즉 1개 추가 recipe를 기존 state.recipes더함
      }
    case RecipesActions.UPDATE_RECIPE:
      const updateRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      }
      const updateRecipes = [...state.recipes];
      updateRecipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: updateRecipes
      };

      case RecipesActions.DELETE_RECIPE:
        return {
          ...state,
          recipes: state.recipes.filter((recipes, index) => {
            return index != action.payload;
            console.log('this is a sample');
          })
        }
    default:
      return state;
  }
}

