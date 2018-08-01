import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MetafrenzyModule } from 'ngx-metafrenzy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { TranslatePipe } from './translate.pipe';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';
import { ErrorComponent } from './error/error.component';

import { ConfigService } from './config.service';
import { ApiService } from './api.service';
import { FontAwesomeService } from './font-awesome.service';
import { TranslationService } from './translation.service';
import { SearchComponent } from './search/search.component';

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
        ErrorComponent,
        SearchComponent,
        TranslatePipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MetafrenzyModule.forRoot(),
        FontAwesomeModule,
    ],
    providers: [
        ConfigService,
        {provide: APP_INITIALIZER, useFactory: loadConfig, deps: [ConfigService], multi: true},
        ApiService,
        FontAwesomeService,
        TranslationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
