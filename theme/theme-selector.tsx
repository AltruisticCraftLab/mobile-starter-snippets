import { memo } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ThemePreference, useTheme } from '@/providers/theme-provider';

import MoonIcon from './moon-icon';
import SunIcon from './sun-icon';
import SystemIcon from './system-icon';

// ========================================
// CONSTANTS
// ========================================

const THEME_OPTIONS = [
  { value: 'light' as const, label: 'Light', icon: SunIcon },
  { value: 'dark' as const, label: 'Dark', icon: MoonIcon },
  { value: 'system' as const, label: 'System', icon: SystemIcon },
];

// ========================================
// COMPONENT
// ========================================

const ThemeSelector = memo(() => {
  const { theme, resolvedTheme, setTheme, isDark } = useTheme();

  // ========================================
  // ICON COLOR
  // ========================================

  const iconColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  // ========================================
  // CURRENT ICON
  // ========================================

  const getCurrentIcon = () => {
    // Use resolvedTheme to handle 'system' theme correctly
    const IconComponent = resolvedTheme === 'dark' ? MoonIcon : SunIcon;
    return <IconComponent color={iconColor} size={20} />;
  };

  // ========================================
  // HANDLERS
  // ========================================

  const handleThemeChange = (newTheme: ThemePreference) => {
    setTheme(newTheme);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="ios:size-9 rounded-full web:mx-4"
          aria-label="Change theme">
          {getCurrentIcon()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[150px]">
        {THEME_OPTIONS.map(({ value, label, icon: Icon }, index) => {
          const isSelected = theme === value;
          const isLast = index === THEME_OPTIONS.length - 1;

          return (
            <DropdownMenuItem
              key={value}
              onPress={() => handleThemeChange(value)}
              className={cn(
                'flex-row items-center gap-3',
                // Border
                !isLast && 'border-b border-border',
                // Selected state
                isSelected && 'bg-primary/30 dark:bg-primary/45',
                // Active/Press state (non-selected only)
                !isSelected && 'active:bg-primary/15 active:dark:bg-primary/20'
              )}>
              <Icon color={iconColor} size={20} />
              <Text className={cn(isSelected && 'font-bold')}>{label}</Text>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeSelector.displayName = 'ThemeSelector';

export default ThemeSelector;