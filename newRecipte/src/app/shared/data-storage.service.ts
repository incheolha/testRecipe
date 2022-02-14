import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
            .put('https://recipe-book-f8456-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                        console.log(response);
            });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-book-f8456-default-rtdb.firebaseio.com/recipes.json')
          .pipe( map(recipes => {
              return recipes.map( recipe => {
                  return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                                                   //  recipe.ingredients값을 비하여 값이 있으면 그사용하고 없의면 []으로 return한다
              });
          }),
              tap(recipes => {
                  this.recipeService.setRecipes(recipes);
              })
        )
  }
}


