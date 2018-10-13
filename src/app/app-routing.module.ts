import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '@listdetailapp/components/list/list.component';
import { DetailComponent } from '@listdetailapp/components/detail/detail.component';
import { ErrorComponent } from '@listdetailapp/components/error/error.component';

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
