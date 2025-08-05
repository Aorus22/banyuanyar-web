"use client"

import * as React from "react"
import { X, Check, ChevronDown, XCircle, WandSparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export interface Option {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface MultiSelectProps {
  options: Option[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  animation?: number
  maxCount?: number
  modalPopover?: boolean
  variant?: "default" | "secondary" | "destructive" | "inverted"
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select options",
  className,
  disabled = false,
  animation = 0,
  maxCount = 3,
  modalPopover = false,
  variant = "default",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value)

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelectedValues(value)
  }, [value])

  const multiSelectVariants = React.useMemo(() => {
    const baseClasses = "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
    
    const variantClasses = {
      default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
      secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      inverted: "inverted"
    }
    
    return cn(baseClasses, variantClasses[variant] || variantClasses.default)
  }, [variant])

  const handleInputKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setOpen(true)
    } else if (event.key === "Backspace" && !(event.target as HTMLInputElement).value) {
      const newSelectedValues = [...selectedValues]
      newSelectedValues.pop()
      setSelectedValues(newSelectedValues)
      onValueChange?.(newSelectedValues)
    }
  }, [selectedValues, onValueChange])

  const toggleOption = React.useCallback((optionValue: string) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((value) => value !== optionValue)
      : [...selectedValues, optionValue]
    setSelectedValues(newSelectedValues)
    onValueChange?.(newSelectedValues)
  }, [selectedValues, onValueChange])

  const handleClear = React.useCallback(() => {
    setSelectedValues([])
    onValueChange?.([])
  }, [onValueChange])

  const handleTogglePopover = React.useCallback((event?: React.MouseEvent) => {
    event?.stopPropagation()
    setOpen(!open)
  }, [open])

  const clearExtraOptions = React.useCallback(() => {
    const newSelectedValues = selectedValues.slice(0, maxCount)
    setSelectedValues(newSelectedValues)
    onValueChange?.(newSelectedValues)
  }, [selectedValues, maxCount, onValueChange])

  const toggleAll = React.useCallback(() => {
    if (selectedValues.length === options.length) {
      handleClear()
    } else {
      const allValues = options.map((option) => option.value)
      setSelectedValues(allValues)
      onValueChange?.(allValues)
    }
  }, [selectedValues.length, options, handleClear, onValueChange])

  const getOptionLabel = React.useCallback((value: string) => {
    return options.find(option => option.value === value)?.label || value
  }, [options])

  const getOptionIcon = React.useCallback((value: string) => {
    return options.find(option => option.value === value)?.icon
  }, [options])

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modalPopover}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleTogglePopover}
          disabled={disabled}
          className={cn(
            "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
            className
          )}
        >
          {selectedValues.length > 0 ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-wrap items-center overflow-hidden">
                {selectedValues.slice(0, maxCount).map((value) => {
                  const Icon = getOptionIcon(value)
                  return (
                    <Badge
                      key={value}
                      className={cn(
                        isAnimating ? "animate-bounce" : "",
                        multiSelectVariants
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {Icon && <Icon className="h-4 w-4 mr-2" />}
                      <span className="badge-label-truncate">{getOptionLabel(value)}</span>
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleOption(value)
                        }}
                      />
                    </Badge>
                  )
                })}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                      isAnimating ? "animate-bounce" : "",
                      multiSelectVariants
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    + {selectedValues.length - maxCount} more
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearExtraOptions()
                      }}
                    />
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <X
                  className="h-4 mx-2 cursor-pointer text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                />
                <Separator orientation="vertical" className="flex min-h-6 h-full" />
                <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mx-auto overflow-hidden">
              <span className="text-sm text-muted-foreground mx-3 overflow-hidden text-ellipsis whitespace-nowrap">
                {placeholder}
              </span>
              <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0", className)}
        style={{
          minWidth: "var(--radix-popover-trigger-width)",
          width: "var(--radix-popover-trigger-width)"
        }}
        align="start"
      >
        <Command>
          <CommandInput
            placeholder="Cari..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="select-all"
                onSelect={toggleAll}
                className="cursor-pointer"
              >
                <div
                  className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedValues.length === options.length
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}
                >
                  <Check className="h-4 w-4" />
                </div>
                <span>(Select All)</span>
              </CommandItem>
              {options.map((option) => {
                const Icon = option.icon
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValues.includes(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    {Icon && <Icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedValues.length > 0 && (
                  <CommandItem
                    value="clear"
                    onSelect={handleClear}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Clear
                  </CommandItem>
                )}
                {selectedValues.length > 0 && (
                  <Separator orientation="vertical" className="flex min-h-6 h-full" />
                )}
                <CommandItem
                  value="close"
                  onSelect={() => setOpen(false)}
                  className="flex-1 justify-center cursor-pointer max-w-full"
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
            "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
            isAnimating ? "" : "text-muted-foreground"
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
  )
} 