import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';
import { ThemePreference, useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

import MoonIcon from './moon-icon';
import SunIcon from './sun-icon';
import SystemIcon from './system-icon';

export default function ThemeSelector() {
  const { themePreference, resolvedTheme, setColorScheme, isDark } = useTheme();

  const getCurrentIcon = () => {
    const effectiveTheme = themePreference === 'system' ? resolvedTheme : themePreference;
    const iconColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

    switch (effectiveTheme) {
      case 'dark':
        return <MoonIcon color={iconColor} size={20} />;
      case 'light':
        return <SunIcon color={iconColor} size={20} />;
      default:
        return <SunIcon color={iconColor} size={20} />;
    }
  };

  const handleThemeChange = (theme: ThemePreference) => {
    setColorScheme(theme);
  };

  const optionClass = (isSelected: boolean, isLast = false) =>
    cn(
      'flex-row items-center gap-3',
      !isLast && 'border-b border-border',
      isSelected
        ? 'bg-primary/30 dark:bg-primary/45'
        : 'active:bg-primary/15 active:dark:bg-primary/20'
    );

  const menuIconColor = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="ios:size-9 rounded-full web:mx-4">
          {getCurrentIcon()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[150px]">
        <DropdownMenuItem
          onPress={() => handleThemeChange('light')}
          className={optionClass(themePreference === 'light')}>
          <SunIcon color={menuIconColor} size={20} />
          <Text className={cn(themePreference === 'light' && 'font-bold')}>Light</Text>
        </DropdownMenuItem>

        <DropdownMenuItem
          onPress={() => handleThemeChange('dark')}
          className={optionClass(themePreference === 'dark')}>
          <MoonIcon color={menuIconColor} size={20} />
          <Text className={cn(themePreference === 'dark' && 'font-bold')}>Dark</Text>
        </DropdownMenuItem>

        <DropdownMenuItem
          onPress={() => handleThemeChange('system')}
          className={optionClass(themePreference === 'system', true)}>
          <SystemIcon color={menuIconColor} size={20} />
          <Text className={cn(themePreference === 'system' && 'font-bold')}>System</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
