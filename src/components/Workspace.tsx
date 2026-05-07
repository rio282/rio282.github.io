import { motion } from "framer-motion"
import { Clock3, Cpu, FolderGit2, Hammer, Wrench } from "lucide-react"

const projects = [
    {
        title: "SDL Engine",
        description:
            "Custom rendering and game architecture experiments using SDL2 and C.",
        icon: Cpu,
        type: "System",
        status: "Active",
        stack: ["C", "SDL2", "OpenGL"],
    },
    {
        title: "Electron Tooling",
        description:
            "Desktop tooling experiments with Vue, Electron and node-based systems.",
        icon: Wrench,
        type: "Tooling",
        status: "Experimental",
        stack: ["Electron", "Vue", "TypeScript"],
    },
    {
        title: "Android Research",
        description:
            "Mobile application architecture and Compose experimentation.",
        icon: Hammer,
        type: "Mobile",
        status: "Research",
        stack: ["Kotlin", "Compose", "Firebase"],
    },
]

export default function Workspace() {
    return (
        <main className="flex-1 overflow-auto bg-[#f7f1df]">
            <div className="mx-auto max-w-7xl p-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-3 flex items-center gap-2 text-sm text-[#9b8878]">
                        <FolderGit2 size={16} />
                        <span>~/projects</span>
                    </div>

                    <h1 className="mb-5 text-5xl font-bold tracking-tight text-[#3b2b24]">
                        Engineering Atlas
                    </h1>

                    <p className="max-w-3xl text-lg leading-relaxed text-[#6f5a4b]">
                        A filesystem-inspired portfolio focused on systems,
                        experiments, tooling and software engineering.
                    </p>
                </motion.div>

                {/* Terminal Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-10 flex items-center gap-3 rounded-2xl border border-[#d9c8a0] bg-[#fff8e8] px-5 py-4"
                >
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-[#d98c8c]" />
                        <div className="h-3 w-3 rounded-full bg-[#e6c16a]" />
                        <div className="h-3 w-3 rounded-full bg-[#9ec27f]" />
                    </div>

                    <div className="ml-3 text-sm text-[#6f5a4b]">
                        visitor@engineering-atlas:~$ open projects
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-[#d9c8a0] bg-[#fff8e8] p-5">
                        <div className="mb-2 text-sm text-[#9b8878]">
                            Projects
                        </div>

                        <div className="text-3xl font-bold text-[#3b2b24]">
                            12
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#d9c8a0] bg-[#fff8e8] p-5">
                        <div className="mb-2 text-sm text-[#9b8878]">
                            Experiments
                        </div>

                        <div className="text-3xl font-bold text-[#3b2b24]">
                            27
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#d9c8a0] bg-[#fff8e8] p-5">
                        <div className="mb-2 text-sm text-[#9b8878]">
                            Systems Built
                        </div>

                        <div className="text-3xl font-bold text-[#3b2b24]">
                            8
                        </div>
                    </div>
                </div>

                {/* Project Cards */}
                <div className="mt-12">
                    <div className="mb-5 text-sm uppercase tracking-[0.2em] text-[#9b8878]">
                        Active Workspace
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project, index) => {
                            const Icon = project.icon

                            return (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{
                                        y: -4,
                                    }}
                                    className="
                                        group
                                        rounded-2xl
                                        border
                                        border-[#d9c8a0]
                                        bg-[#fff8e8]
                                        p-6
                                        transition-all
                                        duration-200
                                        hover:border-[#d9a85f]
                                    "
                                >
                                    {/* Top */}
                                    <div className="mb-5 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f6d365] text-[#3b2b24]">
                                            <Icon size={22} />
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-[#9b8878]">
                                            <Clock3 size={14} />
                                            {project.status}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h2 className="mb-3 text-xl font-semibold text-[#3b2b24]">
                                        {project.title}
                                    </h2>

                                    <p className="mb-5 text-sm leading-relaxed text-[#6f5a4b]">
                                        {project.description}
                                    </p>

                                    {/* Meta */}
                                    <div className="mb-5 flex items-center gap-2">
                                        <div className="rounded-full bg-[#efe3bf] px-3 py-1 text-xs text-[#6f5a4b]">
                                            {project.type}
                                        </div>
                                    </div>

                                    {/* Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((tech) => (
                                            <div
                                                key={tech}
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-[#d9c8a0]
                                                    bg-[#f7f1df]
                                                    px-2
                                                    py-1
                                                    text-xs
                                                    text-[#6f5a4b]
                                                "
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-16 rounded-2xl border border-[#d9c8a0] bg-[#fff8e8] p-8">
                    <div className="mb-4 text-sm uppercase tracking-[0.2em] text-[#9b8878]">
                        System Notes
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-[#6f5a4b]">
                        <p>
                            This portfolio is designed as a filesystem-inspired
                            engineering environment focused on systems,
                            experiments and tooling.
                        </p>

                        <p>
                            The interface combines terminal-inspired interaction
                            patterns with modern UI conventions to remain
                            accessible for both technical and non-technical
                            visitors.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
