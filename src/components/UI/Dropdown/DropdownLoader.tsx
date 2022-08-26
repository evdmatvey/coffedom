import React from 'react';
import ContentLoader from 'react-content-loader';

interface DropdownSkeletonProps {
  lg?: boolean;
}

const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({ lg }) => (
  <ContentLoader
    speed={2}
    width={lg ? 330 : 270}
    height={40}
    viewBox="0 0 330 40"
    backgroundColor="#3e3e3e"
    foregroundColor="#444444">
    <rect x="0" y="0" rx="11" ry="11" width="330" height="40" />
  </ContentLoader>
);

export default DropdownSkeleton;
