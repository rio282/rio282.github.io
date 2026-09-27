import { Folder } from "lucide-react"
import { NavLink } from "react-router-dom"

type Props = {
    label: string
}

export default function FileItem({ label }: Props) {
    return (
        <NavLink
            to={`/${label}`}
            className={({ isActive }) => `
                flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left
                transition-all duration-200 cursor-pointer
                ${
                    isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-secondary-foreground hover:bg-hover"
                }
            `}
        >
            <Folder size={16} />

            <span className="text-sm">{label}/</span>
        </NavLink>
    )
}
