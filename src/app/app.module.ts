import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ChannelMoveEventsDirective } from './directives/channelMoveEvents.directive';
import { BoardEventsDirective } from './directives/boardEvents.directive';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    BoardComponent,
    LoadingComponent,
    ChannelComponent,
    ChannelMoveEventsDirective,
    BoardEventsDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
