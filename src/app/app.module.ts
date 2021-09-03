import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ChannelMoveEventsDirective } from './directives/channelMoveEvents.directive';
import { BoardEventsDirective } from './directives/boardEvents.directive';
import { TopBarComponent } from './components/topBar/topBar.component';
import { ChannelSelectorComponent } from './components/channelSelector/channelSelector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CredSelectorComponent } from './components/credSelector/credSelector.component';

const materialModules = [
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
]

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BoardComponent,
    LoadingComponent,
    ChannelComponent,
    ChannelMoveEventsDirective,
    BoardEventsDirective,
    ChannelSelectorComponent,
    CredSelectorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ColorPickerModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
