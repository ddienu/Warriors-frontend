import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWarriorComponent } from './type-warrior.component';

describe('TypeWarriorComponent', () => {
  let component: TypeWarriorComponent;
  let fixture: ComponentFixture<TypeWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeWarriorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeWarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
