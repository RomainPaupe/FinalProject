import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenPageComponent } from './top-ten-page.component';

describe('TopTenPageComponent', () => {
  let component: TopTenPageComponent;
  let fixture: ComponentFixture<TopTenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTenPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
