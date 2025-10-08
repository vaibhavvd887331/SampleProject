import { Routes } from '@angular/router';
import { Login } from './Components/login/login';
import { Signup } from './Components/signup/signup';
import { TransactionList } from './Components/transaction-list/transaction-list';
import { TransactionForm } from './Components/transaction-form/transaction-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'login',
        component: Login
    },
    {
        path:'signup',
        component: Signup
    },
    {
        path:'transaction',
        component:TransactionList,
        canActivate: [authGuard]
    },
    {
        path : 'add',
        component: TransactionForm,
          canActivate: [authGuard]
    },
    {
        path : 'edit/:id',
        component: TransactionForm,
          canActivate: [authGuard]
    },
    {
        path:'**',
        redirectTo:'transaction',
    },
    // {
    //     path:'',
    //     redirectTo:'transaction',
    //        canActivate: [authGuard],
    //     pathMatch:'full'
       
    // }
];
