import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MetafrenzyModule } from 'ngx-metafrenzy';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CardComponent } from './card/card.component';

import { ConfigService } from './config.service';
import { DrupalApiService } from './drupal-api.service';

const appRoutes: Routes = [
    {
        path: ':id',
        component: DetailComponent,
    },
    {
        path: '',
        component: ListComponent,
    },
];

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
        RouterModule.forRoot(
            appRoutes
        ),
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
