import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCommonComponent } from './catalog-common.component';

describe('CatalogCommonComponent', () => {
  let component: CatalogCommonComponent;
  let fixture: ComponentFixture<CatalogCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
