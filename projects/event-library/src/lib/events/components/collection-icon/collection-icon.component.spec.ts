import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionIconComponent } from './collection-icon.component';

describe('CollectionIconComponent', () => {
  let component: CollectionIconComponent;
  let fixture: ComponentFixture<CollectionIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
