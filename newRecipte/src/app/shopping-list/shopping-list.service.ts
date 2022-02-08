import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[]= [
    new Ingredient('Apples', 5),
    new Ingredient('pears', 10),
    new Ingredient('Tomatos', 10)
];

getIngredient() {
  return this.ingredients.slice();
}

addIngredient(ingredient: Ingredient) {
  this.ingredients.push(ingredient);
  this.ingredientChanged.emit(this.ingredients.slice());
}

addIngredients(ingredients: Ingredient[]) {

  // for( let ingredient of ingredients ) {
  //   this.addIngredient(ingredient);
  // }
  this.ingredients.push(...ingredients);
  this.ingredientChanged.emit(this.ingredients.slice());
}
}
