import { memo } from 'react';
import { View } from 'react-native';

import { Monitor, Moon, Sun } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { ThemePreference, useTheme } from '@/providers/theme-provider';

// ========================================
// CONSTANTS
// ========================================

const THEME_OPTIONS = [
  { value: 'light' as const, label: 'Light', icon: Sun },
  { value: 'dark' as const, label: 'Dark', icon: Moon },
  { value: 'system' as const, label: 'System', icon: Monitor },
];

// ========================================
// TYPES
// ========================================

interface ThemeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ========================================
// COMPONENT
// ========================================

export const ThemeDialog = memo(({ open, onOpenChange }: ThemeDialogProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = async (newTheme: ThemePreference) => {
    await setTheme(newTheme);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[250px]">
        <DialogHeader>
          <DialogTitle>
            <Text>Select Theme</Text>
          </DialogTitle>
        </DialogHeader>

        <View className="flex flex-col gap-2 py-4">
          {THEME_OPTIONS.map(({ value, label, icon: LucideIcon }) => {
            const isSelected = theme === value;

            return (
              <Button
                key={value}
                variant="ghost"
                onPress={() => handleThemeChange(value)}
                className={cn(
                  'group h-auto justify-start gap-3 p-4',
                  isSelected &&
                    'bg-primary/30 active:bg-primary/30 dark:bg-primary/45 dark:active:bg-primary/45',
                  !isSelected && 'active:bg-primary/15 active:dark:bg-primary/20'
                )}>
                <Icon
                  as={LucideIcon}
                  className={cn(
                    'size-6 text-foreground',
                    !isSelected && 'group-active:text-foreground'
                  )}
                />
                <Text
                  className={cn(
                    isSelected && 'font-bold group-active:text-foreground',
                    !isSelected && 'group-active:text-foreground'
                  )}>
                  {label}
                </Text>
              </Button>
            );
          })}
        </View>
      </DialogContent>
    </Dialog>
  );
});

ThemeDialog.displayName = 'ThemeDialog';
