import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AnimateDirective } from "./animate.directive";

@NgModule({
    declarations: [AppComponent, AnimateDirective],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
