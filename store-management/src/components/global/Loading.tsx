import { LoaderPinwheelIcon } from "lucide-react"

const Loading = ({ text = '' }: { text?: string }) => {
  return (
    <div className="flex gap-1 items-center bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 p-4 rounded-lg text-lg font-bold">
      <LoaderPinwheelIcon className="animate-spin" />
      {text ? text : 'Loading...'}
    </div>
  )
}

export default Loading
