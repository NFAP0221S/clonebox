
type TSize = "sm" | "md" | "lg"

interface Props {
  size: TSize
}

export function Ad({ size }: Props) {
  return <div className="p-4 bg-white rounded-lg shadow-md text-sm">
    Ad
  </div>
}
