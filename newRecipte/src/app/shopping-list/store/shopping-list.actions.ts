
import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const ADD_INGRIDENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGRIDENT;
  constructor(public payload: Ingredient){}

}
