import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A test recipe',
              'this is a sample recipe image',
              'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
              [
                new Ingredient('Meat', 5),
                new Ingredient('French Fries', 10)
              ]),
    new Recipe('A test recipe',
              'this is a sample recipe image',
              'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
              [
                new Ingredient('bread', 10),
                new Ingredient('ham', 5)
              ]),
    new Recipe('A test recipe',
              'this is a sample recipe image',
              'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
              [
                new Ingredient('Cheese', 4),
                new Ingredient('Sosuage', 8)
              ])
  ]

  constructor(private shoppingListService: ShoppingListService){}

  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
