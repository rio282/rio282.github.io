import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"

type Heading = {
    id: string
    text: string
    level: number
}

export default function DevLog() {
    const contentRef = useRef<HTMLElement>(null)
    const [headings, setHeadings] = useState<Heading[]>([])

    useEffect(() => {
        const content = contentRef.current
        if (!content) return

        const updateTOC = () => {
            const elements = content.querySelectorAll("h2, h3")

            const usedIds = new Set<string>()
            const result: Heading[] = []

            elements.forEach((element) => {
                const text = element.textContent?.trim()
                if (!text) return

                let id = element.id

                if (!id) {
                    const slug = text
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .trim()
                        .replace(/\s+/g, "-")

                    id = slug || "heading"
                    let suffix = 2

                    while (usedIds.has(id) || document.getElementById(id)) {
                        id = `${slug || "heading"}-${suffix++}`
                    }

                    element.id = id
                }

                usedIds.add(id)

                result.push({
                    id,
                    text,
                    level: Number(element.tagName.substring(1)),
                })
            })

            setHeadings(result)
        }

        updateTOC()

        const observer = new MutationObserver(updateTOC)

        observer.observe(content, {
            childList: true,
            subtree: true,
            characterData: true,
        })

        return () => observer.disconnect()
    }, [])

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
                        <span>~/-zdevlog</span>
                    </div>

                    <h1 className="mb-8 text-5xl font-bold tracking-tight text-foreground">
                        DevLog
                    </h1>

                    {/* Automatically generated Table of Contents */}
                    <nav className="mb-12 rounded-lg border border-border p-5">
                        <h2 className="mb-4 text-lg font-semibold text-foreground">
                            Table of Contents
                        </h2>

                        <ol className="space-y-2">
                            {headings.map((heading) => (
                                <li
                                    key={heading.id}
                                    className={
                                        heading.level === 3 ? "ml-6" : ""
                                    }
                                >
                                    <a
                                        href={`#${heading.id}`}
                                        className="text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {heading.level === 3 ? "↳ " : ""}
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ol>
                    </nav>

                    <article ref={contentRef} className="space-y-12">
                        <section
                            id="sprint-1"
                            className="scroll-mt-8 space-y-8"
                        >
                            <h2 className="text-3xl font-semibold mb-2">
                                Sprint 1 — Orientation, Introduction & Setup
                            </h2>

                            <p className="border-t border-border text-sm text-muted-foreground">
                                Last edited:{" "}
                                {new Date("11 october 2026").toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>

                            <p className="leading-7 text-muted-foreground">
                                During the first sprint, I focused on
                                establishing a foundation for the team's
                                technical documentation, developing the first
                                biometric sensor implementation, and exploring
                                the (software integration with) Reachy.
                                Alongside the technical work, I took on a
                                guiding role within the team, helping maintain
                                an overview of the project's progress and
                                facilitating communication. I also established
                                direct contact with the project owner and became
                                the primary point of contact for our project.
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Sprint planning and scope adjustments
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    After the first meeting with the project
                                    owner, we established three main goals for
                                    the sprint. The first was to get a working
                                    processing pipeline in place, the second was
                                    to establish communication with Reachy, and
                                    the third was to research the significance
                                    of biometric data and what different
                                    measurements could tell us about a person's
                                    state.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    As development progressed, it became clear
                                    that achieving these goals simultaneously
                                    would be too ambitious for a single sprint.
                                    Getting Reachy working in a simulated
                                    environment and establishing a functional
                                    processing pipeline already required
                                    considerable time and technical exploration.
                                    We therefore decided to postpone the
                                    research into the interpretation and
                                    significance of biometric data so that we
                                    could prioritize establishing the technical
                                    foundations first.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This adjustment allowed us to focus on
                                    making the individual components work before
                                    introducing the additional complexity of
                                    interpreting biometric measurements. The
                                    research remains relevant to the overall
                                    project and can be addressed in a subsequent
                                    phase, once the technical foundation is
                                    sufficiently established.
                                </p>
                            </div>

                            {/* Team coordination and communication */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Team coordination and communication
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Besides working on the technical components,
                                    I took on a leadership role within the team.
                                    Rather than directing every individual task,
                                    I aimed to provide guidance, help maintain a
                                    shared understanding of the project's
                                    direction, and support the team in making
                                    progress on its different components. This
                                    involved taking initiative where needed
                                    while allowing team members to work
                                    independently on their assigned
                                    responsibilities.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also contacted the project owner and
                                    became the primary point of contact for the
                                    project. This established a direct
                                    communication channel between our team and
                                    the project owner, making it easier to
                                    discuss progress, clarify expectations, and
                                    communicate relevant questions or updates. I
                                    took responsibility for maintaining this
                                    contact and helping ensure that information
                                    could be communicated between the different
                                    stakeholders.
                                </p>
                            </div>
                            {/* Documentation */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Setting up the documentation
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    One of my first tasks was setting up the{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        team's documentation
                                    </a>{" "}
                                    using MkDocs. The goal was to create a
                                    central and structured place where we could
                                    document our progress, technical decisions,
                                    hardware configurations, and software
                                    implementations. Having this documentation
                                    available from the beginning was important
                                    because the project involved multiple
                                    components and team members working on
                                    different parts of the system.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I organized the documentation so that
                                    information about the different
                                    environments, hardware, software, and
                                    integration processes could be documented
                                    separately. This gave the team a shared
                                    reference point for understanding how the
                                    different components worked and how they
                                    could eventually be brought together. It
                                    also provided a place to record technical
                                    progress and make relevant information
                                    accessible to the entire team and project
                                    owner.
                                </p>
                            </div>
                            {/* PulseSensor */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Getting the PulseSensor working
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    After setting up the documentation, I
                                    started exploring the PulseSensor and how it
                                    measures a person's pulse. During the
                                    initial phase, I familiarized myself with
                                    the hardware, tested its functionality, and
                                    investigated how to interpret the data it
                                    produced. These tests confirmed that the
                                    sensor was functioning as expected and could
                                    provide the pulse measurements needed for
                                    further development.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Once the basic functionality was
                                    established, I moved on to developing a way
                                    to access the sensor's measurements through
                                    the ESP32's network connection. The goal was
                                    to make the data available through a web
                                    interface instead of requiring a direct
                                    connection to the device or continuous
                                    monitoring through the serial monitor. This
                                    would make the measurements more accessible
                                    to other components and provide a foundation
                                    for future integration.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    More technical details can be found in the
                                    documentation:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/pulse/setup/hardware/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            PulseSensor hardware setup
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/pulse/setup/software/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            PulseSensor software setup
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Implementing network communication
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    The next step was to develop a web-based
                                    implementation for the ESP32. I explored how
                                    the ESP32 could function as a web server and
                                    communicate with a browser client. This
                                    required developing a way to transmit
                                    measurements from the sensor and handle the
                                    data on the client side.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    As the implementation developed, I moved
                                    towards an asynchronous web server with
                                    WebSocket support. Unlike traditional HTTP
                                    communication, WebSockets allowed for a
                                    persistent, bidirectional connection between
                                    the ESP32 and the browser. This makes it
                                    possible to transmit new measurements
                                    continuously without requiring the browser
                                    to repeatedly request updated data.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The asynchronous approach also provides a
                                    better foundation for handling network
                                    communication while allowing the device to
                                    continue performing other tasks. The
                                    resulting implementation made it possible to
                                    receive the ESP32's sensor data through a
                                    web interface, available at{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/tree/main/src/pulse-sensor/test?ref_type=heads"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            src/pulse/test/index.html
                                        </a>
                                    </code>
                                    .
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    While I focused on the PulseSensor, another
                                    team member worked on the breathing sensor
                                    (from Elastech). This allowed us to develop
                                    the two biometric sensing components in
                                    parallel, with each component progressing
                                    independently towards eventual integration.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    More technical details can be found in the
                                    documentation:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/pulse/api-and-integration/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            PulseSensor API and integration
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Reachy simulation */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Progress on Reachy (in Simulation mode)
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    In parallel with the sensor development, I
                                    explored how we could begin developing the
                                    Reachy integration without having access to
                                    the physical robot. The aim was to establish
                                    a development environment that would allow
                                    us to test the software independently of the
                                    hardware. During this exploration, I
                                    discovered that Reachy provides a simulation
                                    mode. Although simulation has limitations
                                    compared with working with the physical
                                    robot, it allows us to develop and test
                                    significant parts of the software in
                                    advance.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    To verify the environment, I created a
                                    simple test program and confirmed that the
                                    simulation was configured correctly and
                                    could execute code successfully. With this
                                    initial test working, I moved on to
                                    establishing the basic structure of the
                                    application.
                                </p>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Establishing the processing pipeline
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    I started with a basic processing pipeline
                                    consisting of an input, a large language
                                    model (LLM), and an output. The purpose was
                                    to verify that information could flow
                                    through the different components and that
                                    the system could process an input and
                                    produce a corresponding response. Once this
                                    basic pipeline was working, I began
                                    extending it to support spoken input rather
                                    than relying exclusively on text.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I developed the audio integration
                                    incrementally, replacing the initial
                                    components with more advanced
                                    implementations as the pipeline evolved.
                                    This made it possible to test individual
                                    stages and identify potential problems
                                    before introducing additional complexity.
                                    The resulting structure captures spoken
                                    audio, processes it, and converts it into
                                    text before passing it to the conversation
                                    model.
                                </p>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Asynchronous audio processing
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    An important improvement was changing the
                                    audio-listening component from a synchronous
                                    to an asynchronous implementation. In the
                                    original approach, listening for audio could
                                    block the execution of other parts of the
                                    program while waiting for input. This could
                                    limit the responsiveness of the application
                                    as additional components were introduced.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    By making audio listening asynchronous, the
                                    application can continue performing other
                                    tasks while audio is being received and
                                    processed. This provides a more suitable
                                    foundation for a system that needs to handle
                                    multiple operations concurrently. The same
                                    principle can be applied to speech-to-text
                                    and LLM processing in subsequent development
                                    stages, helping prevent computationally
                                    intensive operations from unnecessarily
                                    blocking the rest of the pipeline.
                                </p>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Modular architecture and the factory pattern
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Another important design decision was to
                                    implement the different components using the
                                    factory pattern. Rather than tightly
                                    coupling the pipeline to specific
                                    implementations, factories provide a
                                    structured way to create and replace
                                    individual components. For example, this
                                    makes it easier to switch between different
                                    LLMs without redesigning the entire
                                    pipeline. The same approach can be applied
                                    to speech recognition and, in the future,
                                    text-to-speech (TTS).
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This modular design makes the system easier
                                    to extend and allows us to experiment with
                                    different technologies. At this stage, the
                                    conversation component primarily establishes
                                    the communication flow and does not yet
                                    incorporate biometric measurements or
                                    specialized prompts for interpreting them.
                                    This provides a foundation for future
                                    development while the relevant AI and
                                    human-computer interaction research
                                    continues.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The current pipeline is documented here:{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/pipeline/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        Reachy pipeline documentation
                                    </a>
                                    .
                                </p>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Outcome and next steps for Reachy
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    The simulation provided a practical starting
                                    point for developing Reachy's software
                                    independently of the physical hardware. I
                                    established a working input-to-output
                                    pipeline, introduced spoken audio as an
                                    input source, and developed a modular
                                    architecture that supports future
                                    extensions.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The next steps include making the
                                    speech-to-text and LLM components
                                    asynchronous, implementing text-to-speech
                                    using the same modular design principles,
                                    and integrating biometric data into the
                                    conversation system. These developments will
                                    help move the system towards a more complete
                                    implementation in which Reachy can receive
                                    spoken input, process relevant data, and
                                    generate appropriate responses.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    More information can be found in the
                                    documentation:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/setup/software/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Reachy software setup
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/pipeline/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Reachy pipeline
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Sprint summary */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Sprint 1 conclusion
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    The first sprint established several
                                    foundations for the project: a shared
                                    documentation environment, a PulseSensor
                                    implementation capable of transmitting
                                    measurements over a network, and an initial
                                    Reachy simulation pipeline supporting spoken
                                    input. Alongside these technical
                                    contributions, I took responsibility for
                                    maintaining communication with the project
                                    owner and adopted a guiding leadership role
                                    within the team. Together, these activities
                                    provided a starting point for further
                                    development and integration in the following
                                    sprints.
                                </p>
                            </div>
                        </section>
                        <section>
                            <h2 className="mb-4 border-b border-border pb-3 text-3xl font-semibold tracking-tight text-foreground">
                                Sprint 2
                            </h2>

                            <p className="text-muted-foreground">
                                Coming soon...
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 border-b border-border pb-3 text-3xl font-semibold tracking-tight text-foreground">
                                Sprint 3
                            </h2>

                            <p className="text-muted-foreground">
                                Coming soon...
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 border-b border-border pb-3 text-3xl font-semibold tracking-tight text-foreground">
                                Sprint 4
                            </h2>

                            <p className="text-muted-foreground">
                                Coming soon...
                            </p>
                        </section>
                    </article>
                </motion.div>
            </div>
        </main>
    )
}
