import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSelectorComponent } from './link-selector.component';

describe('LinkSelectorComponent', () => {
  let component: LinkSelectorComponent;
  let fixture: ComponentFixture<LinkSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
