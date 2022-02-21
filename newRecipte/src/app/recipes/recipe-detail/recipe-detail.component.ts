import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
    this.route.params
                    .pipe(
                      map(params => {
                        return +params['id'];
                      }),
                      switchMap( id => {
                        this.id = id;
                        return this.store.select('recipes');
                      }),
                      map( recipeState => {
                        return recipeState.recipes.find((recipe, index) =>{
                          return index === this.id;
                        });
                      })
                    )
                    .subscribe( recipe => {
                      this.recipe = recipe;
                    });

  }


  onAddShoppingList() {
    console.log( 'drop down menu click');
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    console.log('click edit recipte');
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
   // this.recipeService.deleteRecipe(this.id);
   this,this.store.dispatch(new RecipesActions.DeleteRecipe(this.id) );
    this.router.navigate(['recipes']);
  }
}
