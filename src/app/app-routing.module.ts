import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FoodsEditComponent } from "./foods/foods-edit/foods-edit.component";
import { FoodsDetailComponent } from "./foods/foods-detail/foods-detail.component";
import { FoodsComponent } from "./foods/foods.component";
import { SitInsComponent } from "./sit-in/sit-ins.component";
import { SitInEditComponent } from "./sit-in/sit-in-edit/sit-in-edit.component";
import { SitInsDetailComponent } from "./sit-in/sit-ins-detail/sit-ins-detail.component";
import { HomemadeComponent } from "./homemade/homemades.component";
import { HomemadeEditComponent } from "./homemade/homemade-edit/homemade-edit.component";
import { HomemadeDetailComponent } from "./homemade/homemade-detail/homemade-detail.component";
import { HomemadeItemComponent } from "./homemade/homemade-item/homemade-item.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/foods', pathMatch: 'full'},
  {path: 'foods', component: FoodsComponent, children: [
    {path: 'new', component: FoodsEditComponent},
    {path: ':id', component: FoodsDetailComponent},
    {path: ':id/edit', component: FoodsEditComponent}
  ]},
  {path: 'sitIns', component: SitInsComponent, children: [
    {path: 'new', component: SitInEditComponent},
    {path: ':id', component: SitInsDetailComponent},
    {path: ':id/edit', component: SitInEditComponent}
  ]},
  {path: 'homemades', component: HomemadeComponent, children: [
    {path: 'new', component: HomemadeEditComponent},
    {path: ':id', component: HomemadeDetailComponent},
    {path: ':id/edit', component: HomemadeEditComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
