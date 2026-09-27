import { Folder } from "lucide-react"

type Props = {
    label: string
    active?: boolean
}

export default function FileItem({ label, active = false }: Props) {
    return (
        <button
            className={`
                flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left
                transition-all duration-200 cursor-pointer 
                ${
                    active
                        ? "bg-primary text-primary-foreground"
                        : "text-secondary-foreground hover:bg-hover"
                }
            `}
        >
            <Folder size={16} />

            <span className="text-sm">{label}/</span>
        </button>
    )
}
