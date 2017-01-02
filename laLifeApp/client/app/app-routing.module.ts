import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { SnapsComponent } from './snaps/snaps.component';
import { AddSnapComponent } from "./addSnap/add-snap.component";
import { ViewSnapComponent } from "./viewSnap/view-snap.component";
import { FileUploadComponent } from './fileUpload/file-upload.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from "./users/users.component";
import { LogoutComponent } from "./logout/logout.component";
import { ErrorComponent } from "./error/error.component";

import { LoggedInGuard } from "./_guards/logged-in.guard";
// import { AppComponent } from "./app.component";

const routes : Routes = [
    // {
    //     path: '',
    //     redirectTo : "/snaps",
    //     pathMatch : "full"
    // },
    // {
    //     path: 'snaps',
    //     component: SnapsComponent
    // },
    {
        path: '',
        component: SnapsComponent
    },
    {
        path: "add",
        component : AddSnapComponent
    },
    {
        path: "upload",
        component : FileUploadComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'view/:id',
        component: ViewSnapComponent
    },
    {
        path: "register",
        component : RegisterComponent
    },
    {
        path: "login",
        component : LoginComponent
    },
    {
        path: 'users',
        component: UsersComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'profile/:email',
        component: ProfileComponent,
        canActivate : [LoggedInGuard]
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'error',
        component : ErrorComponent
    },
    {
        path: '**',
        redirectTo : '/error'
        // pathMatch : "full"
    }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
