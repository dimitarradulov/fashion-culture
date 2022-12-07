import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSucessComponent } from './checkout-sucess.component';

describe('CheckoutSucessComponent', () => {
  let component: CheckoutSucessComponent;
  let fixture: ComponentFixture<CheckoutSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSucessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
