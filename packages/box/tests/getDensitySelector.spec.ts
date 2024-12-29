import { getDensitySelector } from '../src/getDensitySelector';

import { describe, expect, it } from 'vitest';

describe('getDensitySelector', () => {
  it('should return the correct selector for index 0 and modifier "a"', () => {
    const result = getDensitySelector(0, 'a');
    expect(result).toBe('a.&');
  });

  it('should return the correct selector for index 2 and modifier "b"', () => {
    const result = getDensitySelector(2, 'b');
    expect(result).toBe('b b b.&');
  });

  it('should return the correct selector for index 3 and modifier "c"', () => {
    const result = getDensitySelector(3, 'c');
    expect(result).toBe('c c c c.&');
  });

  it('should return an empty string followed by ".&" for negative index', () => {
    const result = getDensitySelector(-1, 'd');
    expect(result).toBe('.&');
  });

  it('should return ".&" for empty modifier', () => {
    const result = getDensitySelector(1, '');
    expect(result).toBe(' .&');
  });
});
