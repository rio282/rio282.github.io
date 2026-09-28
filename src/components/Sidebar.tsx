import { NavLink } from "react-router-dom"
import FileItem from "./FileItem"
import packageJson from "../../package.json"
import Logo from "../assets/img/pompompurin--black-white.svg"

const views = import.meta.glob("../views/*", {
    eager: true,
})

const items = Object.keys(views)
    .map((path) =>
        path
            .split("/")
            .pop()
            ?.replace(/\.[^/.]+$/, "")
            .toLowerCase()
    )
    .filter((item) => item !== "terminal")
    .filter(Boolean)
    .reverse()

export default function Sidebar() {
    return (
        <aside className="flex w-72 flex-col border-r border-border bg-secondary">
            <NavLink
                to="/"
                className={({ isActive }) => `
        relative block border-b border-border p-5
        ${
            isActive
                ? "bg-primary text-primary-foreground"
                : "text-secondary-foreground hover:bg-hover"
        }
    `}
            >
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Filesystem
                </div>

                <h1 className="text-lg font-semibold text-secondary-foreground">
                    ~/rio282/
                </h1>

                <img
                    src={Logo}
                    alt="logo"
                    className="
                        absolute
                        bottom-0
                        right-3
                        h-14
                        w-14
                        object-contain
                    "
                />
            </NavLink>

            <div className="flex flex-col gap-1 p-3">
                {items.map((item) => (
                    <FileItem key={item} label={item!} />
                ))}
            </div>

            <div className="mt-auto border-t border-border p-4 text-xs text-muted-foreground">
                <div>
                    system status:{" "}
                    {window.location.hostname === "rio282.github.io"
                        ? "online"
                        : "offline"}
                </div>

                <div>version: {packageJson.version}</div>
            </div>
        </aside>
    )
}
