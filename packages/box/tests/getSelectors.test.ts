import { getSelectors } from '../src/getSelectors';
import { describe, expect, it } from 'vitest';

describe('getSelectors', () => {
  it('should return the correct selectors and vars for given spacing scale', () => {
    const spacingScale = {
      small: '10px',
      medium: '20px',
      large: '30px',
      'extra-large': '40px',
      'extra-extra-large': '50px',
    };
    const boxPaddingDensityModifier = 'a';
    const boxPaddingFar = 'var(--box-padding-far)';
    const boxPaddingNear = 'var(--box-padding-near)';

    const result = getSelectors(
      spacingScale,
      boxPaddingDensityModifier,
      boxPaddingFar,
      boxPaddingNear
    );

    expect(result).toEqual({
      selectors: {
        'a a a.&': {
          vars: {
            'var(--box-padding-far)': '20px',
            'var(--box-padding-near)': '10px',
          },
        },
        'a a.&': {
          vars: {
            'var(--box-padding-far)': '30px',
            'var(--box-padding-near)': '20px',
          },
        },
        'a.&': {
          vars: {
            'var(--box-padding-far)': '40px',
            'var(--box-padding-near)': '30px',
          },
        },
      },
    });
  });

  it('should handle spacing scale with single element correctly', () => {
    const spacingScale = {
      small: '10px',
    };
    const boxPaddingDensityModifier = 'b';
    const boxPaddingFar = 'var(--box-padding-far)';
    const boxPaddingNear = 'var(--box-padding-near)';

    const result = getSelectors(
      spacingScale,
      boxPaddingDensityModifier,
      boxPaddingFar,
      boxPaddingNear
    );

    expect(result).toEqual({ selectors: {} });
  });

  it('should handle empty spacing scale correctly', () => {
    const spacingScale = {};
    const boxPaddingDensityModifier = 'c';
    const boxPaddingFar = 'var(--box-padding-far)';
    const boxPaddingNear = 'var(--box-padding-near)';

    const result = getSelectors(
      spacingScale,
      boxPaddingDensityModifier,
      boxPaddingFar,
      boxPaddingNear
    );

    expect(result).toEqual({ selectors: {} });
  });
});
