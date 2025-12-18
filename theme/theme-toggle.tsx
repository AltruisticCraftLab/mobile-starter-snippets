import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { ThemePreference, useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

import MoonIcon from './moon-icon';
import SunIcon from './sun-icon';
import SystemIcon from './system-icon';

export default function ThemeToggle() {
  const { themePreference, resolvedTheme, setColorScheme, isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const getCurrentIcon = () => {
    const effectiveTheme =
      themePreference === 'system' ? resolvedTheme : themePreference;

    // Use white in dark mode, black in light mode for maximum contrast
    const iconColor = isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)';

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
    setShowMenu(false);
  };

  const optionClass = (isSelected: boolean, isLast = false) =>
    cn(
      'flex-row items-center gap-3 px-3 py-2',
      !isLast && 'border-b border-border dark:border-border-dark',
      isSelected
        ? 'bg-primary/30 dark:bg-primary-dark/45'
        : 'active:bg-primary/15 active:dark:bg-primary-dark/20'
    );

  // Menu icons also use contrasting colors
  const menuIconColor = isDark
    ? 'rgba(255, 255, 255, 0.8)'
    : 'rgba(0, 0, 0, 0.8)';

  return (
    <View>
      {/* Toggle Button */}
      <Pressable
        onPress={() => setShowMenu(!showMenu)}
        onLayout={event => {
          event.currentTarget.measure((x, y, width, height, pageX, pageY) => {
            setButtonLayout({ x: pageX, y: pageY, width, height });
          });
        }}
        className="p-2"
      >
        {getCurrentIcon()}
      </Pressable>

      {/* Dropdown Menu Modal */}
      {showMenu && (
        <Modal
          visible={showMenu}
          transparent
          animationType="fade"
          onRequestClose={() => setShowMenu(false)}
        >
          <Pressable
            onPress={() => setShowMenu(false)}
            className="flex-1 bg-black/30"
          >
            <View
              style={{
                position: 'absolute',
                top: buttonLayout.y + buttonLayout.height + 8,
                right: 16,
                overflow: 'hidden',
              }}
              className="min-w-[150px] rounded-lg border border-border bg-card shadow-lg dark:border-border-dark dark:bg-card-dark"
            >
              {/* Light Option */}
              <Pressable
                onPress={() => handleThemeChange('light')}
                className={optionClass(themePreference === 'light')}
              >
                <SunIcon color={menuIconColor} size={20} />
                <Text
                  className={cn(
                    'text-base text-foreground dark:text-foreground-dark',
                    themePreference === 'light' && 'font-bold'
                  )}
                >
                  Light
                </Text>
              </Pressable>

              {/* Dark Option */}
              <Pressable
                onPress={() => handleThemeChange('dark')}
                className={optionClass(themePreference === 'dark')}
              >
                <MoonIcon color={menuIconColor} size={20} />
                <Text
                  className={cn(
                    'text-base text-foreground dark:text-foreground-dark',
                    themePreference === 'dark' && 'font-bold'
                  )}
                >
                  Dark
                </Text>
              </Pressable>

              {/* System Option */}
              <Pressable
                onPress={() => handleThemeChange('system')}
                className={optionClass(themePreference === 'system', true)}
              >
                <SystemIcon color={menuIconColor} size={20} />
                <Text
                  className={cn(
                    'text-base text-foreground dark:text-foreground-dark',
                    themePreference === 'system' && 'font-bold'
                  )}
                >
                  System
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}
