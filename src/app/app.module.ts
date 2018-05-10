import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetafrenzyModule } from 'ngx-metafrenzy';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';

import { ConfigService } from './config.service';
import { DrupalApiService } from './drupal-api.service';

export function loadConfig(configService: ConfigService) {
    return () => {
        return configService.load();
    };
}

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        DetailComponent,
        PaginationComponent,
        CardComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        MetafrenzyModule.forRoot(),
    ],
    providers: [
        ConfigService,
        {provide: APP_INITIALIZER, useFactory: loadConfig, deps: [ConfigService], multi: true},
        DrupalApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
