import { yupResolver } from '@hookform/resolvers/yup';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
} from '@mui/material';
import status from 'http-status';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { object, ref, string } from 'yup';

import { EntryPageWrapper } from './EntryPageWrapper';

import { MuiPasswordTextField } from '../../components/MuiPasswordTextField';

import { useUser } from '../../hooks/useUser';
import { isApiError } from '../../lib/api-error';
import { SIGN_IN_PATH } from '../../lib/paths';

import { PASSWORD_REGEX } from '@react-express-auth/common';

import type { AlertColor } from '@mui/material';
import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';

const formSchema = object({
  firstName: string().required('First name is required.'),
  lastName: string().required('Last name is required.'),
  username: string().required('Username is required.'),
  email: string().email('Invalid email').required('Email is required.'),
  password: string()
    .matches(PASSWORD_REGEX, 'Password must contains at least 5 characters.')
    .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Passwords do not match.')
    .required('Confirm password is required.'),
});

type FormValues = InferType<typeof formSchema>;

const RegisterAlert = ({
  severity,
  title,
  body,
}: Readonly<{ severity: AlertColor; title: string; body: string }>) => (
  <Alert
    severity={severity}
    sx={{
      position: 'absolute',
      left: '50%',
      top: '-175px',
      transform: 'translateX(-50%)',
      width: '100%',
    }}
  >
    <AlertTitle>{title}</AlertTitle>
    {body}
  </Alert>
);

export const SignUpPage = () => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { registerMutation } = useUser();

  const onSubmit: SubmitHandler<FormValues> = data => {
    registerMutation.mutate(data, {
      onError: err => {
        if (isApiError(err)) {
          const { data: errData } = err.response;
          setErrorMessage(errData.message);

          if (errData.status === status.CONFLICT) {
            (['username', 'email'] as const).forEach(fieldName => {
              setError(fieldName, {});
            });
          }
        }
      },
    });
  };

  const ErrorAlert = registerMutation.isError && (
    <RegisterAlert severity="error" title="Error" body={errorMessage || ''} />
  );

  const RegisteredAlert = registerMutation.isSuccess && (
    <RegisterAlert
      severity="success"
      title="Success"
      body="You have been registered successfully!"
    />
  );

  return (
    <EntryPageWrapper title="Sign Up" onSubmit={handleSubmit(onSubmit)}>
      {ErrorAlert}
      {RegisteredAlert}
      <TextField
        label="First name"
        margin="dense"
        required
        fullWidth
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...register('firstName')}
      />
      <TextField
        label="Last name"
        margin="dense"
        required
        fullWidth
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        {...register('lastName')}
      />
      <TextField
        label="Username"
        margin="dense"
        required
        fullWidth
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register('username')}
      />
      <TextField
        label="Email"
        margin="dense"
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
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
      <MuiPasswordTextField
        label="Confirm password"
        margin="dense"
        required
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ height: 48, mt: 2 }}
      >
        {registerMutation.isLoading ? (
          <CircularProgress size={32} sx={{ color: 'white' }} />
        ) : (
          'Sign Up'
        )}
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Link variant="body2" component={RouterLink} to={SIGN_IN_PATH}>
          Already have an account? Sign In
        </Link>
      </Box>
    </EntryPageWrapper>
  );
};
