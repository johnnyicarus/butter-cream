import {
  ComponentPropsWithoutRef,
  createElement,
  ElementRef,
  ElementType,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ReactElement,
} from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { extractAtomsFromProps } from '@muffin-tin/components';

import { composeClassNames } from '../../core/src/composeClassNames';
import { SprinklesFnBase } from '../../core/src/SprinklesFnBase';
import { SpaceProp } from './SpaceProp';
import { getSpacingVars } from './getSpacingVars';

interface CreateStackComponentParams<
  TSprinklesFn extends SprinklesFnBase,
  TElement extends
    | ElementType<{
        className?: string;
      }>
    | ForwardRefExoticComponent<{ className?: string }>,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> {
  BaseComponent: TElement;
  stackSpacingScale: Record<TSpacingScaleKeys, string>;
  stackSplitMap: Record<number, string>;
  stackSprinkles: TSprinklesFn;
  stackStyles: string;
  stackVarMap: Record<TMediaQueryKeys, string>;
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
  TElement extends
    | ElementType<{
        className?: string;
      }>
    | ForwardRefExoticComponent<{ className?: string }>,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> = StackFeatureProps<TMediaQueryKeys, TSpacingScaleKeys> &
  ComponentPropsWithoutRef<TElement>;

export type StackProps<
  TSprinklesFn extends SprinklesFnBase,
  TElement extends
    | ElementType<{
        className?: string;
      }>
    | ForwardRefExoticComponent<{ className?: string }>,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
> = StackPropsWithoutSprinkles<TElement, TMediaQueryKeys, TSpacingScaleKeys> &
  Parameters<TSprinklesFn>[0];

export function createStackComponent<
  TSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
  TElement extends
    | ElementType<{
        className?: string;
      }>
    | ForwardRefExoticComponent<{ className?: string }>,
>({
  BaseComponent,
  stackSpacingScale,
  stackSplitMap,
  stackSprinkles,
  stackStyles,
  stackVarMap,
  displayName,
}: CreateStackComponentParams<
  TSprinklesFn,
  TElement,
  TMediaQueryKeys,
  TSpacingScaleKeys
>) {
  function Component(
    props: StackProps<
      TSprinklesFn,
      TElement,
      TMediaQueryKeys,
      TSpacingScaleKeys
    >,
    ref: ForwardedRef<ElementRef<TElement>>,
  ) {
    const { sprinkleProps, otherProps } = extractAtomsFromProps<
      StackPropsWithoutSprinkles<
        TElement,
        TMediaQueryKeys,
        TSpacingScaleKeys
      > & { className?: string },
      Parameters<TSprinklesFn>[0]
    >(props, [stackSprinkles]);
    const { className, space, splitAfter, ...rest } = otherProps;

    return createElement(BaseComponent, {
      ...rest,
      ref,
      className: composeClassNames(
        stackStyles,
        splitAfter ? stackSplitMap[splitAfter] : undefined,
        stackSprinkles(sprinkleProps),
        className,
      ),
      style: {
        ...assignInlineVars(
          getSpacingVars<TMediaQueryKeys, TSpacingScaleKeys>({
            vars: stackVarMap,
            prop: space,
            spacingScale: stackSpacingScale,
          }),
        ),
      },
    });
  }

  Component.displayName = displayName || 'ButterCreamStackComponent';

  return forwardRef(Component);
}
