import { UnixPipe } from './unix.pipe';

describe('UnixPipe', () => {
  it('create an instance', () => {
    const pipe = new UnixPipe();
    expect(pipe).toBeTruthy();
  });
});
