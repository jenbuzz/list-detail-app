import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {
        path: ':id',
        component: DetailComponent,
        data: { animation: 'detail' },
    },
    {
        path: '',
        component: ListComponent,
        data: { animation: 'list' },
    },
    {
        path: '**',
        pathMatch: 'full',
        component: ErrorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
