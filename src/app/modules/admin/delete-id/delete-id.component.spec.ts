import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIdComponent } from './delete-id.component';

describe('DeleteIdComponent', () => {
  let component: DeleteIdComponent;
  let fixture: ComponentFixture<DeleteIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
