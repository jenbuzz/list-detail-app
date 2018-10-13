import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MetafrenzyModule } from 'ngx-metafrenzy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from '@listdetailapp/app-routing.module';
import { TranslatePipe } from '@listdetailapp/pipes';
import { AppComponent } from '@listdetailapp/app.component';
import { ListComponent } from '@listdetailapp/components/list/list.component';
import { DetailComponent } from '@listdetailapp/components/detail/detail.component';
import { PaginationComponent } from '@listdetailapp/components/pagination/pagination.component';
import { CardComponent } from '@listdetailapp/components/card/card.component';
import { ErrorComponent } from '@listdetailapp/components/error/error.component';
import { SearchComponent } from '@listdetailapp/components/search/search.component';
import { FilterComponent } from '@listdetailapp/components/filter/filter.component';
import { ConfigService, ApiService, FontAwesomeService, TranslationService } from '@listdetailapp/services';

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
