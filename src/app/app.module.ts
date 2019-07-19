import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule, MatButtonModule, MatDialogModule, MatCardModule} from '@angular/material';

import {HomeComponent, DownloadDialog} from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DownloadDialog
	],
	entryComponents: [
		DownloadDialog
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FlexLayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatDialogModule,
		MatCardModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
