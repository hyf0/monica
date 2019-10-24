import React from 'react';

import BasicLayout from '../BasicLayout';
import NavBar from '../../component/NavBar';
import AsideMenu from '../../component/AsideMenu';

import './index.scss';

export default function DefaultLayout({ children }: { children: any }) {
  return (
    <BasicLayout>
      <div className="default-layout">
        <div className="default-layout-content">
          {children}
        </div>
        <NavBar />
      </div>
      <AsideMenu />
    </BasicLayout>
  );
}
