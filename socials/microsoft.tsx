import Svg, { Rect } from "react-native-svg";

interface MicrosoftProps {
  className?: string;
  size?: number;
}

export const Microsoft = ({ className, size = 20 }: MicrosoftProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <Rect width="11" height="11" fill="#F25022" />
    <Rect x="13" width="11" height="11" fill="#7FBA00" />
    <Rect y="13" width="11" height="11" fill="#00A4EF" />
    <Rect x="13" y="13" width="11" height="11" fill="#FFB900" />
  </Svg>
);
