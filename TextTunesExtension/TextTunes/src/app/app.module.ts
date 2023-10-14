import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './login-spotify/login-spotify.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { GetTextComponent } from './get-text/get-text.component';

@NgModule({
  declarations: [
    AppComponent, 
    SpotifyLoginComponent, 
    UserDataComponent, 
    GetTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatButtonModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
