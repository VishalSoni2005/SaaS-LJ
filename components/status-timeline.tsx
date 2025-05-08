import { CheckCircle2 } from "lucide-react"

interface StatusHistoryItem {
  status: string
  date: string
  note: string
}

interface StatusTimelineProps {
  statusHistory: StatusHistoryItem[]
}

export function StatusTimeline({ statusHistory }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      {statusHistory.map((item, index) => (
        <div key={index} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            {index < statusHistory.length - 1 && <div className="h-full w-px bg-amber-200 my-1" />}
          </div>
          <div className="pb-6">
            <div className="flex items-center">
              <p className="font-medium">{item.status}</p>
              <span className="ml-2 text-sm text-muted-foreground">{item.date}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
