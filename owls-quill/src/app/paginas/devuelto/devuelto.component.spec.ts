import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevueltoComponent } from './devuelto.component';

describe('DevueltoComponent', () => {
  let component: DevueltoComponent;
  let fixture: ComponentFixture<DevueltoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevueltoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevueltoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
