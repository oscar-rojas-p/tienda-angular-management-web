import { Routes } from '@angular/router';

export const routes: Routes = [
        {
            path:'clientes',
            loadComponent: () => import('./shared/components/clientes/clientes.component')
        },
        {
            path:'pedidos',
            loadComponent: () => import('./shared/components/pedidos/pedidos.component')
        },
        {
            path:'productos',
            loadComponent: () => import('./shared/components/productos/productos.component')
        },
        {
            path: '',
            redirectTo: 'pedidos',
            pathMatch: 'full'
        }
];
