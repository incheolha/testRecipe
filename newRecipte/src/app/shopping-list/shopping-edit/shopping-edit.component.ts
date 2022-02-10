import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f', {static: false}) slForm: NgForm;

  editSubscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {

     this.editSubscription = this.shoppingListService.startedEditing
                             .subscribe((index: number) => {
                              this.editMode = true;
                              this.editItemIndex = index;
                              this.editItem = this.shoppingListService.getIngredient(index);
                              this.slForm.setValue({
                                name: this.editItem.name,
                                amount: this.editItem.amount
                              })
                             })
  }
  onSubmit(form: NgForm) {
    console.log(form.value)
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log(newIngredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, newIngredient);

    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
  this.shoppingListService.deleteIngredint(this.editItemIndex);
  this.onClear();
  }
  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

}
