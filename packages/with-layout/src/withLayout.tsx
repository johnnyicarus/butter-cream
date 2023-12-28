import { type SpaceProp, getSpacingVars } from '@butter-cream/stack';
import { extractAtomsFromProps, fixedForwardRef } from '@muffin-tin/core';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { type ReactNode, type Ref } from 'react';

import type { SprinklesFnBase, WithHocOptions } from '@muffin-tin/core';

type WithLayoutPropsWithoutSprinklesBox<
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase
> = Omit<TProps, 'asLayout' | keyof Parameters<TBoxSprinklesFn>[0]>;

type WithLayoutPropsWithoutSprinklesFlex<
  TProps,
  TFlexSprinklesFn extends SprinklesFnBase
> = Omit<TProps, 'asLayout' | keyof Parameters<TFlexSprinklesFn>[0]>;

type WithLayoutPropsWithoutSprinklesStack<
  TProps,
  TStackSprinklesFn extends SprinklesFnBase
> = Omit<TProps, 'asLayout' | keyof Parameters<TStackSprinklesFn>[0]>;

type WithLayoutPropsWithoutSprinkles<
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase,
  TFlexSprinklesFn extends SprinklesFnBase,
  TStackSprinklesFn extends SprinklesFnBase
> =
  | WithLayoutPropsWithoutSprinklesBox<TProps, TBoxSprinklesFn>
  | WithLayoutPropsWithoutSprinklesFlex<TProps, TFlexSprinklesFn>
  | WithLayoutPropsWithoutSprinklesStack<TProps, TStackSprinklesFn>;

type WithLayoutPropsBox<
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase
> = WithLayoutPropsWithoutSprinklesBox<TProps, TBoxSprinklesFn> & {
  asLayout?: 'box';
} & Parameters<TBoxSprinklesFn>[0];

type WithLayoutPropsFlex<
  TProps,
  TFlexSprinklesFn extends SprinklesFnBase
> = WithLayoutPropsWithoutSprinklesFlex<TProps, TFlexSprinklesFn> & {
  asLayout: 'flex';
} & Parameters<TFlexSprinklesFn>[0];

// TODO Generalise stack implementation of stack
type WithLayoutPropsStack<
  TProps,
  TStackSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number
> = WithLayoutPropsWithoutSprinklesStack<TProps, TStackSprinklesFn> & {
  asLayout: 'stack';
  space?: SpaceProp<TMediaQueryKeys, TSpacingScaleKeys>;
  splitAfter?: number;
} & Parameters<TStackSprinklesFn>[0];

export type WithLayoutProps<
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase,
  TFlexSprinklesFn extends SprinklesFnBase,
  TStackSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number
> =
  | WithLayoutPropsBox<TProps, TBoxSprinklesFn>
  | WithLayoutPropsFlex<TProps, TFlexSprinklesFn>
  | WithLayoutPropsStack<
      TProps,
      TStackSprinklesFn,
      TMediaQueryKeys,
      TSpacingScaleKeys
    >;

type WithLayoutParams<
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase,
  TFlexSprinklesFn extends SprinklesFnBase,
  TStackSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number
> = {
  Component: (props: TProps) => ReactNode;
  boxSprinkles: TBoxSprinklesFn;
  flexBaseStyles: string;
  flexSprinkles: TFlexSprinklesFn;
  stackSprinkles: TStackSprinklesFn;
  stackSpacingScale: Record<TSpacingScaleKeys, string>;
  stackSplitMap: Record<number, string>;
  stackBaseStyles: string;
  stackVarMap: Record<TMediaQueryKeys, string>;
} & WithHocOptions;

export const withLayout = <
  TProps,
  TBoxSprinklesFn extends SprinklesFnBase,
  TFlexSprinklesFn extends SprinklesFnBase,
  TStackSprinklesFn extends SprinklesFnBase,
  TMediaQueryKeys extends string,
  TSpacingScaleKeys extends string | number,
  TRef
