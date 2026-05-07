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
                transition-all duration-200
                ${
                    active
                        ? "bg-[#f6d365] text-[#3b2b24]"
                        : "text-[#6f5a4b] hover:bg-[#e3cf9f]"
                }
            `}
        >
            <Folder size={16} />

            <span className="text-sm">{label}/</span>
        </button>
    )
}
