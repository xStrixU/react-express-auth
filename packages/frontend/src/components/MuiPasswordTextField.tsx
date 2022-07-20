import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { forwardRef, useState } from 'react';

import type { TextFieldProps } from '@mui/material';

export const MuiPasswordTextField = forwardRef<
  HTMLInputElement,
  TextFieldProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      ref={ref}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

MuiPasswordTextField.displayName = 'MuiPasswordTextField';
