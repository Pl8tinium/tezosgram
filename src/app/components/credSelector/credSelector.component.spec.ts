import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredSelectorComponent } from './cred-selector.component';

describe('CredSelectorComponent', () => {
  let component: CredSelectorComponent;
  let fixture: ComponentFixture<CredSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