>({
  Component,
  boxSprinkles,
  flexBaseStyles,
  flexSprinkles,
  stackSprinkles,
  stackBaseStyles,
  stackSplitMap,
  stackSpacingScale,
  stackVarMap,
  displayName,
  defaultClassName,
  hasClassNameProp,
}: WithLayoutParams<
  TProps,
  TBoxSprinklesFn,
  TFlexSprinklesFn,
  TStackSprinklesFn,
  TMediaQueryKeys,
  TSpacingScaleKeys
>): ((
  props: WithLayoutProps<
    TProps,
    TBoxSprinklesFn,
    TFlexSprinklesFn,
    TStackSprinklesFn,
    TMediaQueryKeys,
    TSpacingScaleKeys
  >,
  ref: Ref<TRef>
) => ReactNode) => {
  function WithLayoutComponent(
    props: WithLayoutProps<
      TProps,
      TBoxSprinklesFn,
      TFlexSprinklesFn,
      TStackSprinklesFn,
      TMediaQueryKeys,
      TSpacingScaleKeys
    >,
    ref: Ref<TRef>
  ) {
    // const isBox = (
    //   props: WithLayoutProps<
    //     TProps,
    //     TBoxSprinklesFn,
    //     TFlexSprinklesFn,
    //     TStackSprinklesFn,
    //     TMediaQueryKeys,
    //     TSpacingScaleKeys
    //   >
    // ): props is WithLayoutPropsBox<TProps, TBoxSprinklesFn> => {
    //   // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    //   return !(props as any).asLayout || (props as any).asLayout === 'box';
    // };

    // @ts-expect-error cannot guarantee that space and rest exist
    const { asLayout = 'box', space, ...rest } = props;
    const sprinkleFnMap = {
      box: boxSprinkles,
      flex: flexSprinkles,
      stack: stackSprinkles,
    };
    // @ts-expect-error index access
    const sprinkles = sprinkleFnMap[asLayout];

    const { sprinkleProps, otherProps } = extractAtomsFromProps<
      WithLayoutPropsWithoutSprinkles<
        TProps,
        TBoxSprinklesFn,
        TFlexSprinklesFn,
        TStackSprinklesFn
      >,
      | Parameters<TBoxSprinklesFn>[0]
      | Parameters<TFlexSprinklesFn>[0]
      | Parameters<TStackSprinklesFn>[0]
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    >(rest as any, [sprinkles]); // We don't know which Sprinkles fn it is at this point

    // TODO remove duplication
    const classNameMap = {
      box: [
        defaultClassName,
        sprinkles(sprinkleProps),
        hasClassNameProp ? (otherProps as any).className : undefined,
      ],
      flex: [
        defaultClassName,
        flexBaseStyles,
        sprinkles(sprinkleProps),
        hasClassNameProp ? (otherProps as any).className : undefined,
      ],
      stack: [
        defaultClassName,
        stackBaseStyles,
        (otherProps as { splitAfter?: number }).splitAfter
          ? stackSplitMap[(otherProps as any).splitAfter]
          : undefined,
        sprinkles(sprinkleProps),
        hasClassNameProp ? (otherProps as any).className : undefined,
      ],
    };

    return (
      <Component
        {...(otherProps as TProps)}
        ref={ref}
        // @ts-expect-error index access
        className={classNameMap[asLayout].join(' ')}
        style={
          asLayout === 'stack'
            ? {
                ...assignInlineVars(
                  getSpacingVars<TMediaQueryKeys, TSpacingScaleKeys>({
                    vars: stackVarMap,
                    prop: space,
                    spacingScale: stackSpacingScale,
                  })
                ),
              }
            : {}
        }
      />
    );
  }

  WithLayoutComponent.displayName = `withLayout(${
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    displayName ||
    (
      Component as {
        displayName?: string;
      }
    ).displayName
  })`;

  return fixedForwardRef<
    TRef,
    WithLayoutProps<
      TProps,
      TBoxSprinklesFn,
      TFlexSprinklesFn,
      TStackSprinklesFn,
      TMediaQueryKeys,
      TSpacingScaleKeys
    >
  >(WithLayoutComponent);
};
