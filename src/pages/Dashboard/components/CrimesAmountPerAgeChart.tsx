"use client"

import { Bar, BarChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ApiProviderGetReportDataResponseDTO } from "@/providers/api"
import { useEffect, useState } from "react"

const chartData = [
  { ageInterval: "01-09", amount: 5 },
  { ageInterval: "10-19", amount: 5 },
  { ageInterval: "20-29", amount: 5 },
  { ageInterval: "30-39", amount: 5 },
  { ageInterval: "40-49", amount: 5 },
  { ageInterval: "50-59", amount: 5 },
]

type PreparedChartData = {
  ageInterval: string;
  amount: number;
  fill: string;
}

type CrimesAmountPerAgeChartProps = {
  data: ApiProviderGetReportDataResponseDTO['crimes_amount_per_age']
}

export function CrimesAmountPerAgeChart({ data }: CrimesAmountPerAgeChartProps) {
  const [preparedChartConfig, setPreparedChartConfig] = useState<ChartConfig>({})
  const [preparedChartData, setPreparedChartData] = useState<PreparedChartData[]>([])

  useEffect(() => {
    setPreparedChartConfig(Object.keys(data).reduce((acc, key, idx) => {
      Object.assign(acc, {
        [key]: {
          label: key.replace(/from_(\d+)_to_(\d+)/, "De $1 até $2"),
          color: `hsl(var(--chart-${idx + 1}))`,
        },
      })
      return acc
    }, {}))

    setPreparedChartData(Object.entries(data).map(([ageInterval, amount], idx) => {
      return {
        ageInterval,
        amount,
        fill: `hsl(var(--chart-${(idx % 5) + 1}))`,
      }
    }))
  }, [data])

  return (
    <Card className="max-w-[620px] w-full">
      <CardHeader className="text-center">
        <CardTitle>Quantidade de crimes por idade</CardTitle>
        <CardDescription>
          De 2020 até 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={preparedChartConfig}>
          <BarChart accessibilityLayer data={preparedChartData}>
            <XAxis
              dataKey="ageInterval"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                return value.replace(/^from_(\d+)_to_(\d+)$/, "$1 a $2")
              }}
            />
            <Bar
              dataKey="amount"
              stackId="a"
              fill="var(--color-running)"
              radius={4}
              barSize={40}
            />
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
