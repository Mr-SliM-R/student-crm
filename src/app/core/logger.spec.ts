import { LoggerService } from './logger';
 describe('LoggerService', () => {
  it('should log to console with prefix', () => {
    const svc = new LoggerService();
    spyOn(console, 'log'); 
    svc.log('Hello');
    expect(console.log).toHaveBeenCalledWith('[LOG] Hello');
  });
 });