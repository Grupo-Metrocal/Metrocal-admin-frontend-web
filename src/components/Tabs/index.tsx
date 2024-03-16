import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  items: {
    value: string
    label: string
    Component: React.FC
  }[]
}

export const TabsNavigations = ({ items }: Props) => {
  return (
    <Tabs defaultValue={items[0]?.value} className="w-full">
      {/* alinear al inicio */}
      <TabsList className="flex gap-2 mb-6 justify-start">
        {items?.map((item, index) => (
          <TabsTrigger
            value={item.value}
            key={index}
            // className="bg-slate-400 text-white px-4 py-2 rounded-lg"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items?.map((item, index) => (
        <TabsContent key={index} value={item.value}>
          <item.Component />
        </TabsContent>
      ))}
    </Tabs>
  )
}
