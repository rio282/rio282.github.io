import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import Projects from "./views/Projects"
import Archive from "./views/Archive"
import About from "./views/About"
import CV from "./views/CV"
import Terminal from "./views/Terminal"

export default function App() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
            <Sidebar />

            <main className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cv" element={<CV />} />
                    <Route path="*" element={<Terminal />} />
                </Routes>
            </main>
        </div>
    )
}
