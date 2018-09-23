import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MetafrenzyModule } from 'ngx-metafrenzy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { TranslatePipe } from './pipes';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/card/card.component';
import { ErrorComponent } from './components/error/error.component';
import { SearchComponent } from './components/search/search.component';
import { FilterComponent } from './components/filter/filter.component';

import { ConfigService, ApiService, FontAwesomeService, TranslationService } from './services';

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
        FilterComponent,
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
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {}
