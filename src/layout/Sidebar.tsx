const items = ["projects", "experiments", "systems", "research", "about"]

export default function Sidebar() {
    return (
        <div className="w-72 border-r border-neutral-800 bg-neutral-950 p-4">
            <div className="mb-6 text-sm text-neutral-500">~/portfolio</div>

            {items.map((item) => (
                <div
                    key={item}
                    className="cursor-pointer rounded px-3 py-2 text-neutral-300 hover:bg-neutral-900"
                >
                    {item}/
                </div>
            ))}
        </div>
    )
}
