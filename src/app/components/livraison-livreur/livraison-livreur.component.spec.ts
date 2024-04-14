import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonLivreurComponent } from './livraison-livreur.component';

describe('LivraisonLivreurComponent', () => {
  let component: LivraisonLivreurComponent;
  let fixture: ComponentFixture<LivraisonLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonLivreurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivraisonLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
