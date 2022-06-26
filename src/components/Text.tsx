import React, { forwardRef } from 'react';

type Rainbow = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type TextProps = {
  color?: Rainbow | 'black';
};

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type Props<C extends React.ElementType, P> = PolymorphicComponentProps<C, P>;

type PolymorphicComponentPropsWithRef<C extends React.ElementType, P> = PolymorphicComponentProps<
  C,
  P
> & {
  ref?: PolymorphicRef<C>;
};

type TextComponent = <C extends React.ElementType>(
  props: PolymorphicComponentPropsWithRef<C, TextProps>
) => React.ReactElement | null;

const Text: TextComponent = forwardRef(
  <C extends React.ElementType = 'span'>(
    { as, style, color, children, ...props }: Props<C, TextProps>,
    ref?: PolymorphicRef<C>
  ) => {
    const El = as || 'span';

    const internalStyles = color ? { style: { ...style, color } } : {};
    return (
      <El {...props} {...internalStyles} ref={ref}>
        {children}
      </El>
    );
  }
);

export default Text;
