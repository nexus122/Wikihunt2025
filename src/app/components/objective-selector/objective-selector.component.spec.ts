import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveSelectorComponent } from './objective-selector.component';

describe('ObjectiveSelectorComponent', () => {
  let component: ObjectiveSelectorComponent;
  let fixture: ComponentFixture<ObjectiveSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectiveSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectiveSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
