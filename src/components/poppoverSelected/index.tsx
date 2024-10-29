import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { cn } from '@/lib/utils'

interface IList {
  id: number
  name: string
}

interface IPopoverSelected {
  onChange: (e: any) => void
  placeholder?: string
  list: IList[]
  label?: string
  name: string
  value?: string
}

export const PopoverSelected = ({
  onChange,
  placeholder,
  list,
  label,
  name,
  value,
}: IPopoverSelected) => {

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>(value || "")

  useEffect(() => {
    const selectedItem = list.find((item) => item.name === selected)
    onChange({
      target: {
        name,
        value: selectedItem?.id || -1,
      },
    })
  }, [selected])

  return (
    <div className='flex flex-col gap-2'>
      <span className='font-medium text-gray-900'>{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between bg-white`}
          >
            {selected ? selected : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white">
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>Busqueda no encontrada.</CommandEmpty>
              <CommandGroup>
                {list.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      setSelected(item.name === selected ? "" : item.name)
                      setOpen(false)
                    }}
                    className='hover:bg-gray-50'
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected === item.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
