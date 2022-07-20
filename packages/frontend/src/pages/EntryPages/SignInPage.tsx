import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { EntryPageWrapper } from './EntryPageWrapper';

import { MuiPasswordTextField } from '../../components/MuiPasswordTextField';

import { useUser } from '../../hooks/useUser';
import { isApiError } from '../../lib/api-error';
import { INDEX_PATH, SIGN_UP_PATH } from '../../lib/paths';

import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';

const formSchema = object({
  login: string().required('Login is required.'),
  password: string().required('Password is required.'),
});

type FormValues = InferType<typeof formSchema>;

export const SignInPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const [signInError, setSignInError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginMutation } = useUser();

  const onSubmit: SubmitHandler<FormValues> = data => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(INDEX_PATH);
      },
      onError: err => {
        if (isApiError(err)) {
          setSignInError(err.response.data.message);
        }
      },
    });
  };

  return (
    <EntryPageWrapper title="Sign In" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username or email"
        margin="dense"
        required
        fullWidth
        error={!!errors.login}
        helperText={errors.login?.message}
        {...register('login')}
      />
      <MuiPasswordTextField
        label="Password"
        margin="dense"
        required
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')}
      />
      {signInError && (
        <Typography variant="body2" sx={{ color: '#d32f2f', mt: 1 }}>
          {signInError}
        </Typography>
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign In
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Link variant="body2" component={RouterLink} to={SIGN_UP_PATH}>
          {"Don't have an account? Sign Up"}
        </Link>
      </Box>
    </EntryPageWrapper>
  );
};
