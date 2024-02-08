import { BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react'

interface BadgeCardProps {
  title: string
  metric: string
  value: number | string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const BadgeCard = ({ title, metric, size, value }: BadgeCardProps) => (
  <Card className="max-w-sm">
    <Flex justifyContent="between" alignItems="center">
      <Text>{title}</Text>
      <BadgeDelta
        deltaType="moderateIncrease"
        isIncreasePositive={true}
        size={size || 'md'}
      >
        {value}
      </BadgeDelta>
    </Flex>
    <Metric>{metric}</Metric>
  </Card>
)
