import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FluidContainerModule } from './layouts/fluid-container';
import { ContainerWithSidebarModule } from './layouts/container-with-sidebar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, OverlayModule, FluidContainerModule, ContainerWithSidebarModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
