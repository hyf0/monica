import React, { Suspense } from 'react';
// import { useSelector } from 'react-redux';
// import { useHasBeenTrued } from '../../hooks';

const LazyAccountManagerContainer = React.lazy(() => import('../../containers/AccountManagerContainer'));


export default function AccountPage() {
  return (
    <Suspense fallback={null}>
      <LazyAccountManagerContainer />
    </Suspense>

  );
}
