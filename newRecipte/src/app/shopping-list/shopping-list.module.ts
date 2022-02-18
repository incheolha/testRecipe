import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ ShoppingListComponent, ShoppingEditComponent],
  imports: [
   // CommonModule,   이모둘을 없애고 새로 생성한 sharedmodule로 대체한다
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent},
    ])
  ]
})
export class ShoppingListModule {}
