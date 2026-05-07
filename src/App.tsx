import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"

export default function App() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#f7f1df] text-[#3b2b24]">
            <Sidebar />
            <Workspace />
        </div>
    )
}
