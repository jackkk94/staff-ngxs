import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoaderService } from 'src/app/modules/core/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent  {

  constructor(
    public loaderService: LoaderService
  ) { }


}
