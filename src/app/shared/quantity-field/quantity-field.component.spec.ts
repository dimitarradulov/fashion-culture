import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityFieldComponent } from './quantity-field.component';

describe('QuantityFieldComponent', () => {
  let component: QuantityFieldComponent;
  let fixture: ComponentFixture<QuantityFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
