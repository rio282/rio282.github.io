import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"

export default function Archive() {
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
                        <span>~/archive</span>
                    </div>

                    <h1 className="mb-5 text-5xl font-bold tracking-tight text-foreground">
                        Archive
                    </h1>

                    <div>@TODO</div>
                </motion.div>
            </div>
        </main>
    )
}
