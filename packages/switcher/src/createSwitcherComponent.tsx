import { forwardRef, ForwardRefExoticComponent } from 'react';
import { extractAtomsFromProps, type SprinklesFnBase } from '@muffin-tin/core';

export type SwitcherProps<Sprinkles> = {
  //   threshold: string[];
  //   limit: number[];
} & Sprinkles;

interface CreateSwitcherComponentProps<
  BaseComponentProps,
  SprinklesFn extends SprinklesFnBase,
> {
  BaseComponent: ForwardRefExoticComponent<BaseComponentProps>;
  switcherBaseStyles: string;
  switcherSprinkles: SprinklesFn;
}

export function createSwitcherComponent<
  BaseComponentProps,
  SprinklesFn extends SprinklesFnBase,
>({
  BaseComponent,
  switcherBaseStyles,
  switcherSprinkles,
}: CreateSwitcherComponentProps<BaseComponentProps, SprinklesFn>) {
  const Switcher = forwardRef(
    (props: SwitcherProps<typeof switcherSprinkles>, ref) => {
      type Sprinkles = Parameters<typeof switcherSprinkles>[0];
      type Rest = Omit<BaseComponentProps, 'space' | 'splitAfter'>;
      const { sprinkleProps, otherProps } = extractAtomsFromProps<
        Rest,
        Sprinkles
      >(rest, [switcherSprinkles]);

      return <BaseComponent ref={ref} className={}></BaseComponent>;
    },
  );

  return Switcher;
}
