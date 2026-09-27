import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"

export default function Projects() {
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

                    <div className="flex items-center gap-12">
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
                                <tr className="transition-colors hover:bg-muted/60">
                                    <td className="px-4 py-3 font-medium text-foreground">
                                        The Sliding Mr. Bones (Next Stop,
                                        Pottersville)
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        Malcolm Lockyer
                                    </td>
                                </tr>

                                <tr className="transition-colors hover:bg-muted/60">
                                    <td className="px-4 py-3 font-medium text-foreground">
                                        Witchy Woman
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        The Eagles
                                    </td>
                                </tr>

                                <tr className="transition-colors hover:bg-muted/60">
                                    <td className="px-4 py-3 font-medium text-foreground">
                                        Shining Star
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        Earth, Wind, and Fire
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="border">
                            <img
                                src="https://static.wikia.nocookie.net/hellokitty/images/3/30/Sanrio_Characters_Pompompurin_Image006.png/revision/latest?cb=20170401200050"
                                alt="pompompurin"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
