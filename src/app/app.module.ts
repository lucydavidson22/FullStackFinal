import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FoodsComponent } from './foods/foods.component';
import { HeaderComponent } from './header.component';
import { FoodsEditComponent } from './foods/foods-edit/foods-edit.component';
import { FoodsDetailComponent } from './foods/foods-detail/foods-detail.component';
import { FoodsItemComponent } from './foods/foods-item/foods-item.component';
import { FoodsListComponent } from './foods/foods-list/foods-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SitInsComponent } from './sit-in/sit-ins.component';

import { SitInsItemComponent } from './sit-in/sit-ins-item/sit-ins-item.component';
import { SitInsDetailComponent } from './sit-in/sit-ins-detail/sit-ins-detail.component';
import { SitInEditComponent } from './sit-in/sit-in-edit/sit-in-edit.component';
import { SitInListComponent } from './sit-in/sit-ins-list/sit-ins-list.component';
import { HomemadeComponent } from './homemade/homemades.component';
import { HomemadeListComponent } from './homemade/homemade-list/homemade-list.component';
import { HomemadeItemComponent } from './homemade/homemade-item/homemade-item.component';
import { HomemadeEditComponent } from './homemade/homemade-edit/homemade-edit.component';
import { CommonModule } from '@angular/common';
import { FoodsRandomDetailComponent } from './foods/foods-random-detail/foods-random-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    FoodsComponent,
    HeaderComponent,
    FoodsEditComponent,
    FoodsDetailComponent,
    FoodsItemComponent,
    FoodsListComponent,
    SitInsComponent,
    SitInListComponent,
    SitInsItemComponent,
    SitInsDetailComponent,
    SitInEditComponent,
    HomemadeComponent,
    HomemadeListComponent,
    HomemadeItemComponent,
    HomemadeEditComponent,
    FoodsRandomDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
