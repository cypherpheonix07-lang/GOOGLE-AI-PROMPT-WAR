import { getNextStatus, getPrevStatus } from './taskUtils';

describe('Task Status Logic', () => {
  test('should transition from To Do to In Progress', () => {
    expect(getNextStatus('To Do')).toBe('In Progress');
  });

  test('should transition from In Progress to Done', () => {
    expect(getNextStatus('In Progress')).toBe('Done');
  });

  test('should transition back from Done to In Progress', () => {
    expect(getPrevStatus('Done')).toBe('In Progress');
  });
});
