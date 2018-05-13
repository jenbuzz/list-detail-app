import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
    transition('* <=> *', [
        query(':enter',
            style({
                opacity: 0
            }),
            {optional: true}
        ),
        group([
            query(':leave',
                animate('.5s ease',
                    style({
                        opacity: 0
                    })
                ),
                {optional: true}
            ),
            query(':enter',
                animate('.5s ease',
                    style({
                    opacity: 1
                    })
                ),
                {optional: true}
            )
        ])
    ])
]);
