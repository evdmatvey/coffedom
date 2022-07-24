import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductCardLoader = () => (
  <ContentLoader
    rtl
    speed={2}
    width={305}
    height={480}
    viewBox="0 0 305 480"
    backgroundColor="#3e3e3e"
    foregroundColor="#444444">
    <rect x="0" y="0" rx="12" ry="12" width="305" height="200" />
    <rect x="51" y="220" rx="20" ry="20" width="200" height="30" />
    <rect x="21" y="270" rx="16" ry="16" width="265" height="120" />
    <rect x="21" y="420" rx="15" ry="15" width="160" height="40" />
    <rect x="225" y="428" rx="12" ry="12" width="60" height="30" />
  </ContentLoader>
);

export default ProductCardLoader;
