import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPowersComponent } from './edit-powers.component';

describe('EditPowersComponent', () => {
  let component: EditPowersComponent;
  let fixture: ComponentFixture<EditPowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPowersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
