import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
    transition('* => *', [
        style({ height: '!' }),
        query(':enter', style({
            opacity: 0,
        }), {
            optional: true,
        }),
        query(':enter, :leave', style({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        }), {
            optional: true,
        }),
        group([
            query(':leave', [
                animate('.5s', style({
                    opacity: 0,
                })),
            ], {
                optional: true,
            }),
            query(':enter', animate('.5s', style({
                opacity: 1,
            })), {
                optional: true,
            }),
        ]),
    ])
]);
