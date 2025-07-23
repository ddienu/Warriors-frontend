import { ComponentFixture, TestBed } from '@angular/core/testing';
import IntoBattleComponent from './into-battle.component';


describe('IntoBattleComponent', () => {
  let component: IntoBattleComponent;
  let fixture: ComponentFixture<IntoBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntoBattleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntoBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
