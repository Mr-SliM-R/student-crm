 import { StudentService } from './student';
 describe('StudentService', () => {
  let service: StudentService;
  beforeEach(() => {
    service = new StudentService();
  });
  it('should list initial students', () => {
    expect(service.list().length).toBe(2);
  });
  it('should add a student with incremental id', () => {
    const result = service.add({ name: 'Charlie', track: 'DevOps', active: true });
    const added = result.find(s => s.name === 'Charlie');
    expect(added?.id).toBeGreaterThan(2);
    expect(added?.active).toBeTrue();
  });
  it('should toggle active status immutably', () => {
    const [first] = service.list();
    const toggled = service.toggleActive(first.id);
    const updated = toggled.find(s => s.id === first.id);
    expect(updated?.active).toBe(!first.active);
    // ensure a new array was returned
    expect(toggled).not.toBe(service['store']);
  });
 });