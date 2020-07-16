import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule} from 'ng2-charts';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { TypeComponent } from './type/type.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { LogoComponent } from './logo/logo.component';
import { UsersComponent } from './admin/users/users.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { UserOrderCardComponent } from './user-order-card/user-order-card.component';
import { MyInfoComponent } from './my-info/my-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { NotiComponent } from './admin/noti/noti.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { OrdersListComponent } from './admin/orders-list/orders-list.component';
import { ProCatComponent } from './pro-cat/pro-cat.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoryService } from './category.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AlertService} from './shared';
import { AlertComponent } from './_directives';
import { CookieService } from 'ngx-cookie-service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GrdFilterPipe } from './shared';
import { WebInfoComponent } from './web-info/web-info.component';
//import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatModule } from './chat/chat.module';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';
import { RatingComponent } from './rating/rating.component';
import { CommentComponent } from './comment/comment.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'check-out', component: CheckOutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  { path: 'my/orders', component: MyOrderComponent},
  { path: 'admin/products', component: AdminProductsComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/products/:id', component: ProductFormComponent},
  { path: 'confirm', component: ConfirmComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'cancel-order', component: CancelOrderComponent},
  { path: 'admin/users', component: UsersComponent},

  { path: 'my/info/:iduser', component: MyInfoComponent},

  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'admin/dashboard', component: DashboardComponent},
  { path: 'admin/noti', component: NotiComponent},
  { path: 'admin/orders/list', component: OrdersListComponent},
  { path: 'category/:idcate', component: CategoryComponent},
  { path: 'search/:idserch' , component: SearchComponent},
  { path: 'search/' , component: SearchComponent},
  { path: 'vclteam' , component: WebInfoComponent},
];

@NgModule({
  declarations: [
    WebInfoComponent,  
    GrdFilterPipe,
    AlertComponent,
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    SearchComponent,
    TypeComponent,
    ConfirmComponent,
    CancelOrderComponent,
    ProductFilterComponent,
    LogoComponent,
    UsersComponent,
    OrderCardComponent,
    UserOrderCardComponent,
    MyInfoComponent,
    ChangePasswordComponent,
    PaymentComponent,
    ProductDetailComponent,
    AdminNavComponent,
    NotiComponent,
    DashboardComponent,
    OrdersListComponent,
    ProCatComponent,
    CategoryComponent,
    SideNavComponent,
    RatingComponent,
    CommentComponent,
    //ChatDialogComponent,  
  ],
  imports: [
    Ng5SliderModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    BrowserModule, 
    FormsModule, 
    NgxStripeModule,
    Ng2SearchPipeModule,
    ChatModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    CategoryService,
    AlertService,
    CookieService,
    ChatModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
