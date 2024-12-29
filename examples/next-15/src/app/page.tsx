import { spacing } from './spacing.css';

export default function Home() {
  return (
    <main style={{ padding: spacing.spacingVariableMap.large }}>
      <h1 className={spacing.spacingFontSizeClasses.heading1}>Main Title</h1>
      <p className={spacing.spacingFontSizeClasses.base}>
        This page should have some padding around its content.
      </p>
    </main>
  );
}
