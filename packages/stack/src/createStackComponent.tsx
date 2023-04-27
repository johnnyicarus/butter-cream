import { forwardRef, ForwardRefExoticComponent } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { extractAtomsFromProps } from '@muffin-tin/components';

import { SprinklesFnBase } from '../../core/src/SprinklesFnBase';
import { SpaceProp } from './SpaceProp';
import { getSpacingVars } from './getSpacingVars';

interface CreateStackComponentProps<
  SprinklesFn extends SprinklesFnBase,
  MediaQueryKeys extends string,
  DefaultSpacingKeys extends string,
  BaseComponentProps,
> {
  BaseComponent: ForwardRefExoticComponent<BaseComponentProps>;
  stackSpacingScale: Record<DefaultSpacingKeys, string>;
  stackSplitMap: Record<number, string>;
  stackSprinkles: SprinklesFn;
  stackStyles: string;
  stackVarMap: Record<MediaQueryKeys, string>;
}

type StackProps<
  SprinklesFn extends SprinklesFnBase,
  MediaQueryKeys extends string,
  DefaultSpacingKeys extends string,
  BaseComponentProps,
> = {
  space?: SpaceProp<MediaQueryKeys, DefaultSpacingKeys>;
  splitAfter?: number;
  className?: string;
} & SprinklesFn &
  BaseComponentProps;

export function createStackComponent<
  SprinklesFn extends SprinklesFnBase,
  MediaQueryKeys extends string,
  DefaultSpacingKeys extends string,
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
  DefaultSpacingKeys,
  BaseComponentProps
>) {
  const Stack = forwardRef(
    (
      {
        space,
        splitAfter,
        ...rest
      }: StackProps<
        SprinklesFn,
        MediaQueryKeys,
        DefaultSpacingKeys,
        BaseComponentProps
      >,
      ref,
    ) => {
      type Sprinkles = Parameters<typeof stackSprinkles>[0];
      type Rest = Omit<BaseComponentProps, 'space' | 'splitAfter'>;
      const { sprinkleProps, otherProps } = extractAtomsFromProps<
        Rest,
        Sprinkles
      >(rest, [stackSprinkles]);

      return (
        <BaseComponent
          ref={ref}
          className={`${stackStyles} ${
            splitAfter ? stackSplitMap[splitAfter] : undefined
          } ${stackSprinkles(sprinkleProps)}`}
          style={{
            ...assignInlineVars(
              getSpacingVars<MediaQueryKeys, DefaultSpacingKeys>({
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
