import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[]

  constructor(private recipeSerice:RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.recipes = this.recipeSerice.getRecipes();
  }

  onNewRecipe() {
  this.router.navigate(['new'], {relativeTo: this.route});
  }

}
