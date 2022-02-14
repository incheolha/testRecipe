import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipeChanged = new Subject<Recipe[]>()   //새로 바뀐 recipes(add, edit) 를 subscribe()사용해 알려줄때사용

  // recipes: Recipe[] = [
  //   new Recipe('A test recipe',
  //             'this is a sample recipe image',
  //             'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //             [
  //               new Ingredient('Meat', 5),
  //               new Ingredient('French Fries', 10)
  //             ]),
  //   new Recipe('A test recipe',
  //             'this is a sample recipe image',
  //             'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //             [
  //               new Ingredient('bread', 10),
  //               new Ingredient('ham', 5)
  //             ]),
  //   new Recipe('A test recipe',
  //             'this is a sample recipe image',
  //             'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //             [
  //               new Ingredient('Cheese', 4),
  //               new Ingredient('Sosuage', 8)
  //             ])
  // ]

  recipes: Recipe[] = [];
  
  constructor(private shoppingListService: ShoppingListService){}

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
    this.shoppingListService.addIngredients(ingredients);
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
