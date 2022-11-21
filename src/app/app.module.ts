import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';



export function tokenGetter() {
  //console.log(localStorage.getItem("access_token"));
  return localStorage.getItem("access_token");
  
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    //NgprimeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
