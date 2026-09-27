import packageJson from "../../package.json"
import FileItem from "./FileItem"

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
    .filter(Boolean)
    .reverse()

export default function Sidebar() {
    return (
        <aside className="flex w-72 flex-col border-r border-border bg-secondary">
            <div className="border-b border-border p-5">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Filesystem
                </div>

                <h1 className="text-lg font-semibold text-secondary-foreground">
                    ~/rio282/
                </h1>
            </div>

            <div className="flex flex-col gap-1 p-3">
                {items
                    .map((item) => (
                        <FileItem key={item} label={item!} active={item === window.location.pathname.split("/").pop()} />
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
