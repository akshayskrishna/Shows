import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EpisodesListPage } from './episodes-list.page';

describe('EpisodesListPage', () => {
  let component: EpisodesListPage;
  let fixture: ComponentFixture<EpisodesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
