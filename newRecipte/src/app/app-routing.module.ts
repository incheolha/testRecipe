import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},

  //angular 9+부터는 loadChildren에 string값을 더하면 error가 발생함 그러므로 반드시 callback함수사용하여
  // 적용해야함
  // { path: 'recipes', loadChildren: './recipes/recipes-routing.module#RecipesRoutingModule'}

  { path: 'recipes',
  loadChildren: () => import('./recipes/recipes-routing.module').then ( m => m.RecipesRoutingModule)
  },
  { path: 'shopping-list',
  loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListModule)
  },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

  }
];

@NgModule( {
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
