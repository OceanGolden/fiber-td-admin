import { useRoutes } from 'react-router-dom';

import { defaultRoutes } from '@/router';

const PublicRoutes = () => useRoutes([...defaultRoutes]);

export default PublicRoutes;
