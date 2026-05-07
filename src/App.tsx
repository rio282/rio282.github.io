import Sidebar from "./layout/Sidebar"
import Workspace from "./layout/Workspace"

export default function App() {
    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <Workspace />
        </div>
    )
}
