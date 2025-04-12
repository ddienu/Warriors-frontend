import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBasicsComponent } from './edit-basics.component';

describe('EditBasicsComponent', () => {
  let component: EditBasicsComponent;
  let fixture: ComponentFixture<EditBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBasicsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
