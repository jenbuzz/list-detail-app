import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './config.service';
import { routeAnimation } from './animations';

@Component({
    selector: 'list-detail-app',
    templateUrl: './app.component.html',
    animations: [
        routeAnimation,
    ],
})
export class AppComponent {

    themeMainColor: string = '';
    title: string = '';
    
    constructor(
        private config: ConfigService,
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.title = this.config.getText().title;
    }

    getAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

}
