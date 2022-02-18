import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.module";
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
                    RecipesComponent,
                    RecipeListComponent,
                    RecipeDetailComponent,
                    RecipeItemComponent,
                    RecipeStartComponent,
                    RecipeEditComponent
                ],
      imports: [ FormsModule,
                 ReactiveFormsModule,
                 RecipesRoutingModule,
                 SharedModule
                ]
 // 위에 있는 recipes component들은 외부에 다른 component와 연결이 필요없으므로 구지 외부에 노출시킬필요없다
 // 그러므로 아래 exports 부분은 생략해도 된다

      // exports: [
      //               RecipesComponent,
      //               RecipeListComponent,
      //               RecipeDetailComponent,
      //               RecipeItemComponent,
      //               RecipeStartComponent,
      //               RecipeEditComponent
      //         ]

})
export class RecipeModule {}

