import { ComponentFixture, TestBed } from '@angular/core/testing';
import CreateWarriorComponent from './create-warrior.component';



describe('CreateWarriorComponent', () => {
  let component: CreateWarriorComponent;
  let fixture: ComponentFixture<CreateWarriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWarriorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWarriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
