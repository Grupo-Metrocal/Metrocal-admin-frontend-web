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

      <TabsList className="flex gap-2 mb-6 justify-start
      flex-wrap h-auto

      ">
        {items?.map((item, index) => (
          <TabsTrigger value={item.value} key={index}>
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
