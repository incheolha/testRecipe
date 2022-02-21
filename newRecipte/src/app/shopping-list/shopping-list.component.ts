import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LogginngService } from '../logging.service';

import * as ShoppingListActions  from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  private slServiceSub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LogginngService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    console.log('this shoppling list store', this.ingredients);
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.slServiceSub = this.shoppingListService.ingredientChanged.subscribe(
    //                           (ingredients: Ingredient[]) => {
    //                             this.ingredients = ingredients
    //                           }
    // )
    this.loggingService.printLog('Hello from Shopping List component on NgOnInit..');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
     // this.shoppingListService.startedEditing.next(index);
  }
ngOnDestroy(): void {
  this.store.dispatch(new ShoppingListActions.StoptEdit());
    // this.slServiceSub.unsubscribe();
}
}
