 import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { HomeComponent } from './home';
 import { StudentsModule } from '../students/students-module';
 import { StudentService } from '../core/student';
 describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let service: StudentService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsModule],
      declarations: [HomeComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(StudentService);
    fixture.detectChanges();
  });
  it('should load students on init', () => {
    expect(component.students.length).toBeGreaterThan(0);
  });
  it('should add a new student via child event', () => {
    component.onCreate({ name: 'Frank', track: 'DevOps', active: true });
    expect(component.students.some(s => s.name === 'Frank')).toBeTrue();
  });
  it('should toggle student active state', () => {
    const [first] = service.list();
    component.onToggleActive(first.id);
    const updated = component.students.find(s => s.id === first.id);
    expect(updated?.active).toBe(!first.active);
    });
 });