import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin({ identifiers: 'debug' });

const nextConfig: NextConfig = {
  /* config options here */
  // transpilePackages: ['@butter-cream/spacing'],
};

export default withVanillaExtract(nextConfig);
