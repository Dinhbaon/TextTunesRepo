import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyLoginComponent } from './login-spotify/login-spotify.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDataComponent } from './user-data/user-data.component';
import { GetTextComponent } from './get-text/get-text.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { RecommendationResultsComponent } from './recommendation-results/recommendation-results.component';
@NgModule({
  declarations: [
    AppComponent, 
    SpotifyLoginComponent, 
    UserDataComponent, 
    GetTextComponent, RecommendationResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    MatButtonModule, 
    HttpClientModule, 
    MatTabsModule, 
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
