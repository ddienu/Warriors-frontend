import { ComponentFixture, TestBed } from '@angular/core/testing';
import WarriorsComponent from './warriors.component';



describe('WarriorsComponent', () => {
  let component: WarriorsComponent;
  let fixture: ComponentFixture<WarriorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarriorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarriorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
