'use client';

import { useThemeConfig } from '@/components/active-theme';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const DEFAULT_THEMES = [
  {
    name: 'Default',
    value: 'default',
    color: '#52525b' // neutral-600
  },
  {
    name: 'Biru',
    value: 'blue',
    color: '#2563eb' // blue-600
  },
  {
    name: 'Hijau',
    value: 'green',
    color: '#65a30d' // lime-600
  },
  {
    name: 'Jingga',
    value: 'amber',
    color: '#d97706' // amber-600
  }
];

const SCALED_THEMES = [
  {
    name: 'Default',
    value: 'default-scaled',
    color: '#52525b' // neutral-600
  },
  {
    name: 'Biru Kecil',
    value: 'blue-scaled',
    color: '#2563eb' // blue-600
  }
];

const MONO_THEMES = [
  {
    name: 'Monospaced',
    value: 'mono-scaled',
    color: '#52525b' // neutral-600
  }
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor='theme-selector' className='sr-only'>
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id='theme-selector'
          className='justify-start *:data-[slot=select-value]:w-12'
        >
          <span className='text-muted-foreground hidden sm:block'>
            Tema:
          </span>
          <span className='text-muted-foreground block sm:hidden'>Theme</span>
          <SelectValue placeholder='Tema' />
        </SelectTrigger>
        <SelectContent align='end'>
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-border" 
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-border" 
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-border" 
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
