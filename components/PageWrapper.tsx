import React from 'react';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-32 md:pt-40 min-h-screen bg-gray-50">
    {children}
  </div>
);

export default PageWrapper;
