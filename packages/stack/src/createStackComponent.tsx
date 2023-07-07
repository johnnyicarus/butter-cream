import { forwardRef, ForwardRefExoticComponent } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { extractAtomsFromProps } from '@muffin-tin/components';

import { composeClassNames } from '../../core/src/composeClassNames';
import { SprinklesFnBase } from '../../core/src/SprinklesFnBase';
import { SpaceProp } from './SpaceProp';
import { getSpacingVars } from './getSpacingVars';

export type StackProps<
  Sprinkles,
  MediaQueryKeys extends string,
  SpacingScaleKeys extends string | number,
  BaseComponentProps,
> = {
  space?: SpaceProp<MediaQueryKeys, SpacingScaleKeys>;
  splitAfter?: number;
  className?: string;
} & Sprinkles &
  BaseComponentProps;

interface CreateStackComponentProps<
  SprinklesFn extends SprinklesFnBase,
  MediaQueryKeys extends string,
  SpacingScaleKeys extends string | number,
  BaseComponentProps,
> {
  BaseComponent: ForwardRefExoticComponent<BaseComponentProps>;
  stackSpacingScale: Record<SpacingScaleKeys, string>;
  stackSplitMap: Record<number, string>;
  stackSprinkles: SprinklesFn;
  stackStyles: string;
  stackVarMap: Record<MediaQueryKeys, string>;
}

export function createStackComponent<
  SprinklesFn extends SprinklesFnBase,
  MediaQueryKeys extends string,
  SpacingScaleKeys extends string | number,
  BaseComponentProps,
>({
  BaseComponent,
  stackSpacingScale,
  stackSplitMap,
  stackSprinkles,
  stackStyles,
  stackVarMap,
}: CreateStackComponentProps<
  SprinklesFn,
  MediaQueryKeys,
  SpacingScaleKeys,
  BaseComponentProps
>) {
  const Stack = forwardRef(
    (
      {
        className,
        space,
        splitAfter,
        ...rest
      }: StackProps<
        Parameters<typeof stackSprinkles>[0],
        MediaQueryKeys,
        SpacingScaleKeys,
        BaseComponentProps
      >,
      ref,
    ) => {
      type Sprinkles = Parameters<typeof stackSprinkles>[0];
      type Rest = Omit<
        BaseComponentProps,
        'space' | 'splitAfter' | 'className'
      >;
      const { sprinkleProps, otherProps } = extractAtomsFromProps<
        Rest,
        Sprinkles
      >(rest, [stackSprinkles]);

      return (
        <BaseComponent
          ref={ref}
          className={composeClassNames(
            stackStyles,
            splitAfter ? stackSplitMap[splitAfter] : undefined,
            stackSprinkles(sprinkleProps),
            className,
          )}
          style={{
            ...assignInlineVars(
              getSpacingVars<MediaQueryKeys, SpacingScaleKeys>({
                vars: stackVarMap,
                prop: space,
                spacingScale: stackSpacingScale,
              }),
            ),
          }}
          {...(otherProps as BaseComponentProps)}
        />
      );
    },
  );

  return Stack;
}
