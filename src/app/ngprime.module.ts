import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {DialogModule} from 'primeng/dialog';
// import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  exports: [
    ButtonModule,
    DialogModule,
    PasswordModule,
    PanelModule,
    InputTextModule,
    CardModule,    
    TableModule,
    ToolbarModule,
    MessageModule,
    MessagesModule,
    // DynamicDialogModule,
    // 
    
    
  ]
})
export class NgprimeModule { }
