import type { ReactNode } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { extractAtomsFromProps, type SprinklesFnBase } from '@muffin-tin/core';

import { composeClassNames } from '@muffin-tin/core';
import type { SpaceProp } from './SpaceProp';
import { getSpacingVars } from './getSpacingVars';

interface WithStackParams<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> {
  Component: (props: TProps) => ReactNode;
  stackSpacingScale: Record<TSpacingScaleKey, string>;
  stackSprinkles: TSprinklesFn;
  stackBaseStyles: string;
  stackVarMap: Record<TMediaQueryKey, string>;
  hasClassNameProp?: boolean;
  displayName?: string;
}

interface StackFeatureProps<
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> {
  space?: SpaceProp<TMediaQueryKey, TSpacingScaleKey>;
  className?: string;
}

type StackPropsWithoutSprinkles<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> = StackFeatureProps<TMediaQueryKey, TSpacingScaleKey> &
  Omit<TProps, Parameters<TSprinklesFn>[0]>;

export type WithStackProps<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
> = StackPropsWithoutSprinkles<
  TProps,
  TSprinklesFn,
  TMediaQueryKey,
  TSpacingScaleKey
> &
  Parameters<TSprinklesFn>[0];

export const withStack = <
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKey extends string,
  TSpacingScaleKey extends string | number
>({
  Component,
  stackBaseStyles,
  stackSpacingScale,
  stackSprinkles,
  stackVarMap,
  hasClassNameProp,
  displayName,
}: WithStackParams<TProps, TSprinklesFn, TMediaQueryKey, TSpacingScaleKey>): ((
  props: WithStackProps<TProps, TSprinklesFn, TMediaQueryKey, TSpacingScaleKey>
) => ReactNode) => {
  const WithStackComponent = (
    props: WithStackProps<
      TProps,
      TSprinklesFn,
      TMediaQueryKey,
      TSpacingScaleKey
    >
  ) => {
    const { sprinkleProps, otherProps } = extractAtomsFromProps<
      StackPropsWithoutSprinkles<
        TProps,
        TSprinklesFn,
        TMediaQueryKey,
        TSpacingScaleKey
      >,
      Parameters<TSprinklesFn>[0]
    >(props, [stackSprinkles]);
    const { space, ...rest } = otherProps;

    return (
      <Component
        {...(rest as TProps)}
        className={composeClassNames(
          stackBaseStyles,
          stackSprinkles(sprinkleProps),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          hasClassNameProp ? (otherProps as any).className : undefined
        )}
        style={{
          ...assignInlineVars(
            getSpacingVars<TMediaQueryKey, TSpacingScaleKey>({
              vars: stackVarMap,
              prop: space,
              spacingScale: stackSpacingScale,
            })
          ),
        }}
      />
    );
  };

  WithStackComponent.displayName = `withStack(${
    displayName ||
    (
      Component as {
        displayName?: string;
      }
    ).displayName
  })`;

  return WithStackComponent;
};
