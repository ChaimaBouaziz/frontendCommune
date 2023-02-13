import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { AddScategorieComponent } from './scategorie/add-scategorie/add-scategorie.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import{MatSliderModule}from'@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';
import { AddDepartementComponent } from './departement/add-departement/add-departement.component';
import { ListDepartementComponent } from './departement/list-departement/list-departement.component';
import { AddEmployeComponent } from './employe/add-employe/add-employe.component';
import { ListEmployeComponent } from './employe/list-employe/list-employe.component';
import { AddDetailsoperationComponent } from './entre/add-detailsoperation/add-detailsoperation.component';
import { ListDetailsoperationComponent } from './entre/list-detailsoperation/list-detailsoperation.component';
import { AddEntreComponent } from './entre/add-entre/add-entre.component';
import { ListEntreComponent } from './entre/list-entre/list-entre.component';
import { AddFournisseurComponent } from './fournisseur/add-fournisseur/add-fournisseur.component';
import { ListFournisseurComponent } from './fournisseur/list-fournisseur/list-fournisseur.component';
import { AddInventaireComponent } from './inventaire/add-inventaire/add-inventaire.component';
import { ListInventaireComponent } from './inventaire/list-inventaire/list-inventaire.component';
import { ListLinventaireComponent } from './inventaire/list-linventaire/list-linventaire.component';
import { AddLinventaireComponent } from './inventaire/add-linventaire/add-linventaire.component';
import { AddDetailsComponent } from './sortie/add-details/add-details.component';
import { ListDetailsComponent } from './sortie/list-details/list-details.component';
import { ListSortieComponent } from './sortie/list-sortie/list-sortie.component';
import { AddSortieComponent } from './sortie/add-sortie/add-sortie.component';
import { LoginComponent } from './login/login.component';
import { authInterceptorProviders } from '_helpers/auth.interceptor';
import { ConfirmDialogComponent } from './confirmDialog/confirm-dialog/confirm-dialog.component';
import { FilterPipe } from './filter.pipe';
import { ConsultComponent } from './entre/consult/consult.component';
import { ConsultsComponent } from './sortie/consults/consults.component';

const appRoutes :Routes =[
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  
  {path: 'home', component: MenuComponent, children: [
  {path:'articles',component:ListArticleComponent},
  {path:'article',component:AddArticleComponent},
  {path:'fournisseurs',component:ListFournisseurComponent},
  {path:'fournisseur',component:AddFournisseurComponent},
  {path:'categories',component:ListCategorieComponent},
  {path:'categorie',component:AddCategorieComponent},
  {path:'scategories',component:ListScategorieComponent},
  {path:'scategorie',component:AddScategorieComponent},
  {path:'departements',component:ListDepartementComponent},
  {path:'departement',component:AddDepartementComponent},
  {path:'employes',component:ListEmployeComponent},
  {path:'employe',component:AddEmployeComponent},
  {path:'sortie',component:AddSortieComponent},
  {path:'sorties',component:ListSortieComponent},
  {path:'inventaire',component:AddInventaireComponent},
  {path:'inventaires',component:ListInventaireComponent},
  {path:'linventaires',component:ListLinventaireComponent},
  {path:'entre',component:AddEntreComponent},
  {path:'entres',component:ListEntreComponent},
  {path:'lentres',component:ListDetailsoperationComponent},
  {path:'consult',component:ConsultComponent},
  {path:'consults',component:ConsultsComponent},

  ]
  }

];
@NgModule({
  declarations: [
    AppComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    ListScategorieComponent,
    AddScategorieComponent,
    AddArticleComponent,
    ListArticleComponent,
    MenuComponent,
    AddDepartementComponent,
    ListDepartementComponent,
    AddEmployeComponent,
    ListEmployeComponent,
    AddDetailsoperationComponent,
    ListDetailsoperationComponent,
    AddEntreComponent,
    ListEntreComponent,
    AddFournisseurComponent,
    ListFournisseurComponent,
    AddInventaireComponent,
    ListInventaireComponent,
    ListLinventaireComponent,
    AddLinventaireComponent,
    AddDetailsComponent,
    ListDetailsComponent,
    ListSortieComponent,
    AddSortieComponent,
    LoginComponent,
    ConfirmDialogComponent,
    FilterPipe,
    ConsultComponent,
    ConsultsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatIconModule,

 
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
