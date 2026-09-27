import Sidebar from "./components/Sidebar"
import Projects from "./views/Projects.tsx"

export default function App() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
            <Sidebar />
            <Projects />
        </div>
    )
}
