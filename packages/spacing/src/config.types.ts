type SpacingViewport = {
  minSpacing: string;
  maxSpacing: string;
};

type Spacing<T extends string> = {
  name: string;
  viewports: Record<T | 'default', SpacingViewport>;
};

type ResponsiveFontViewport = {
  minCapHeight: string;
  maxCapHeight: string;
};

type ResponsiveFont<T extends string> = {
  name: string;
  viewports: Record<T | 'default', ResponsiveFontViewport>;
  lineHeight: string;
  capHeightTrim: string;
  baselineTrim: string;
};

type DefaultResponsiveFont = {
  name: string;
  minCapHeight: string;
  maxCapHeight: string;
  lineHeight: string;
  capHeightTrim: string;
  baselineTrim: string;
};

interface DefaultViewport {
  minViewportWidth: string;
  maxViewportWidth: string;
  minDefaultSize: string;
  maxDefaultSize: string;
}

interface Viewport extends Omit<DefaultViewport, 'defaultSpacingName'> {
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
