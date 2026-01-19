import { memo, useState } from 'react';

import { Moon, Sun } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

import { ThemeDialog } from './theme-dialog';

interface ThemeSelectorMenuItemProps {
  className?: string;
}

export const ThemeSelectorMenuItem = memo(({ className }: ThemeSelectorMenuItemProps) => {
  const [open, setOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  const getCurrentIcon = () => {
    const LucideIcon = resolvedTheme === 'dark' ? Moon : Sun;
    return (
      <Icon
        as={LucideIcon}
        className="size-5 text-foreground group-active:text-primary-foreground"
      />
    );
  };

  return (
    <>
      <Button
        variant="ghost"
        onPress={() => setOpen(true)}
        className={cn(
          'group h-auto justify-start gap-3 p-3',
          'active:bg-primary/60 active:dark:bg-primary/60',
          className
        )}>
        {getCurrentIcon()}
        <Text className="text-base font-normal group-active:text-primary-foreground">
          Color Mode
        </Text>
      </Button>

      <ThemeDialog open={open} onOpenChange={setOpen} />
    </>
  );
});

ThemeSelectorMenuItem.displayName = 'ThemeSelectorMenuItem';
