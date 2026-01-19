import { memo, useState } from 'react';

import { Moon, Sun } from 'lucide-react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useTheme } from '@/providers/theme-provider';

import { ThemeDialog } from './theme-dialog';

export const ThemeSelectorButton = memo(() => {
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
        size="icon"
        variant="ghost"
        className="ios:size-9 group rounded-full web:mx-4"
        aria-label="Change theme"
        onPress={() => setOpen(true)}>
        {getCurrentIcon()}
      </Button>

      <ThemeDialog open={open} onOpenChange={setOpen} />
    </>
  );
});

ThemeSelectorButton.displayName = 'ThemeSelectorButton';
