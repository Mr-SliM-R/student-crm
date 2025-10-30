import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { FormsModule } from '@angular/forms';
 import { AddStudentComponent } from './add-student';
 describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddStudentComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should emit create event on submit', () => {
    spyOn(component.create, 'emit');
    component.name = 'Dana';
    component.track = 'Data';
    component.active = false;
    component.submit();
    expect(component.create.emit).toHaveBeenCalledWith({
      name: 'Dana',
      track: 'Data',
      active: false
    });
    expect(component.name).toBe('');
    expect(component.active).toBeTrue();
  });
  it('should ignore blank names', () => {
    spyOn(component.create, 'emit');
    component.name = '   ';
     component.submit();
    expect(component.create.emit).not.toHaveBeenCalled();
  });
 });
