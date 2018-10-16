import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpInterceptorService } from './services/httpInterceptor.service';
import { routes } from './routes';
import { MainComponent } from './main/main.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppHeaderComponent } from './app-header/app-header.component';



@NgModule({
  declarations: [
    AppHeaderComponent,
    ErrorPageComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  }],
  bootstrap: [MainComponent]
})
export class AppModule { }
