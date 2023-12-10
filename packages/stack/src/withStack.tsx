import type { ReactNode } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { extractAtomsFromProps, type SprinklesFnBase } from '@muffin-tin/core';

import { composeClassNames } from '../../core/src/composeClassNames';
import type { SpaceProp } from './SpaceProp';
import { getSpacingVars } from './getSpacingVars';

interface CreateStackComponentParams<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> {
  Component: (props: TProps) => ReactNode;
  stackSpacingScale: Record<TSpacingScaleKeys, string>;
  stackSplitMap: Record<number, string>;
  stackSprinkles: TSprinklesFn;
  stackStyles: string;
  stackVarMap: Record<TMediaQueryKeys, string>;
  hasClassNameProp?: boolean;
  displayName?: string;
}

type StackFeatureProps<
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> = {
  space?: SpaceProp<TMediaQueryKeys, TSpacingScaleKeys>;
  splitAfter?: number;
  className?: string;
};

type StackPropsWithoutSprinkles<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> = StackFeatureProps<TMediaQueryKeys, TSpacingScaleKeys> &
  Omit<TProps, Parameters<TSprinklesFn>[0]>;

export type WithStackProps<
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> = StackPropsWithoutSprinkles<
  TProps,
  TSprinklesFn,
  TMediaQueryKeys,
  TSpacingScaleKeys
> &
  Parameters<TSprinklesFn>[0];

export const withStack = <
  TProps,
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
>({
  Component,
  stackSpacingScale,
  stackSplitMap,
  stackSprinkles,
  stackStyles,
  stackVarMap,
  hasClassNameProp,
  displayName,
}: CreateStackComponentParams<
  TProps,
  TSprinklesFn,
  TMediaQueryKeys,
  TSpacingScaleKeys
>): ((
  props: WithStackProps<
    TProps,
    TSprinklesFn,
    TMediaQueryKeys,
    TSpacingScaleKeys
  >,
) => ReactNode) => {
  const WithStackComponent = (
    props: WithStackProps<
      TProps,
      TSprinklesFn,
      TMediaQueryKeys,
      TSpacingScaleKeys
    >,
  ) => {
    const { sprinkleProps, otherProps } = extractAtomsFromProps<
      StackPropsWithoutSprinkles<
        TProps,
        TSprinklesFn,
        TMediaQueryKeys,
        TSpacingScaleKeys
      >,
      Parameters<TSprinklesFn>[0]
    >(props, [stackSprinkles]);
    const { space, splitAfter, ...rest } = otherProps;

    return (
      <Component
        {...(rest as TProps)}
        className={composeClassNames(
          stackStyles,
          splitAfter ? stackSplitMap[splitAfter] : undefined,
          stackSprinkles(sprinkleProps),
          hasClassNameProp ? (otherProps as any).className : undefined,
        )}
        style={{
          ...assignInlineVars(
            getSpacingVars<TMediaQueryKeys, TSpacingScaleKeys>({
              vars: stackVarMap,
              prop: space,
              spacingScale: stackSpacingScale,
            }),
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
