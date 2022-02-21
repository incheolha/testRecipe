import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
                              ofType(RecipesActions.FETCH_RECIPES),
                              switchMap(() => {
                                return this.http.get<Recipe[]>(
                                  'https://recipe-book-f8456-default-rtdb.firebaseio.com/recipes.json'
                                );
                              }),
                              map(recipes => {
                                return recipes.map( recipe => {
                                  return {
                                    ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                                  };
                                });
                              }),
                              map( recipes => {
                                return new RecipesActions.SetRecipes(recipes);
                              })

  );

  constructor( private actions$: Actions, private http: HttpClient) {}
}
