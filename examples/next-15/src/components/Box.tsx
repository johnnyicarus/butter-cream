import { mediaQueries } from '@/app/spacing.config';
import { spacing } from '@/app/spacing.css';
import { defineBoxPaddingProperties } from '@butter-cream/box';

const { boxPaddingFar, boxPaddingNear } = defineBoxPaddingProperties({
  spacingScale: spacing.spacingVariableMap,
  mediaQueries: {
    defaultKey: 'default',
    orderedRecord: { default: '', ...mediaQueries },
  },
});
