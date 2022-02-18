import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LogginngService } from '../logging.service';
import { Store } from '@ngrx/store';

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
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
    this,this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.slServiceSub = this.shoppingListService.ingredientChanged.subscribe(
    //                           (ingredients: Ingredient[]) => {
    //                             this.ingredients = ingredients
    //                           }
    // )
    this.loggingService.printLog('Hello from Shopping List component on NgOnInit..');
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
ngOnDestroy(): void {
    // this.slServiceSub.unsubscribe();
}
}
