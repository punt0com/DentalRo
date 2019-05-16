import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  { path: 'clientes',
  // loadChildren: './clientes/clientes.module#ClientesPageModule' 
  children: [
  {
    path: '' ,
    loadChildren : './clientes/clientes.module#ClientesPageModule'
  },
  {
    path: ':nombre',
    loadChildren: './clientes/clientes-detalles/clientes-detalles.module#ClientesDetallesPageModule',
  }
  ]
},
  { path: 'clientes-detalles', loadChildren: './clientes/clientes-detalles/clientes-detalles.module#ClientesDetallesPageModule' },
  // { path: 'citas', loadChildren: './citas/citas.module#CitasPageModule' }
  {
    path: 'citas',
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: './citas/citas.module#CitasPageModule',
          },
          {
            path: ':date',
            loadChildren: './citas/citas-detalles/citas-detalles.module#CitasDetallesPageModule',
          },
          {
          path: ':date/:id',
          loadChildren: './citas/citas-editar/citas-editar.module#CitasEditarPageModule',
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
