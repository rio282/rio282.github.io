import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { SquareTerminal } from "lucide-react"

type CommandOutput = {
    command: string
    lines: string[]
}

const commands = ["help", "about", "projects", "skills", "cv", "ls", "clear"]

const commandDescriptions: Record<string, string> = {
    help: "show available commands",
    about: "about me",
    projects: "open projects",
    skills: "show technical skills",
    cv: "open my CV",
    ls: "list available sections",
    clear: "clear the terminal",
}

export default function Terminal() {
    const navigate = useNavigate()

    const [input, setInput] = useState("")
    const [outputs, setOutputs] = useState<CommandOutput[]>([])

    const [commandHistory, setCommandHistory] = useState<string[]>([])
    const [historyIndex, setHistoryIndex] = useState(-1)

    const inputRef = useRef<HTMLInputElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        terminalRef.current?.scrollTo({
            top: terminalRef.current.scrollHeight,
            behavior: "smooth",
        })
    }, [outputs])

    function executeCommand(command: string) {
        switch (command) {
            case "help":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: [
                            "Available commands:",
                            "",
                            "  help       Show available commands",
                            "  about      About me",
                            "  projects   Open projects",
                            "  skills     Show technical skills",
                            "  cv         Open my CV",
                            "  ls         List available sections",
                            "  clear      Clear the terminal",
                        ],
                    },
                ])
                break

            case "about":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: [
                            "About",
                            "-----",
                            "",
                            "Hi, I'm Rio.",
                            "",
                            "I build software, experiment with systems,",
                            "and explore interesting ideas through code.",
                            "",
                            "Navigate to /about for more information.",
                        ],
                    },
                ])

                navigate("/about")
                break

            case "projects":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: ["Opening projects..."],
                    },
                ])

                navigate("/projects")
                break

            case "skills":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: [
                            "Technical skills",
                            "----------------",
                            "",
                            "Frontend",
                            "  React",
                            "  TypeScript",
                            "  Vite",
                            "  Tailwind CSS",
                            "",
                            "Backend",
                            "  Python",
                            "  Node.js",
                            "",
                            "Tools",
                            "  Git",
                            "  Linux",
                            "  Docker",
                        ],
                    },
                ])
                break

            case "cv":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: ["Opening CV..."],
                    },
                ])

                navigate("/cv")
                break

            case "ls":
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: [
                            "projects/",
                            "experiments/",
                            "systems/",
                            "research/",
                            "archive/",
                            "about/",
                            "cv/",
                        ],
                    },
                ])
                break

            default:
                setOutputs((current) => [
                    ...current,
                    {
                        command,
                        lines: [
                            `command not found: ${command}`,
                            "",
                            "Type 'help' to see available commands.",
                        ],
                    },
                ])
        }
    }

    function runCommand() {
        const command = input.trim().toLowerCase()

        if (!command) {
            return
        }

        if (command === "clear") {
            setOutputs([])
            setInput("")
            setHistoryIndex(-1)
            return
        }

        executeCommand(command)

        setCommandHistory((current) => {
            // Don't add duplicate consecutive commands
            if (current[current.length - 1] === command) {
                return current
            }

            return [...current, command]
        })

        setHistoryIndex(-1)
        setInput("")
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault()
            runCommand()
            return
        }

        if (event.key === "ArrowUp") {
            event.preventDefault()

            if (commandHistory.length === 0) {
                return
            }

            const nextIndex =
                historyIndex === -1
                    ? commandHistory.length - 1
                    : Math.max(0, historyIndex - 1)

            setHistoryIndex(nextIndex)
            setInput(commandHistory[nextIndex])

            return
        }

        if (event.key === "ArrowDown") {
            event.preventDefault()

            if (historyIndex === -1) {
                return
            }

            const nextIndex = historyIndex + 1

            if (nextIndex >= commandHistory.length) {
                setHistoryIndex(-1)
                setInput("")
                return
            }

            setHistoryIndex(nextIndex)
            setInput(commandHistory[nextIndex])

            return
        }

        if (event.key === "Tab") {
            event.preventDefault()

            const value = input.trim().toLowerCase()

            if (!value) {
                return
            }

            const matches = commands.filter((command) =>
                command.startsWith(value)
            )

            if (matches.length === 1) {
                setInput(matches[0])
                return
            }

            if (matches.length > 1) {
                setOutputs((current) => [
                    ...current,
                    {
                        command: input,
                        lines: [
                            "Possible commands:",
                            "",
                            ...matches.map((command) => `  ${command}`),
                        ],
                    },
                ])
            }
        }
    }

    function focusTerminal() {
        inputRef.current?.focus()
    }

    return (
        <main className="flex-1 overflow-auto bg-background">
            <div className="mx-auto max-w-7xl p-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <SquareTerminal size={16} />
                        <span>~/rio282/</span>
                    </div>

                    <div
                        ref={terminalRef}
                        onClick={focusTerminal}
                        className="
                            h-162.5
                            overflow-y-auto
                            rounded-lg
                            border
                            border-border
                            bg-secondary
                            p-6
                            font-mono
                            text-sm
                            text-secondary-foreground
                            shadow-sm
                        "
                    >
                        {/* welcome message */}
                        <div className="mb-6">
                            <div className="text-primary">
                                Welcome to ~/rio282
                            </div>

                            <div className="mt-2">
                                This is an interactive portfolio terminal.
                            </div>

                            <div>
                                Type{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setInput("help")
                                        inputRef.current?.focus()
                                    }}
                                    className="text-primary underline decoration-dotted underline-offset-4 hover:opacity-80 cursor-pointer"
                                >
                                    help
                                </button>{" "}
                                to see available commands.
                            </div>
                        </div>

                        {/* command output */}
                        {outputs.map((output, index) => (
                            <div key={index} className="mb-5">
                                <div className="flex">
                                    <span className="mr-2 shrink-0 text-primary">
                                        ~/rio282 $
                                    </span>

                                    <span>{output.command}</span>
                                </div>

                                <div className="mt-2 whitespace-pre-wrap">
                                    {output.lines.map((line, lineIndex) => (
                                        <div key={lineIndex}>
                                            {line || "\u00A0"}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Current prompt */}
                        <div className="flex items-center">
                            <span className="mr-2 shrink-0 text-primary">
                                ~/rio282 $
                            </span>

                            <input
                                ref={inputRef}
                                value={input}
                                onChange={(event) => {
                                    setInput(event.target.value)
                                    setHistoryIndex(-1)
                                }}
                                onKeyDown={handleKeyDown}
                                className="
                                    min-w-0
                                    flex-1
                                    bg-transparent
                                    text-secondary-foreground
                                    outline-none
                                    placeholder:text-muted-foreground
                                "
                                autoComplete="off"
                                autoCapitalize="off"
                                autoCorrect="off"
                                spellCheck={false}
                                aria-label="Terminal command"
                            />

                            {/* TODO: cursor */}
                            {/*<span className="ml-1 h-4 w-2 animate-pulse bg-primary" />*/}
                        </div>
                    </div>

                    {/* help bar */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>
                            <kbd className="font-mono text-foreground">
                                Enter
                            </kbd>{" "}
                            execute
                        </span>

                        <span>
                            <kbd className="font-mono text-foreground">↑↓</kbd>{" "}
                            history
                        </span>

                        <span>
                            <kbd className="font-mono text-foreground">Tab</kbd>{" "}
                            autocomplete
                        </span>

                        <span>
                            <kbd className="font-mono text-foreground">
                                help
                            </kbd>{" "}
                            commands
                        </span>
                    </div>

                    {/* command references */}
                    <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                        {commands
                            .filter((command) => command !== "clear")
                            .map((command) => (
                                <button
                                    key={command}
                                    type="button"
                                    onClick={() => {
                                        setInput(command)
                                        inputRef.current?.focus()
                                    }}
                                    className="
                                        rounded-md
                                        border
                                        border-border
                                        bg-background
                                        px-3
                                        py-2
                                        text-left
                                        transition-colors
                                        hover:bg-muted
                                    "
                                >
                                    <div className="font-mono text-sm text-primary">
                                        {command}
                                    </div>

                                    <div className="mt-1 text-xs text-muted-foreground">
                                        {commandDescriptions[command]}
                                    </div>
                                </button>
                            ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
