import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) { }


  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
            .put('https://recipe-book-f8456-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                        console.log(response);
            });
  }

  fetchRecipes() {
  // behaviorSubject을 Oberve하다가 그 값이 돌와오면 take(1)을 사용하여 한번으로 종류하고
  //  exhaustMap을 이용하여 다른 Subject을 불러내는 과정  첫번쩨 Subject내에 또 다른 Subject를 불러오는과정

    return this.http.get<Recipe[]>(

          'https://recipe-book-f8456-default-rtdb.firebaseio.com/recipes.json'

      ).pipe(

          map(recipes => {
            return recipes.map( recipe => {
              return {
                ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }),
          tap( recipes => {
            this.recipeService.setRecipes(recipes);
          })
      )
  }

}


