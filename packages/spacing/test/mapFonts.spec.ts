import { style } from '@vanilla-extract/css';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ResponsiveFont } from '../dist';
import { CSSVarFunction } from '../src/defineSpacingStyles';
import { mapFonts } from '../src/mapFonts';
import { config } from './spacing.config';

let i = 1;
let j = 1;

// Mock dependencies
vi.mock('@vanilla-extract/css', () => ({
  createVar: vi.fn(() => {
    return 'mock-var-' + i++;
  }),
  style: vi.fn(() => 'mock-class' + j++),
}));

vi.mock('./getFluidSize', () => ({
  getFactorizedFluidSize: vi.fn().mockReturnValue('mock-fluid-size'),
}));

describe('mapFonts', () => {
  const mockFluidFactorSecondOrder = 'var(--fluid-factor)' as CSSVarFunction;

  const mockFont: ResponsiveFont<string> = {
    name: 'test-font',
    fontSize: '16',
    lineHeight: '24',
    capHeightTrim: '-0.1em',
    baselineTrim: '-0.2em',
    viewports: {
      default: {
        minCapHeight: '16',
        maxCapHeight: '24',
      },
      md: {
        minCapHeight: '18',
        maxCapHeight: '28',
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create CSS variables for font sizes', () => {
    const { globalStyle } = mapFonts({
      config: config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      font: mockFont,
    });

    expect(globalStyle.vars).toEqual({
      'mock-var-1': '16',
      'mock-var-2': '24',
      'mock-var-3':
        'calc(((mock-var-1 * 1rem) + ((mock-var-2 - mock-var-1) * var(--fluid-factor))) * 1.3744958333)',
    });
  });

  it('should create font size class with correct properties', () => {
    mapFonts({
      config: config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      font: mockFont,
    });

    expect(style).toHaveBeenCalledWith(
      expect.objectContaining({
        fontSize: expect.stringContaining('clamp'),
        lineHeight: expect.any(String),
        selectors: expect.objectContaining({
          '&::before': expect.any(Object),
          '&::after': expect.any(Object),
        }),
      })
    );
  });

  it('should handle multiple viewports correctly', () => {
    const { fontSizeClasses } = mapFonts({
      config: config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      font: mockFont,
    });

    expect(Object.keys(fontSizeClasses)).toContain(mockFont.name);
  });

  it('should calculate correct line height ratio', () => {
    mapFonts({
      config: config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      font: mockFont,
    });

    const styleCall = (style as any).mock.calls[0][0];
    expect(styleCall.lineHeight).toBe('calc(24 / 16)');
  });

  it('should apply correct trimming values', () => {
    mapFonts({
      config: config,
      fluidFactorSecondOrder: mockFluidFactorSecondOrder,
      font: mockFont,
    });

    const styleCall = (style as any).mock.calls[0][0];
    expect(styleCall.selectors['&::before'].marginBottom).toBe('-0.1em');
    expect(styleCall.selectors['&::after'].marginTop).toBe('-0.2em');
  });
});
