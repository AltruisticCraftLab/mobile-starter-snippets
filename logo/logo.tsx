import { useState } from 'react';
import { Image, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { BRAND } from '@/config/index';
import { cn } from '@/lib/utils';

// ========================================
// TYPES AND INTERFACES
// ========================================

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

// ========================================
// CONSTANTS
// ========================================

const sizes = {
  sm: {
    icon: 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8',
    text: 'text-base sm:text-lg md:text-xl font-semibold',
    dimension: 24,
  },
  md: {
    icon: 'h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10',
    text: 'text-lg sm:text-xl md:text-2xl font-bold',
    dimension: 32,
  },
  lg: {
    icon: 'h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12',
    text: 'text-xl sm:text-2xl md:text-3xl font-bold',
    dimension: 40,
  },
};

// ========================================
// HELPER COMPONENTS
// ========================================

const DefaultIcon = ({ className }: { className?: string }) => (
  <View className={cn('flex items-center justify-center rounded-lg bg-primary', className)}>
    <Text className="text-2xl font-bold text-primary-foreground">
      {BRAND.name.charAt(0).toUpperCase()}
    </Text>
  </View>
);

// ---------------------- Logo Component ----------------------
export function Logo({ className, size = 'md', showText = true, href = '/' }: LogoProps) {
  // ========================================
  // STATE AND HOOKS
  // ========================================

  const [imageError, setImageError] = useState(false);

  // ========================================
  // COMPUTED VALUES
  // ========================================

  const sizeConfig = sizes[size];

  // Get image source from logoPath (must be a URL for remote images)
  const imageSource =
    BRAND.logoPath && BRAND.logoPath.startsWith('http') ? { uri: BRAND.logoPath } : null;

  // ========================================
  // EVENT HANDLERS
  // ========================================

  const handleImageError = () => {
    setImageError(true);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <Link href={href} accessibilityLabel={`${BRAND.name} home page`} asChild>
      <View
        className={cn(
          'flex-row items-center gap-2 rounded-sm sm:gap-3',
          'min-h-11 py-1',
          className
        )}>
        {/* Logo Icon/Image - matches Next.js behavior exactly */}
        {imageSource && !imageError ? (
          <Image
            source={imageSource}
            style={{
              width: sizeConfig.dimension,
              height: sizeConfig.dimension,
            }}
            resizeMode="contain"
            onError={handleImageError}
            accessibilityLabel={`${BRAND.name} logo`}
            className={cn('shrink-0', sizeConfig.icon)}
          />
        ) : (
          <DefaultIcon className={cn('shrink-0', sizeConfig.icon)} />
        )}

        {/* Brand Text */}
        {showText && (
          <Text
            className={cn(
              'dark:text-foreground-dark leading-tight text-foreground',
              sizeConfig.text
            )}
            numberOfLines={1}>
            {BRAND.name}
          </Text>
        )}
      </View>
    </Link>
  );
}
