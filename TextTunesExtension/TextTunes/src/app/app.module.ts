import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './login-spotify/login-spotify.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { GetTextComponent } from './get-text/get-text.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    AppComponent, 
    SpotifyLoginComponent, 
    UserDataComponent, 
    GetTextComponent, NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatButtonModule, 
    HttpClientModule, 
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
