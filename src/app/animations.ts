import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
    transition('list => detail', [
        style({ height: '!' }),
        query(':enter', style({ opacity: 0 })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        group([
            query(':leave', [
                animate('.5s', style({ opacity: 0 })),
            ]),
            query(':enter', animate('.5s', style({ opacity: 1 }))),
        ]),
    ]),
    transition('detail => list', [
        style({ height: '!' }),
        query(':enter', style({  opacity: 0 })),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        group([
            query(':leave', [
                animate('.5s', style({ opacity: 0 })),
            ]),
            query(':enter', animate('.5s', style({ opacity: 1 }))),
        ]),
    ])
]);
