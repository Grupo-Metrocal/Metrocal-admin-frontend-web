'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type IComboboxProps = {
  list: { value: string; label: string }[]
  name: string
  style?: React.CSSProperties
}
export function Combobox({ list, name, style }: IComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState(list)

  React.useEffect(() => {
    setData(list)
  }, [list])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          style={{
            background: 'white',
            ...style,
          }}
        >
          {value ? data.find((item) => item.value === value)?.label : name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{
          background: 'white',
        }}
      >
        <Command>
          <CommandInput placeholder={`${name}`} />
          <CommandEmpty>No se encontraron resultados</CommandEmpty>
          <CommandGroup>
            {data?.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  setValue(item.value === value ? '' : item.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
