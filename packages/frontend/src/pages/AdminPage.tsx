import { Link } from 'react-router-dom';

import { INDEX_PATH } from '../lib/paths';

const AdminPage = () => (
  <>
    <h1>Admin Page</h1>
    <p>You are admin so you can see this page!</p>
    <Link to={INDEX_PATH}>Index page</Link>
  </>
);

export default AdminPage;
