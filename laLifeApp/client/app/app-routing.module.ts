import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import {SnapsComponent } from "./snaps.component";
import {AddSnapComponent} from "./add-snap.component";
import { ViewSnapComponent } from "./view-snap.component";
import { FileUploadComponent } from './file-upload.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

import { LoggedInGuard } from "./logged-in.guard";
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
        component : FileUploadComponent
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
        path: 'profile/:id',
        component: ProfileComponent
    },
    {
        path: 'users',
        component: ProfileComponent,
        canActivate : [LoggedInGuard]
    }
];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}
