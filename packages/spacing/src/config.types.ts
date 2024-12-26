export type SpacingViewport = {
  minSpacing: string;
  maxSpacing: string;
};

export type Spacing<TMediaQueryKey extends string> = {
  name: string;
  viewports: Record<TMediaQueryKey | 'default', SpacingViewport>;
};

export type ResponsiveFontViewport = {
  minCapHeight: string;
  maxCapHeight: string;
};

export type ResponsiveFont<TMediaQueryKey extends string> = {
  name: string;
  viewports: Record<TMediaQueryKey | 'default', ResponsiveFontViewport>;
  fontSize: string;
  lineHeight: string;
  capHeightTrim: string;
  baselineTrim: string;
};

export type DefaultResponsiveFont = {
  name: string;
  // minCapHeight: string;
  // maxCapHeight: string;
  fontSize: string;
  lineHeight: string;
  capHeightTrim: string;
  baselineTrim: string;
};

export type DefaultViewport = {
  minViewportWidth: string;
  maxViewportWidth: string;
  minDefaultSize: string;
  maxDefaultSize: string;
};

export interface Viewport extends Omit<DefaultViewport, 'defaultSpacingName'> {
  query: string;
}

export type Config<TMediaQueryKey extends string> = {
  fontSizeToCapHeightRatio: number;
  defaultViewport: DefaultViewport;
  viewports: Record<TMediaQueryKey, Viewport>;
  defaultSpacingName: string;
  spacings: Spacing<TMediaQueryKey>[];
  defaultFont: DefaultResponsiveFont;
  fonts: ResponsiveFont<TMediaQueryKey>[];
};
