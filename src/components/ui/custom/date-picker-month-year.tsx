"use client"

import * as React from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerMonthYearProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
  placeholder?: string
}

export function DatePickerMonthYear({
  value,
  onValueChange,
  className,
  disabled = false,
  placeholder = "Pilih tanggal",
}: DatePickerMonthYearProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : new Date()
  )

  // Generate year range (1900-2100)
  const yearRange = React.useMemo(() => {
    const years = []
    for (let year = 1900; year <= 2100; year++) {
      years.push(year)
    }
    return years
  }, [])

  // Generate month options
  const monthOptions = React.useMemo(() => {
    const months = []
    for (let month = 1; month <= 12; month++) {
      const date = new Date(2024, month - 1, 1)
      months.push({
        value: month.toString(),
        label: format(date, "MMMM", { locale: id }),
      })
    }
    return months
  }, [])

  const formattedDate = React.useMemo(() => {
    if (!selectedDate) return ""
    return format(selectedDate, "dd MMMM yyyy", { locale: id })
  }, [selectedDate])

  const handleDateSelect = React.useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    if (date && onValueChange) {
      onValueChange(date.toISOString().split("T")[0])
    }
    setOpen(false)
  }, [onValueChange])

  const handleMonthChange = React.useCallback((month: string) => {
    if (!selectedDate) return
    const newDate = new Date(selectedDate)
    newDate.setMonth(parseInt(month) - 1)
    setSelectedDate(newDate)
  }, [selectedDate])

  const handleYearChange = React.useCallback((year: string) => {
    if (!selectedDate) return
    const newDate = new Date(selectedDate)
    newDate.setFullYear(parseInt(year))
    setSelectedDate(newDate)
  }, [selectedDate])

  // Update selected date when value prop changes
  React.useEffect(() => {
    if (value) {
      const date = new Date(value)
      if (!isNaN(date.getTime())) {
        setSelectedDate(date)
      }
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="rounded-md border p-3">
          {/* Month and Year Selectors */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Select
              value={selectedDate ? (selectedDate.getMonth() + 1).toString() : "1"}
              onValueChange={handleMonthChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-[60%]">
                <SelectValue placeholder="Pilih bulan" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedDate ? selectedDate.getFullYear().toString() : new Date().getFullYear().toString()}
              onValueChange={handleYearChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-[40%]">
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {yearRange.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabled}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
} 