import { CSSProperties } from 'react';
import { IconName } from './icon-names';

export type { IconName } from './icon-names';

interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 16, color, className, style }: IconProps) {
  const iconStyle: CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    color,
    display: 'inline-block',
    ...style,
  };

  return (
    <svg style={iconStyle} className={className} data-testid="icon">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
