import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f', {static: false}) slForm: NgForm;

  editSubscription: Subscription;
  editMode = false;
  editItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService,
              private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {

    this.editSubscription = this.store.select('shoppingList').subscribe( stateData => {

      if(stateData.editedIngredientIndex > -1) {
                            this.editMode = true;
                            this.editItem = stateData.editedIngredient;
                            this.slForm.setValue({
                                                name: this.editItem.name,
                                                amount: this.editItem.amount
                                              })
      } else {
        this.editMode = false;
      }
    })

  }
  onSubmit(form: NgForm) {
    console.log(form.value)
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log(newIngredient);
    if (this.editMode) {

      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));

      // this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);

    } else {
         this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    )
  // this.shoppingListService.deleteIngredint(this.editItemIndex);
  this.onClear();
  }
  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.editSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StoptEdit());
  }

}
