import { FunctionComponent, ReactNode } from 'react';
import MUIButton, { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export interface ButtonProps
  extends Omit<MUIButtonProps, 'variant' | 'disableElevation' | 'size'> {
  children: ReactNode;
  size?: 'small' | 'default';
}

const spacing = (size: 'small' | 'default') => ({
  py: 0.5,
  px: size === 'small' ? 1 : 2,
});

const Button: FunctionComponent<ButtonProps> = ({
  children,
  sx,
  size,
  ...props
}) => (
  <MUIButton
    variant="contained"
    sx={{ ...sx, textTransform: 'none', ...spacing(size || 'default') }}
    disableElevation
    {...props}>
    {children}
  </MUIButton>
);

export default Button;
