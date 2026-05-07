import FileItem from "./FileItem"

const items = [
    "projects",
    "experiments",
    "systems",
    "research",
    "archive",
    "about",
]

export default function Sidebar() {
    return (
        <aside className="flex w-72 flex-col border-r border-[#d9c8a0] bg-[#efe3bf]">
            <div className="border-b border-[#d9c8a0] p-5">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-[#9b8878]">
                    Filesystem
                </div>

                <h1 className="text-lg font-semibold text-[#3b2b24]">
                    ~/rio282/
                </h1>
            </div>

            <div className="flex flex-col gap-1 p-3">
                <FileItem label="projects" active />

                {items
                    .filter((item) => item !== "projects")
                    .map((item) => (
                        <FileItem key={item} label={item} />
                    ))}
            </div>

            <div className="mt-auto border-t border-[#d9c8a0] p-4 text-xs text-[#9b8878]">
                <div>system status: online</div>
                {/* TODO: use package.json version */}
                <div>version: 0.1.0</div>
            </div>
        </aside>
    )
}
