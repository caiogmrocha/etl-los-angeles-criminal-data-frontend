import { Pie, PieChart } from "recharts"
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

type CrimesAmountPerSexChartProps = {
  data: ApiProviderGetReportDataResponseDTO['crimes_amount_per_sex']
}

type PreparedChartData = {
  sex: string;
  amount: number;
  fill: string;
}

export function CrimesAmountPerSexChart({ data }: CrimesAmountPerSexChartProps) {
  const [preparedChartConfig, setPreparedChartConfig] = useState<ChartConfig>({})
  const [preparedChartData, setPreparedChartData] = useState<PreparedChartData[]>([])

  const keyDisplayMap = {
    "male": "Masculino",
    "female": "Feminino",
    "unknown": "Desconhecido",
    "non_binary": "Não binário",
  }

  useEffect(() => {
    setPreparedChartConfig(Object.keys(data).reduce((acc, key, idx) => {
      Object.assign(acc, {
        [key]: {
          label: keyDisplayMap[key as keyof typeof keyDisplayMap],
          color: `hsl(var(--chart-${idx + 1}))`,
        },
      })
      return acc
    }, {}))

    setPreparedChartData(Object.entries(data).map(([sex, amount], idx) => {
      return {
        sex,
        amount,
        fill: `hsl(var(--chart-${idx + 1}))`,
      }
    }))
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Quantidade de crimes por sexo</CardTitle>
        <CardDescription>
          <span className="text-sm text-gray-500">De 2020 até 2024</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={preparedChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={preparedChartData} dataKey="amount" nameKey="sex" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
