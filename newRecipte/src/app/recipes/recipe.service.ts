import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

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

  getRecipes() {
    return this.recipes.slice();
  }


}
