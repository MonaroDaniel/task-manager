import React from 'react';
import * as Lucide from 'lucide-react';

export type RenderIconsProps = {
  iconName: keyof typeof Lucide;
  className?: string;
  size: number;
}

const RenderIcon: React.FC<RenderIconsProps> = ({ iconName, className, size }) => {
  let IconComponent = Lucide[iconName] as any
  return <IconComponent size={size} className={className} />
};

export default RenderIcon;