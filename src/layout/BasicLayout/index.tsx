import React from 'react';
import './index.scss';
export default function BasicLayout({ children }: { children: any }) {
  return (
    <div className="basic-layout">
      {children}
    </div>
  );
}
