import { extractAtomsFromProps, type SprinklesFnBase } from '@muffin-tin/core';
import { type ReactNode } from 'react';

import { composeClassNames } from '@muffin-tin/core';

interface WithSwitcherParams<TProps, TSprinklesFn extends SprinklesFnBase> {
  Component: (props: TProps) => ReactNode;
  switcherBaseStyles: string;
  switcherSprinkles: TSprinklesFn;
  hasClassNameProp?: boolean;
  displayName?: string;
}

type WithSwitcherPropsWithoutSprinkles<
  TProps,
  TSprinklesFn extends SprinklesFnBase
> = Omit<TProps, Parameters<TSprinklesFn>[0]>;

export type WithSwitcherProps<
  TProps,
  TSprinklesFn extends SprinklesFnBase
> = WithSwitcherPropsWithoutSprinkles<TProps, TSprinklesFn> &
  Parameters<TSprinklesFn>[0];

export function withSwitcher<TProps, TSprinklesFn extends SprinklesFnBase>({
  Component,
  switcherBaseStyles,
  switcherSprinkles,
  hasClassNameProp,
  displayName,
}: WithSwitcherParams<TProps, TSprinklesFn>) {
  const WithSwitcherComponent = (
    props: WithSwitcherProps<TProps, TSprinklesFn>
  ) => {
    const { sprinkleProps, otherProps } = extractAtomsFromProps<
      WithSwitcherPropsWithoutSprinkles<TProps, TSprinklesFn>,
      Parameters<TSprinklesFn>[0]
    >(props, [switcherSprinkles]);

    return (
      <Component
        {...(otherProps as TProps)}
        className={composeClassNames(
          switcherBaseStyles,
          switcherSprinkles(sprinkleProps),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          hasClassNameProp ? (otherProps as any).className : undefined
        )}
      ></Component>
    );
  };

  WithSwitcherComponent.displayName = `withStack(${
    displayName ||
    (
      Component as {
        displayName?: string;
      }
    ).displayName
  })`;

  return WithSwitcherComponent;
}
