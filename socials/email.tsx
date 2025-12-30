import { useColorScheme } from 'react-native';

import Svg, { Path, Polyline } from 'react-native-svg';

interface EmailProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Email = ({ className, size = 20, color }: EmailProps) => {
  const colorScheme = useColorScheme();

  // Note: react-native-svg doesn't support CSS variables or NativeWind className for fill/stroke colors.
  // If you want to match your theme's foreground color exactly, replace the hex values below with the HSL values from your global.css (e.g., 'hsl(230, 16%, 15%)' for light mode)
  const strokeColor = color ?? (colorScheme === 'dark' ? '#FFFFFF' : '#000000');

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none" // Keep fill as "none" for outlined icons
      stroke={strokeColor} // Use strokeColor here
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <Polyline points="22,6 12,13 2,6" />
    </Svg>
  );
};
