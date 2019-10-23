import React from 'react';
import './index.scss';
import Notifications from '../../component/Notifications';
export default function BasicLayout({ children }: { children: any }) {
  return (
    <div className="basic-layout">
      <div className="basic-layout-content">{children}</div>
      <Notifications />
    </div>
  );
}
