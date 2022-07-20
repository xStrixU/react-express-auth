import type { UserDto } from '@react-express-auth/common';

export const UserDetails = ({ user }: { readonly user: UserDto }) => (
  <>
    <p>
      <strong>firstName</strong>: <em>{user.firstName}</em>
    </p>
    <p>
      <strong>lastName</strong>: <em>{user.lastName}</em>
    </p>
    <p>
      <strong>username</strong>: <em>{user.username}</em>
    </p>
    <p>
      <strong>email</strong>: <em>{user.email}</em>
    </p>
    <p>
      <strong>roles</strong>: <em>{user.roles.join(', ')}</em>
    </p>
  </>
);
