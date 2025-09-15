'use client';

import * as React from 'react';
import { ChevronsUpDown, Search, Loader2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Item {
  label: string;
  value: string;
}

interface SearchableValueSelectProps {
  items: Item[];
  value?: string;
  onValueChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  triggerStyle?: string;
  placeholder?: string;
  className?: string;
}

export function SearchableValueSelect({
  items,
  value,
  onValueChange,
  loading = false,
  disabled = false,
  triggerStyle,
  placeholder = 'Pilih Item',
  className
}: SearchableValueSelectProps) {
  const [search, setSearch] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [listWidth, setListWidth] = React.useState<string>('auto');
  const [dropdownAbove, setDropdownAbove] = React.useState(false);
  const [scrollTop, setScrollTop] = React.useState(0);

  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Virtual scroll constants
  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;
  const BUFFER_ITEMS = 2;

  const filteredItems = React.useMemo(() => {
    if (!search) return items;
    const s = search.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(s) ||
        item.value.toLowerCase().includes(s)
    );
  }, [items, search]);

  const uniqueItems = React.useMemo(() => {
    return filteredItems.map((item, index) => ({
      ...item,
      uniqueKey: `${item.value}-${index}`
    }));
  }, [filteredItems]);

  const totalHeight = React.useMemo(
    () => uniqueItems.length * ITEM_HEIGHT,
    [uniqueItems.length]
  );
  const startIndex = React.useMemo(
    () => Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS),
    [scrollTop]
  );
  const endIndex = React.useMemo(
    () =>
      Math.min(
        uniqueItems.length,
        startIndex + VISIBLE_ITEMS + BUFFER_ITEMS * 2
      ),
    [uniqueItems.length, startIndex]
  );
  const visibleItems = React.useMemo(
    () => uniqueItems.slice(startIndex, endIndex),
    [uniqueItems, startIndex, endIndex]
  );
  const offsetY = React.useMemo(() => startIndex * ITEM_HEIGHT, [startIndex]);

  const visibleContainerHeight = React.useMemo(() => {
    const count = Math.min(visibleItems.length, VISIBLE_ITEMS);
    return (count + 0.5) * ITEM_HEIGHT;
  }, [visibleItems.length]);

  const selectedLabel = React.useMemo(() => {
    const selected = items.find((item) => item.value === value);
    return selected ? selected.label : placeholder;
  }, [items, value, placeholder]);

  const isPlaceholder = React.useMemo(() => {
    return !items.find((item) => item.value === value);
  }, [items, value]);

  const resetSearch = React.useCallback(() => {
    setSearch('');
  }, []);

  const updateListWidth = React.useCallback(() => {
    if (anchorRef.current) {
      setListWidth(anchorRef.current.offsetWidth + 'px');
    }
  }, []);

  const checkDropdownPosition = React.useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const dropdownHeight = visibleContainerHeight || 200;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setDropdownAbove(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  }, [visibleContainerHeight]);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    setScrollTop(target.scrollTop);
  }, []);

  const handleClickOutside = React.useCallback((event: MouseEvent) => {
    if (
      anchorRef.current &&
      !anchorRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const selectItem = React.useCallback(
    (item: Item) => {
      if (!disabled && !loading) {
        onValueChange?.(item.value);
        setIsOpen(false);
        setSearch('');
        setScrollTop(0);
      }
    },
    [disabled, loading, onValueChange]
  );

  const handleToggle = React.useCallback(() => {
    if (!disabled && !loading) {
      const newOpen = !isOpen;
      setIsOpen(newOpen);
      if (newOpen) {
        resetSearch();
        setTimeout(() => {
          updateListWidth();
          checkDropdownPosition();
          // Scroll to selected item
          const selectedIndex = uniqueItems.findIndex(
            (item) => item.value === value
          );
          if (dropdownRef.current) {
            const el = dropdownRef.current.querySelector(
              '.virtual-scroll'
            ) as HTMLElement;
            if (el) {
              if (selectedIndex !== -1) {
                const targetScroll = Math.max(
                  0,
                  (selectedIndex - BUFFER_ITEMS) * ITEM_HEIGHT
                );
                el.scrollTop = targetScroll;
                setScrollTop(targetScroll);
              } else {
                el.scrollTop = 0;
                setScrollTop(0);
              }
            }
          }
        }, 0);
      }
    }
  }, [
    disabled,
    loading,
    isOpen,
    resetSearch,
    updateListWidth,
    checkDropdownPosition,
    uniqueItems,
    value
  ]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const el = dropdownRef.current?.querySelector(
        '.virtual-scroll'
      ) as HTMLElement;
      if (el) {
        el.scrollTop += ITEM_HEIGHT;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const el = dropdownRef.current?.querySelector(
        '.virtual-scroll'
      ) as HTMLElement;
      if (el) {
        el.scrollTop -= ITEM_HEIGHT;
      }
    }
  }, []);

  React.useEffect(() => {
    updateListWidth();
    window.addEventListener('resize', updateListWidth);
    window.addEventListener('resize', checkDropdownPosition);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', updateListWidth);
      window.removeEventListener('resize', checkDropdownPosition);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [updateListWidth, checkDropdownPosition, handleClickOutside]);

  return (
    <div className={cn('relative w-full', className)}>
      <button
        ref={anchorRef}
        className={cn(
          'bg-card text-foreground border-input flex h-9 min-h-9 w-full items-center justify-between rounded-lg border px-3 py-1 text-sm shadow-xs',
          triggerStyle,
          {
            'text-muted-foreground': disabled,
            'hover:bg-accent': !disabled
          }
        )}
        disabled={loading || disabled}
        onClick={handleToggle}
        type='button'
      >
        <div className='flex flex-1 items-center gap-2 truncate overflow-hidden whitespace-nowrap'>
          {loading && <Loader2 className='h-4 w-4 animate-spin' />}
          <span
            className={cn({
              'text-muted-foreground': isPlaceholder || disabled
            })}
          >
            {selectedLabel}
          </span>
        </div>
        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'bg-popover text-popover-foreground absolute z-50 mt-1 rounded-lg border shadow-md outline-none',
            { 'dropdown-above': dropdownAbove }
          )}
          style={{
            width: listWidth,
            minWidth: '0',
            maxWidth: 'none',
            top: dropdownAbove ? 'auto' : '100%',
            bottom: dropdownAbove ? '100%' : 'auto',
            marginBottom: dropdownAbove ? '0.5rem' : '',
            marginTop: dropdownAbove ? '' : '0.25rem'
          }}
        >
          <div className='relative w-full items-center'>
            <input
              className='h-10 w-full rounded-md border-b py-1 pr-3 pl-9 text-sm outline-none focus-visible:ring-0'
              placeholder='Cari...'
              disabled={loading || disabled}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3'>
              <Search className='text-muted-foreground size-4' />
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className='text-muted-foreground p-3 text-center text-sm'>
              Tidak ada item
            </div>
          ) : (
            <div
              className='virtual-scroll relative overflow-y-auto'
              style={{ height: visibleContainerHeight + 'px' }}
              onScroll={handleScroll}
            >
              <div style={{ height: totalHeight + 'px' }}>
                <div style={{ transform: `translateY(${offsetY}px)` }}>
                  {visibleItems.map((item) => (
                    <div
                      key={item.uniqueKey}
                      className={cn(
                        'border-border flex min-h-9 cursor-pointer items-center border-b px-3 py-1.5 text-sm last:border-b-0',
                        {
                          'pointer-events-none opacity-50': loading || disabled,
                          'hover:bg-accent': !disabled
                        }
                      )}
                      onClick={() => selectItem(item)}
                    >
                      <span
                        className={cn('flex-1', {
                          'text-muted-foreground': disabled
                        })}
                      >
                        {item.label}
                      </span>
                      {item.value === value && (
                        <Check className='ml-auto h-4 w-4' />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
