"use client"

import * as React from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Clock, ChevronUp, ChevronDown } from "lucide-react"
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

interface DatePickerWithTimeProps {
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
  showTime?: boolean
  placeholder?: string
}

export function DatePickerWithTime({
  value,
  onValueChange,
  className,
  disabled = false,
  showTime = true,
  placeholder = "Pilih tanggal dan waktu",
}: DatePickerWithTimeProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ? new Date(value) : new Date()
  )
  const [selectedHour, setSelectedHour] = React.useState(12)
  const [selectedMinute, setSelectedMinute] = React.useState(0)
  const [showTimeDropdown, setShowTimeDropdown] = React.useState(false)

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

  // Generate hour and minute options
  const hourOptions = React.useMemo(() => {
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push({ value: i, label: i.toString().padStart(2, "0") })
    }
    return hours
  }, [])

  const minuteOptions = React.useMemo(() => {
    const minutes = []
    for (let i = 0; i < 60; i += 5) {
      minutes.push({ value: i, label: i.toString().padStart(2, "0") })
    }
    return minutes
  }, [])

  const selectedTimeString = React.useMemo(() => {
    return `${selectedHour.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}`
  }, [selectedHour, selectedMinute])

  const formattedDateTime = React.useMemo(() => {
    if (!selectedDate) return ""
    const dateStr = format(selectedDate, "dd MMMM yyyy", { locale: id })
    return showTime ? `${dateStr} ${selectedTimeString}` : dateStr
  }, [selectedDate, selectedTimeString, showTime])

  const handleDateSelect = React.useCallback((date: Date | undefined) => {
    setSelectedDate(date)
    if (date && onValueChange) {
      const dateTimeString = `${date.toISOString().split("T")[0]}T${selectedTimeString}:00`
      onValueChange(dateTimeString)
    }
  }, [onValueChange, selectedTimeString])

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

  const handleHourChange = React.useCallback((hour: string) => {
    const hourNum = parseInt(hour)
    setSelectedHour(hourNum)
    if (selectedDate && onValueChange) {
      const dateTimeString = `${selectedDate.toISOString().split("T")[0]}T${hourNum.toString().padStart(2, "0")}:${selectedMinute.toString().padStart(2, "0")}:00`
      onValueChange(dateTimeString)
    }
  }, [selectedDate, selectedMinute, onValueChange])

  const handleMinuteChange = React.useCallback((minute: string) => {
    const minuteNum = parseInt(minute)
    setSelectedMinute(minuteNum)
    if (selectedDate && onValueChange) {
      const dateTimeString = `${selectedDate.toISOString().split("T")[0]}T${selectedHour.toString().padStart(2, "0")}:${minuteNum.toString().padStart(2, "0")}:00`
      onValueChange(dateTimeString)
    }
  }, [selectedDate, selectedHour, onValueChange])

  const toggleTimeDropdown = React.useCallback(() => {
    if (!disabled) {
      setShowTimeDropdown(!showTimeDropdown)
    }
  }, [disabled, showTimeDropdown])

  // Update selected date and time when value prop changes
  React.useEffect(() => {
    if (value) {
      try {
        if (value.includes("T")) {
          const [datePart, timePart] = value.split("T")
          const date = new Date(datePart)
          if (!isNaN(date.getTime())) {
            setSelectedDate(date)
          }
          if (timePart) {
            const timeStr = timePart.substring(0, 5) // Extract HH:MM
            const [hour, minute] = timeStr.split(":")
            setSelectedHour(parseInt(hour) || 12)
            setSelectedMinute(parseInt(minute) || 0)
          }
        } else {
          const date = new Date(value)
          if (!isNaN(date.getTime())) {
            setSelectedDate(date)
          }
        }
      } catch (error) {
        console.error("Invalid date format:", error)
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
          {formattedDateTime || placeholder}
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

          {/* Time Input Section */}
          {showTime && (
            <div className="border-t pt-4 mt-4">
              <div className="space-y-3">
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={toggleTimeDropdown}
                    disabled={disabled}
                    className="w-full gap-2 justify-center font-mono text-lg h-12"
                  >
                    <Clock className="h-4 w-4" />
                    <span>{selectedTimeString}</span>
                  </Button>

                  {/* Time Dropdown */}
                  {showTimeDropdown && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-card border rounded-md shadow-lg z-50">
                      <div className="p-3">
                        <div className="flex items-center justify-center gap-4 mb-3">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-muted-foreground mb-2">Jam</span>
                            <Select
                              value={selectedHour.toString()}
                              onValueChange={handleHourChange}
                              disabled={disabled}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {hourOptions.map((hour) => (
                                  <SelectItem key={hour.value} value={hour.value.toString()}>
                                    {hour.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="text-2xl font-bold text-muted-foreground">:</div>

                          <div className="flex flex-col items-center">
                            <span className="text-sm font-medium text-muted-foreground mb-2">Menit</span>
                            <Select
                              value={selectedMinute.toString()}
                              onValueChange={handleMinuteChange}
                              disabled={disabled}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {minuteOptions.map((minute) => (
                                  <SelectItem key={minute.value} value={minute.value.toString()}>
                                    {minute.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
} 