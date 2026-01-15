import { useColorScheme } from 'nativewind';
import Svg, { Path } from 'react-native-svg';

interface XProps {
  className?: string;
  size?: number;
  color?: string;
}

export const X = ({ className, size = 20, color }: XProps) => {
  const { colorScheme } = useColorScheme();

  // Note: react-native-svg doesn't support CSS variables or NativeWind className for fill/stroke colors.
  const fillColor = color ?? (colorScheme === 'dark' ? '#FFFFFF' : '#000000');

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fillColor} className={className}>
      <Path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </Svg>
  );
};