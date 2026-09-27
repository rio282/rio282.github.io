import { useState } from "react"
import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"
import { siIcon, siReact, siTypescript, siVite } from "simple-icons"
import SkillIcon from "../components/SkillIcon.tsx"
import portfolioImage from "../assets/projects/portfolio.png"

type Skill = {
    name: string
    icon: typeof siIcon
}

type Project = {
    name: string
    skills: Skill[]
    image: string
}

const projects: Project[] = [
    {
        name: "Portfolio",
        skills: [
            { name: "React", icon: siReact },
            { name: "Vite", icon: siVite },
            { name: "TypeScript", icon: siTypescript },
        ],
        image: portfolioImage,
    },
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    return (
        <main className="flex-1 overflow-auto bg-background">
            <div className="mx-auto max-w-7xl p-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <FolderGit2 size={16} />
                        <span>~/projects</span>
                    </div>

                    <h1 className="mb-5 text-5xl font-bold tracking-tight text-foreground">
                        Projects
                    </h1>

                    <div className="flex items-start gap-8">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                                    <th className="px-4 py-3 font-medium">
                                        Project
                                    </th>
                                    <th className="px-4 py-3 font-medium">
                                        Skills
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {projects.map((project) => {
                                    const selected =
                                        selectedProject?.name === project.name

                                    return (
                                        <tr
                                            key={project.name}
                                            onClick={() =>
                                                setSelectedProject(
                                                    selectedProject?.name ===
                                                        project.name
                                                        ? null
                                                        : project
                                                )
                                            }
                                            className={`
                                                cursor-pointer transition-colors
                                                ${
                                                    selected
                                                        ? "bg-muted"
                                                        : "hover:bg-muted/60"
                                                }
                                            `}
                                        >
                                            <td className="px-4 py-3 font-medium text-foreground">
                                                {project.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {project.skills.map(
                                                        (skill) => (
                                                            <span
                                                                key={skill.name}
                                                                title={
                                                                    skill.name
                                                                }
                                                                className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground"
                                                            >
                                                                <SkillIcon
                                                                    icon={
                                                                        skill.icon
                                                                    }
                                                                />
                                                                {skill.name}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {selectedProject && (
                            <motion.div
                                key={selectedProject.name}
                                className="w-96 shrink-0 overflow-hidden rounded-sm border border-border"
                                initial={{
                                    opacity: 0,
                                    x: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                }}
                            >
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.name}
                                    className="h-auto w-full object-cover select-none pointer-events-none"
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
