import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
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
        private router: Router
    ) {
        this.themeMainColor = this.config.getStyling().themeMainColor;
        this.title = this.config.getText().title;
    }

    ngOnInit() {
        this.router.events.subscribe((event: any) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            window.scrollTo(0, 0);
        });
    }

    getAnimation(outlet: RouterOutlet) {
        return outlet.activatedRouteData['animation'] || 'list';
    }

}
