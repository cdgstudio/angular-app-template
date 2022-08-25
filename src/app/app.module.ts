import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageSidebarModule } from './layout/page-sidebar/page-sidebar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, OverlayModule, PageSidebarModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
