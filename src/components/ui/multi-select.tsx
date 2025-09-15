'use client';

import * as React from 'react';
import { X, Check, ChevronDown, XCircle, WandSparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';

export interface Option {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = 'Select options',
  className,
  disabled = false,
  animation = 0,
  maxCount = 3,
  modalPopover = false,
  variant = 'default'
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value);

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  const multiSelectVariants = React.useMemo(() => {
    const baseClasses =
      'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300';

    const variantClasses = {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary:
        'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted'
    };

    return cn(baseClasses, variantClasses[variant] || variantClasses.default);
  }, [variant]);

  const handleInputKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        setOpen(true);
      } else if (
        event.key === 'Backspace' &&
        !(event.target as HTMLInputElement).value
      ) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange?.(newSelectedValues);
      }
    },
    [selectedValues, onValueChange]
  );

  const toggleOption = React.useCallback(
    (optionValue: string) => {
      const newSelectedValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((value) => value !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newSelectedValues);
      onValueChange?.(newSelectedValues);
    },
    [selectedValues, onValueChange]
  );

  const handleClear = React.useCallback(() => {
    setSelectedValues([]);
    onValueChange?.([]);
  }, [onValueChange]);

  const handleTogglePopover = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const clearExtraOptions = React.useCallback(() => {
    const newSelectedValues = selectedValues.slice(0, maxCount);
    setSelectedValues(newSelectedValues);
    onValueChange?.(newSelectedValues);
  }, [selectedValues, maxCount, onValueChange]);

  const toggleAll = React.useCallback(() => {
    if (selectedValues.length === options.length) {
      handleClear();
    } else {
      const allValues = options.map((option) => option.value);
      setSelectedValues(allValues);
      onValueChange?.(allValues);
    }
  }, [selectedValues.length, options, handleClear, onValueChange]);

  const getOptionLabel = React.useCallback(
    (value: string) => {
      return options.find((option) => option.value === value)?.label || value;
    },
    [options]
  );

  const getOptionIcon = React.useCallback(
    (value: string) => {
      return options.find((option) => option.value === value)?.icon;
    },
    [options]
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleTogglePopover}
          disabled={disabled}
          className={cn(
            'flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit [&_svg]:pointer-events-auto',
            className
          )}
        >
          {selectedValues.length > 0 ? (
            <div className='flex w-full items-center justify-between'>
              <div className='flex flex-wrap items-center overflow-hidden'>
                {selectedValues.slice(0, maxCount).map((value) => {
                  const Icon = getOptionIcon(value);
                  return (
                    <Badge
                      key={value}
                      className={cn(
                        isAnimating ? 'animate-bounce' : '',
                        multiSelectVariants
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {Icon && <Icon className='mr-2 h-4 w-4' />}
                      <span className='badge-label-truncate'>
                        {getOptionLabel(value)}
                      </span>
                      <XCircle
                        className='ml-2 h-4 w-4 cursor-pointer'
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(value);
                        }}
                      />
                    </Badge>
                  );
                })}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      'text-foreground border-foreground/1 bg-transparent hover:bg-transparent',
                      isAnimating ? 'animate-bounce' : '',
                      multiSelectVariants
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    + {selectedValues.length - maxCount} more
                    <XCircle
                      className='ml-2 h-4 w-4 cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation();
                        clearExtraOptions();
                      }}
                    />
                  </Badge>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <X
                  className='text-muted-foreground mx-2 h-4 cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                />
                <Separator
                  orientation='vertical'
                  className='flex h-full min-h-6'
                />
                <ChevronDown className='text-muted-foreground mx-2 h-4 cursor-pointer' />
              </div>
            </div>
          ) : (
            <div className='mx-auto flex w-full items-center justify-between overflow-hidden'>
              <span className='text-muted-foreground mx-3 overflow-hidden text-sm text-ellipsis whitespace-nowrap'>
                {placeholder}
              </span>
              <ChevronDown className='text-muted-foreground mx-2 h-4 cursor-pointer' />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('p-0', className)}
        style={{
          minWidth: 'var(--radix-popover-trigger-width)',
          width: 'var(--radix-popover-trigger-width)'
        }}
        align='start'
      >
        <Command>
          <CommandInput placeholder='Cari...' onKeyDown={handleInputKeyDown} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value='select-all'
                onSelect={toggleAll}
                className='cursor-pointer'
              >
                <div
                  className={cn(
                    'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                    selectedValues.length === options.length
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <Check className='h-4 w-4' />
                </div>
                <span>(Select All)</span>
              </CommandItem>
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className='cursor-pointer'
                  >
                    <div
                      className={cn(
                        'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                        selectedValues.includes(option.value)
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <Check className='h-4 w-4' />
                    </div>
                    {Icon && (
                      <Icon className='text-muted-foreground mr-2 h-4 w-4' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className='flex items-center justify-between'>
                {selectedValues.length > 0 && (
                  <CommandItem
                    value='clear'
                    onSelect={handleClear}
                    className='flex-1 cursor-pointer justify-center'
                  >
                    Clear
                  </CommandItem>
                )}
                {selectedValues.length > 0 && (
                  <Separator
                    orientation='vertical'
                    className='flex h-full min-h-6'
                  />
                )}
                <CommandItem
                  value='close'
                  onSelect={() => setOpen(false)}
                  className='max-w-full flex-1 cursor-pointer justify-center'
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {animation > 0 && selectedValues.length > 0 && (
        <WandSparkles
          className={cn(
            'text-foreground bg-background my-2 h-3 w-3 cursor-pointer',
            isAnimating ? '' : 'text-muted-foreground'
          )}
          onClick={() => setIsAnimating(!isAnimating)}
        />
      )}
      <style jsx>{`
        .badge-label-truncate {
          max-width: 120px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: bottom;
        }
      `}</style>
    </Popover>
  );
}
