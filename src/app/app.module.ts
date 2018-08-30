import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { GenerateSqlService } from './service/generate-sql.service';
import { GenerateJsonService } from './service/generate-json.service';
import { GenerateGolangService } from './service/generate-golang.service';
import { GenerateAngularService } from './service/generate-angular.service';
import { WordProcessService } from './service/word-process.service';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    CdkTableModule,
    CdkTreeModule,
    MaterialModule,
  ],
  providers: [
    GenerateSqlService,
    GenerateJsonService,
    GenerateGolangService,
    GenerateAngularService,
    WordProcessService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
