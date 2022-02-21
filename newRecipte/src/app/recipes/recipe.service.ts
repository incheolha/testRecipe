import { EventEmitter, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipeChanged = new Subject<Recipe[]>()   //새로 바뀐 recipes(add, edit) 를 subscribe()사용해 알려줄때사용

  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromApp.AppState>
    ){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
