import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FolderGit2 } from "lucide-react"
import heartRateWebUiImage from "../assets/img/devlog/heart-rate-web-ui.png"
import heartRateWebUiWithHandImage from "../assets/img/devlog/heart-rate-web-ui-with-hand.png"
import heartRateEspWithHandImage from "../assets/img/devlog/heart-rate-esp-with-hand.png"
import reachyPlainSimImage from "../assets/img/devlog/reachy-sim-plain.png"
import societySetupImage from "../assets/img/devlog/society-setup.png"
import societyWebpanelImage from "../assets/img/devlog/society-web-panel.png"

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

                            <p className="border-t border-border text-sm text-muted-foreground pt-2">
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

                                <figure className="mx-auto my-6 max-w-md text-center">
                                    <img
                                        src={heartRateEspWithHandImage}
                                        alt="Hand placed on the heart rate sensor connected to the ESP32"
                                        className="h-auto w-full rounded-lg border border-border object-contain"
                                        loading="lazy"
                                    />

                                    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                                        My girlfriend wearing the PulseSensor;
                                        connected to the ESP32 while measuring
                                        her pulse.
                                    </figcaption>
                                </figure>

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

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <figure className="min-w-0">
                                        <img
                                            src={heartRateWebUiImage}
                                            alt="Heart rate web interface displaying sensor measurements"
                                            className="h-auto w-full rounded-lg border border-border object-contain"
                                            loading="lazy"
                                        />
                                        <figcaption className="mt-2 text-center text-sm leading-6 text-muted-foreground">
                                            Web interface displaying the pulse
                                            measurements received from the
                                            ESP32.
                                        </figcaption>
                                    </figure>

                                    <figure className="min-w-0">
                                        <img
                                            src={heartRateWebUiWithHandImage}
                                            alt="Heart rate web interface with a hand placed on the sensor"
                                            className="h-auto w-full rounded-lg border border-border object-contain"
                                            loading="lazy"
                                        />
                                        <figcaption className="mt-2 text-center text-sm leading-6 text-muted-foreground">
                                            Web interface during a live
                                            measurement with my girlfriend's
                                            hand placed on the PulseSensor.
                                        </figcaption>
                                    </figure>
                                </div>

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

                                <figure className="mx-auto my-6 max-w-md text-center">
                                    <img
                                        src={reachyPlainSimImage}
                                        alt="Reachy's simulated environment"
                                        className="h-auto w-full rounded-lg border border-border object-contain"
                                        loading="lazy"
                                    />

                                    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                                        Reachy in his simulated environment.
                                    </figcaption>
                                </figure>

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

                        <section
                            id="sprint-2"
                            className="scroll-mt-8 space-y-8"
                        >
                            <h2 className="text-3xl font-semibold mb-2">
                                Sprint 2 — Team Coordination, Reachy Integration
                                & Society 5.0
                            </h2>

                            <p className="border-t border-border text-sm text-muted-foreground pt-2">
                                Last edited:{" "}
                                {new Date().toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>

                            <p className="leading-7 text-muted-foreground">
                                During the second sprint, my focus shifted
                                towards managing the team more actively while
                                developing a working prototype for Society 5.0.
                                After establishing the initial technical
                                foundations in the previous sprint, we could
                                finally start bringing the different components
                                together around the physical Reachy Mini robot.
                                My responsibilities involved developing the
                                integration between physiological sensors and
                                Reachy, designing the interaction modes for our
                                prototype, and coordinating the work of the
                                other team members. We also had the opportunity
                                to demonstrate our progress at Society 5.0,
                                where we gathered our first experiences with
                                testing the prototype in an actual event
                                environment.
                            </p>

                            {/* Team coordination */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Team coordination and delegation
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Compared with the first sprint, I took on a
                                    more active role in coordinating the team's
                                    activities. As the project progressed, there
                                    were more parallel tasks that needed to be
                                    completed before we could demonstrate a
                                    working prototype. Rather than attempting to
                                    implement everything myself, I distributed
                                    responsibilities across the team and tried
                                    to make sure that everyone was contributing
                                    towards the same overall goal.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    When the physical Reachy Mini finally
                                    arrived, I assigned our embedded engineer
                                    the responsibility of assembling the robot
                                    and documenting the process. This allowed
                                    the hardware setup to progress independently
                                    while I focused on the software integration.
                                    The assembly process can be found in the{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/setup/reachy_process/reachy-building/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        Reachy Mini building documentation
                                    </a>
                                    .
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also assigned the same team member the
                                    responsibility of finalising the breathing
                                    sensor's hardware setup, connecting it to
                                    the system, and documenting its software
                                    implementation. Having this responsibility
                                    assigned separately allowed me to focus on
                                    the integration between the sensors and
                                    Reachy's conversational application. The
                                    resulting implementation is documented in
                                    the{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/breathing/setup/software/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        breathing sensor software documentation
                                    </a>
                                    .
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Alongside the hardware work, I delegated
                                    research tasks to our AI engineers. I asked
                                    both of them to investigate how different
                                    physiological measurements could be used to
                                    distinguish between physiological states and
                                    how these states might relate to emotions.
                                    Once this research was completed, they
                                    continued by developing and refining the
                                    prompts that would be used by Reachy's
                                    conversation system. I also assigned our
                                    other creative technologist the
                                    responsibility of creating a test plan for
                                    Society 5.0.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    However, I noticed that managing the team
                                    required considerably more effort than I had
                                    initially anticipated. Some team members
                                    were not particularly proactive in taking
                                    initiative themselves, meaning I frequently
                                    had to follow up on tasks, provide
                                    direction, and ensure that work continued
                                    progressing. This created a challenge in
                                    balancing my own technical contributions
                                    with the responsibility of keeping the
                                    entire team moving.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This made me realise that effective
                                    leadership is not simply about distributing
                                    tasks. It also involves creating an
                                    environment in which team members understand
                                    their responsibilities and take ownership of
                                    their work. In the next sprint, I want to
                                    address this more directly and discuss how
                                    we can improve initiative and accountability
                                    within the team. My goal is to move away
                                    from having to continuously drive everyone's
                                    progress myself and towards a team that can
                                    work more independently.
                                </p>
                            </div>

                            {/* Reachy integration */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Integrating the Reachy Mini conversation
                                    application
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    With the physical Reachy Mini available, one
                                    of our main objectives became establishing a
                                    reliable way to communicate with the robot.
                                    Instead of building an entirely new
                                    conversational application from scratch, I
                                    investigated existing implementations and
                                    decided to use Hugging Face's{" "}
                                    <a
                                        href="https://github.com/pollen-robotics/reachy_mini_conversation_app"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        Reachy Mini Conversation App
                                    </a>{" "}
                                    as a starting point.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This application already provided a
                                    functional foundation for spoken interaction
                                    with Reachy, including its conversational
                                    architecture and web interface. Reusing this
                                    implementation allowed me to focus on
                                    adapting and extending the application
                                    instead of spending time recreating
                                    functionality that was already available.
                                    After setting it up, I cleaned up parts of
                                    the implementation and adjusted its
                                    structure to better suit our project's
                                    requirements.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Once the basic application was running, I
                                    started experimenting with adding custom
                                    tools. These tools would allow the
                                    conversation model to access external
                                    information and interact with our
                                    physiological sensor implementations. This
                                    was an important step towards making Reachy
                                    more than a conventional conversational
                                    robot, as it would allow its responses and
                                    behaviour to be influenced by physiological
                                    information.
                                </p>
                            </div>

                            {/* Society 5.0 design */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Defining the Society 5.0 interaction modes
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    After discussing the intended direction of
                                    the prototype with our project
                                    manager/project owner, we established that
                                    Society 5.0 would require two distinct
                                    interaction modes: Interpret and Mirror.
                                    These modes represent two different ways in
                                    which Reachy can interact with physiological
                                    information.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The first mode, <strong>Interpret</strong>,
                                    focuses on interpreting live physiological
                                    measurements, primarily heart rate and
                                    breathing. The intention is to provide the
                                    conversational model with physiological
                                    information that it can use when generating
                                    its responses.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The second mode, <strong>Mirror</strong>,
                                    takes a different approach. Rather than
                                    explicitly interpreting the measurements and
                                    describing them, Reachy should reflect the
                                    physiological state through its own speech
                                    and movements. For example, its
                                    conversational behaviour and physical
                                    expressions should change depending on the
                                    physiological input.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I chose to build upon the existing
                                    conversation application because it already
                                    provided the interaction foundation we
                                    needed. Extending it with custom tools and a
                                    separate physiological data layer allowed us
                                    to experiment with both modes without having
                                    to redesign the entire application. This
                                    also provided a modular foundation for
                                    further development.
                                </p>
                            </div>

                            {/* Physiological clients */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Implementing the physiological sensor
                                    clients
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    My first implementation step was connecting
                                    the physiological sensors to the
                                    conversation application. I created two
                                    tools,{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/external_content/external_tools/pulse_sensor_tool.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            pulse_sensor_tool
                                        </a>
                                    </code>{" "}
                                    and{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/external_content/external_tools/breathing_sensor_tool.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            breathing_sensor_tool
                                        </a>
                                    </code>
                                    , which would expose the sensor measurements
                                    to the conversational system.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    To avoid implementing the same communication
                                    logic separately for each sensor, I designed
                                    a shared base class called{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/tools/libs/ext_sensors/__init__.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            PhysiologicalClient
                                        </a>
                                    </code>
                                    . Both{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/tools/libs/ext_sensors/pulse/client.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            PulseClient
                                        </a>
                                    </code>{" "}
                                    and{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/tools/libs/ext_sensors/breathing/client.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            BreathingClient
                                        </a>
                                    </code>{" "}
                                    inherit from this class and implement their
                                    own sensor-specific message parsing.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        PhysiologicalClient
                                    </code>{" "}
                                    manages its WebSocket connection in a
                                    background thread and stores the latest
                                    measurement so that the main application can
                                    access it without blocking its execution.
                                    Sensor-specific parsing is handled through
                                    the{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        _handle_message()
                                    </code>{" "}
                                    method, which is implemented by the
                                    individual subclasses.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This architecture separates the shared
                                    communication functionality from the
                                    implementation details of individual
                                    sensors. Consequently, adding another
                                    physiological sensor does not require
                                    rewriting the entire communication layer.
                                    Instead, a new client can inherit from the
                                    base class and implement the appropriate
                                    message parsing logic.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also documented this architecture so that
                                    other team members could understand how it
                                    works and how additional sensors can be
                                    integrated. The documentation can be found
                                    here:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/sensors/adding_new_sensors/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Adding new physiological sensors
                                        </a>
                                    </li>
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
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/breathing/setup/software/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Breathing sensor software setup
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Mocking physiological data */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Introducing simulated physiological profiles
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    During development, we encountered an
                                    important limitation when trying to
                                    demonstrate different physiological states
                                    through real sensor measurements.
                                    Physiological measurements are influenced by
                                    many different factors. For example,
                                    physical activity can significantly
                                    influence both heart rate and heart rate
                                    variability, as well as breathing patterns.
                                    This makes it difficult to reliably
                                    distinguish between different emotional
                                    states using real measurements alone.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    We realised that trying to demonstrate
                                    specific emotional states through
                                    uncontrolled physiological measurements
                                    would make the prototype difficult to test
                                    consistently. A person might show an
                                    increased heart rate because of physical
                                    activity rather than stress, for example.
                                    This would make it difficult to demonstrate
                                    how the system should respond to specific
                                    states.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    After discussing this limitation, we decided
                                    to introduce a separate profile called{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        Mirror(society)
                                    </code>
                                    . Instead of relying on actual physiological
                                    measurements, this profile would use
                                    predefined, simulated physiological data. We
                                    selected four states that would represent
                                    different scenarios:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>Resting / Idle</li>
                                    <li>Physical Activity</li>
                                    <li>Tired</li>
                                    <li>Stressed</li>
                                </ul>

                                <p className="leading-7 text-muted-foreground">
                                    This allowed us to control the physiological
                                    input and demonstrate how Reachy should
                                    respond to each state. It also made it
                                    possible to test the interaction without
                                    depending on the physiological condition of
                                    the person wearing the sensors.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    In addition to the separate Society profile,
                                    I implemented a way to mock sensor data in
                                    the regular modes as well. This provides
                                    another way to develop and test the
                                    conversation application without requiring
                                    the physical sensors to be connected and
                                    functioning. These implementations are
                                    located under{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/tree/main/src/reachy/mocks/ws"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            mocks/ws
                                        </a>
                                    </code>{" "}
                                    in the source code.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The implementation and usage are documented
                                    in the{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/sensors/mocking_sensors/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        sensor mocking documentation
                                    </a>
                                    .
                                </p>
                            </div>

                            {/* WebUI and RPC */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Implementing the Mirror interface and RPC
                                    communication
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    After establishing the simulated profiles, I
                                    needed a way to switch between them during a
                                    demonstration. The conversation application
                                    already provided a WebUI, so I decided to
                                    extend this interface rather than creating
                                    an entirely separate application.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    One issue I encountered was the development
                                    workflow itself. The provided interface
                                    consisted of static files, meaning that
                                    changes required restarting the entire
                                    application before I could see the result.
                                    Since restarting the application took more
                                    than two minutes, this made frontend
                                    development unnecessarily slow.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    To improve this workflow, I implemented
                                    hot-reloading by connecting to the browser
                                    and allowing the interface to refresh during
                                    development. This significantly reduced the
                                    time required to test UI changes and allowed
                                    me to iterate on the interface much more
                                    efficiently.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Once this was in place, I added four buttons
                                    to the WebUI, each representing one of the
                                    predefined physiological states. Selecting a
                                    button would initiate an RPC call to the
                                    backend, allowing the interface to
                                    communicate the selected state to Reachy.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    On the backend, these calls are handled
                                    through{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/mirror_preset_routes.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            mirror_preset_routes.py
                                        </a>
                                    </code>
                                    , using the RPC method{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        mirror.preset
                                    </code>
                                    . I then registered the corresponding call
                                    in{" "}
                                    <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                                        <a
                                            href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/console.py"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            console.py
                                        </a>
                                    </code>{" "}
                                    and implemented automatic detection of the
                                    available clients. This allowed the backend
                                    to process the selected preset and provide
                                    the corresponding simulated physiological
                                    data to the application.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The mock interfaces and implementations for
                                    this functionality can be found in:
                                </p>

                                <p className="rounded-lg bg-muted px-4 py-3 font-mono text-sm text-muted-foreground">
                                    <a
                                        href="https://gitlab.fdmci.hva.nl/studio/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/-/blob/main/src/reachy/src/bio_reachy/tools/libs/mock_ext_sensors/__init__.py"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        main/src/reachy/src/bio_reachy/tools/libs/mock_ext_sensors/__init__.py
                                    </a>
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This gave us a practical interface for
                                    demonstrating the different physiological
                                    profiles without manually modifying the
                                    underlying sensor data during the
                                    demonstration.
                                </p>
                            </div>

                            {/* Breathing mirror implementation */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Extending Mirror with breathing-based
                                    movement
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Approximately one week before Society 5.0, I
                                    assigned one of our AI engineers another
                                    task: implementing a head wobble in Mirror
                                    mode that would mirror the user's live
                                    breathing pattern. The intention was to make
                                    the Mirror interaction more tangible by
                                    allowing Reachy's physical movement to
                                    reflect the user's breathing, rather than
                                    relying solely on changes in speech.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This was an additional step towards making
                                    the prototype demonstrate the relationship
                                    between physiological input and robotic
                                    behaviour. Instead of only providing
                                    information to the conversational model, we
                                    wanted the robot itself to physically
                                    reflect aspects of the user's physiological
                                    state.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    However, I have some concerns about the
                                    resulting implementation. At the time of
                                    writing, the implementation has not been
                                    documented, and I personally find the way it
                                    is structured and implemented difficult to
                                    understand. I cannot confidently explain the
                                    complete mechanism behind how the breathing
                                    measurements are translated into the head
                                    movement.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This is a good example of a problem I
                                    encountered during this sprint: delegating a
                                    task can help distribute the workload, but
                                    it does not automatically guarantee that the
                                    resulting implementation is understandable
                                    or maintainable. Without documentation and a
                                    clear explanation of the implementation, it
                                    becomes difficult for other team members to
                                    review, modify or build upon the work.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    In hindsight, I should have placed more
                                    emphasis on requiring an explanation and
                                    documentation alongside the implementation,
                                    especially given the limited time before the
                                    event. This is something I want to address
                                    in the next sprint by making technical
                                    documentation and knowledge sharing a more
                                    explicit part of delegated tasks and pull
                                    requests.
                                </p>
                            </div>

                            {/* Research and prompt engineering */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Physiological research and prompt
                                    engineering
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    While I focused on the technical
                                    implementation, I also needed the team to
                                    investigate how Reachy should interpret
                                    physiological information. Simply providing
                                    measurements to a language model does not
                                    automatically result in meaningful
                                    interpretations.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I therefore assigned our two AI engineers to
                                    research the relationship between
                                    physiological measurements and different
                                    emotional states. The goal was to establish
                                    a better understanding of how combinations
                                    of heart rate, heart rate variability and
                                    breathing patterns could provide indications
                                    about someone's physiological state.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Following this research, they worked on
                                    developing and refining the prompts that
                                    would guide the conversational model in
                                    interpreting the measurements. This involved
                                    considerable prompt engineering to achieve
                                    the intended behaviour.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The research is available in our{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/research/physiological-state-research/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        physiological state research
                                    </a>
                                    .
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also used AI myself during development,
                                    primarily to explore the existing
                                    application architecture and understand how
                                    to implement the simulated physiological
                                    states. One particularly challenging aspect
                                    was that I needed to override/inject values
                                    that were accessed inside a tool but
                                    originated from another thread.
                                    Understanding where these values were stored
                                    and how they were passed through the
                                    application required exploring several parts
                                    of the existing architecture.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I used AI to help investigate the codebase,
                                    explore possible implementation approaches
                                    and identify where the relevant values could
                                    be modified. This was useful for navigating
                                    an unfamiliar application, but I still
                                    needed to understand the resulting
                                    implementation and make sure it fitted the
                                    existing architecture.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    During this sprint, I also became
                                    increasingly aware of problems with how AI
                                    was being used by other team members. In
                                    several cases, AI-generated documentation
                                    and plans contained incorrect information,
                                    while generated code did not always meet the
                                    quality required for the project. More
                                    importantly, team members frequently didn't
                                    have a sufficient understanding of how the
                                    generated implementations actually worked.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This creates a problem beyond the quality of
                                    individual contributions: it makes it
                                    difficult for the team to maintain an
                                    accurate understanding of the system as a
                                    whole. I believe AI should support
                                    development and learning, rather than
                                    replace the understanding required to
                                    maintain and extend the software. Generated
                                    code, documentation and plans should
                                    therefore be reviewed and validated instead
                                    of being accepted without verification.
                                </p>
                            </div>

                            {/* Documentation overhaul */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Overhauling the technical documentation
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Besides documenting individual
                                    implementations, I also decided to overhaul
                                    the documentation environment itself. The
                                    original setup had served as a useful
                                    starting point, but as the project grew, I
                                    felt that it needed a more professional
                                    appearance and a structure that better
                                    supported our technical needs.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I reorganised the documentation to make it
                                    easier to navigate and to provide a clearer
                                    separation between the different parts of
                                    the project. I also worked on improving its
                                    visual presentation, making it more
                                    consistent and professional.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    To achieve this, I made extensive use of
                                    MkDocs extensions and wrote custom CSS to
                                    customise the appearance and functionality
                                    of the documentation. One addition e.g. was
                                    support for mathematical statements and
                                    expressions. Since our project involves
                                    physiological measurements and technical
                                    research, being able to properly display
                                    mathematical notation is useful for
                                    documenting calculations, relationships and
                                    theoretical concepts.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also added a last-edited timestamp to the
                                    documentation pages. This makes it easier to
                                    see when information was last updated and
                                    gives readers a better indication of how
                                    recent a particular technical explanation
                                    might be.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    These changes made the documentation more
                                    suitable for the scale and technical nature
                                    of our project. It is no longer simply a
                                    collection of Markdown pages, but a more
                                    structured technical knowledge base that the
                                    entire team can use.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    During this sprint, I also updated the
                                    documentation for the PulseSensor
                                    implementation that I developed during the
                                    previous sprint. In addition, I updated
                                    Reachy's software setup guide and documented
                                    the new physiological client architecture
                                    and sensor mocking functionality.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The relevant documentation can be found
                                    here:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Project documentation
                                        </a>
                                    </li>
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
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/sensors/adding_new_sensors/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Adding new sensors
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/reachy/sensors/mocking_sensors/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Mocking physiological sensors
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/technical/environments/breathing/setup/software/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="underline underline-offset-4 transition-colors hover:text-foreground"
                                        >
                                            Breathing sensor software setup
                                        </a>
                                    </li>
                                </ul>

                                <p className="leading-7 text-muted-foreground">
                                    I also noticed a growing issue with the way
                                    documentation was maintained within the
                                    team. Some documentation no longer
                                    accurately reflected how the software
                                    actually worked. This was partly caused by
                                    documentation being produced separately from
                                    the implementation, sometimes without
                                    sufficiently validating the information.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I want to address this in the next sprint by
                                    making documentation a more explicit part of
                                    our development workflow. My proposal is
                                    that every pull request should include a
                                    link to the relevant documentation
                                    describing the changes that have been
                                    implemented. This would encourage developers
                                    to keep documentation aligned with the
                                    actual code and make it easier for reviewers
                                    to understand the purpose and behaviour of
                                    each contribution.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also want to use the existing
                                    documentation more effectively as a shared
                                    source of technical knowledge. Rather than
                                    treating it as something that is only
                                    written after development, it should become
                                    an integral part of how we plan, implement,
                                    review and maintain the system.
                                </p>
                            </div>

                            {/* Society 5.0 preparation */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Preparing for Society 5.0
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    With the prototype taking shape, we needed
                                    to prepare for demonstrating and evaluating
                                    it at Society 5.0. I delegated the creation
                                    of a test plan to our other creative
                                    technologist so that we would have a
                                    structured approach to gathering feedback
                                    and evaluating the prototype.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    We also wanted to make the testing
                                    experience more approachable for visitors. I
                                    suggested buying chocolates to hand out to
                                    participants as a small incentive for taking
                                    part in the demonstration and testing
                                    process.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The resulting{" "}
                                    <a
                                        href="https://studio.dev.hihva.nl/dark-tech/projects/2026-2027-semester-1/when-robots-know-your-body/research/testplan/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 transition-colors hover:text-foreground"
                                    >
                                        Society 5.0 test plan
                                    </a>{" "}
                                    (not up-to-date at the time of writing)
                                    provided the structure for our testing
                                    activities. Our intention was to conduct
                                    approximately ten tests during the event.
                                </p>
                            </div>

                            {/* Society 5.0 demonstration */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Demonstrating the prototype at Society 5.0
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    When we arrived at Society 5.0, we started
                                    setting up the demonstration environment and
                                    preparing the prototype for visitors.
                                    Unfortunately, the event remained relatively
                                    quiet throughout the day, which meant that
                                    we had fewer opportunities to test the
                                    system with participants than originally
                                    anticipated.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Instead of the approximately ten tests we
                                    had planned, we eventually managed to
                                    conduct five. Although this was fewer than
                                    expected, it still gave us an opportunity to
                                    demonstrate the prototype and identify
                                    several practical limitations that we had
                                    not encountered during development.
                                </p>

                                <figure className="mx-auto my-6 max-w-2xl text-center">
                                    <img
                                        src={societySetupImage}
                                        alt="Our Reachy Mini demonstration setup at Society 5.0"
                                        className="h-auto w-full rounded-lg border border-border object-contain"
                                        loading="lazy"
                                    />
                                    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                                        Our demonstration setup at Society 5.0.
                                    </figcaption>
                                </figure>

                                <figure className="mx-auto my-6 max-w-2xl text-center">
                                    <img
                                        src={societyWebpanelImage}
                                        alt="The web interface used during the Society 5.0 demonstration"
                                        className="h-auto w-full rounded-lg border border-border object-contain"
                                        loading="lazy"
                                    />
                                    <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                                        The web interface used to select the
                                        different physiological profiles during
                                        the demonstration.
                                    </figcaption>
                                </figure>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Hardware and connectivity issues
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    One of the first problems we encountered was
                                    that our PulseSensor had stopped working
                                    accurately and would provide random
                                    data/noise at sudden times. We suspect that
                                    this was caused by some form of hardware
                                    failure, although we could not establish the
                                    exact cause during the event. As a result,
                                    we were unable to reliably measure
                                    participants' heart rates, which limited our
                                    ability to demonstrate and evaluate the
                                    physiological interpretation functionality
                                    using real measurements.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    We also encountered problems with the
                                    network connection provided at the venue.
                                    Since it did not work for our setup, we had
                                    to rely on the mobile hotspot of one of our
                                    team members. Unfortunately, this connection
                                    was extremely slow.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    This became particularly problematic because
                                    of Reachy's conversational architecture. The
                                    language model responsible for generating
                                    conversational responses was running in the
                                    cloud. Consequently, Reachy depended on a
                                    sufficiently stable internet connection to
                                    process conversations and generate
                                    responses. The limited bandwidth and high
                                    latency meant that the conversational
                                    experience could not operate as smoothly as
                                    it normally would.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    In addition to the network issues, the
                                    environment itself was quite noisy. This
                                    sometimes made it difficult for the
                                    application to correctly detect spoken
                                    input. While the speech interaction normally
                                    works smoothly under suitable conditions,
                                    the combination of background noise and poor
                                    connectivity negatively affected the
                                    demonstration.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    These experiences showed that the
                                    environment in which a conversational robot
                                    is tested can have a significant influence
                                    on the perceived quality of the interaction.
                                    Not every issue we encountered was
                                    necessarily caused by the implementation
                                    itself; some were direct consequences of the
                                    conditions under which the prototype was
                                    demonstrated.
                                </p>

                                <h3 className="text-xl font-semibold text-foreground">
                                    Evaluation and next testing steps
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Considering the hardware problems, network
                                    limitations and noisy environment, I believe
                                    that the event did not provide ideal
                                    conditions for evaluating the prototype's
                                    full capabilities. In particular, the lack
                                    of reliable heart-rate measurements meant
                                    that we could not properly evaluate all
                                    aspects of the physiological interpretation
                                    functionality.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    We therefore decided that additional testing
                                    should take place at school, preferably in
                                    quieter environments. This would allow us to
                                    investigate the interaction more
                                    systematically while reducing the influence
                                    of external noise and unreliable network
                                    conditions.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also consider this a more realistic
                                    testing environment for our intended
                                    application. Reachy Mini is designed to
                                    function as a desk robot, meaning that it
                                    will most likely be used in a relatively
                                    controlled environment rather than in a busy
                                    event space. Testing it in quieter areas at
                                    school would therefore provide a better
                                    representation of its intended use.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    At the time of writing, we have not yet
                                    completed the interpretation of all the
                                    collected test data. The results and
                                    conclusions from these tests will be
                                    documented separately once that analysis has
                                    been completed.
                                </p>
                            </div>

                            {/* Feedback */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Feedback and further design direction
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    During Society 5.0, one of our teachers also
                                    took the opportunity to test our prototype.
                                    She provided useful feedback and gave us
                                    some direction on how we could make the
                                    concept more aligned with the Dark Tech
                                    Studio.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Her suggestion was to explore the concept
                                    more openly as a team before committing to a
                                    particular direction. She recommended
                                    organising a brainstorming session in which
                                    everyone could contribute ideas without
                                    immediately judging or filtering them.
                                    Afterwards, we could elaborate on the
                                    proposed concepts and select the three
                                    strongest ideas for further development.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I recognised this approach from the study
                                    materials used in Creative Technology. It
                                    reminded me that design exploration should
                                    not always start by immediately narrowing
                                    down the available options. Allowing
                                    different perspectives to emerge first can
                                    lead to concepts that would otherwise not
                                    have been considered.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I consider this useful feedback because it
                                    challenges us to look beyond simply making
                                    the existing prototype technically
                                    functional. We also need to consider what
                                    makes the concept interesting and relevant
                                    within the context of Dark Tech.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Before making substantial changes to the
                                    concept, I want to discuss this direction
                                    with the project owner. This is important
                                    because we need to balance the creative
                                    direction of the project with the
                                    expectations and intended goals of the
                                    stakeholder. Once we have aligned on that
                                    direction, we can organise the brainstorming
                                    session and develop the most promising ideas
                                    further.
                                </p>
                            </div>

                            {/* Ethics */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Privacy, data handling and ethical
                                    considerations (solely for `OR5` lol)
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    Since our prototype works with physiological
                                    measurements, I also considered the privacy
                                    implications of collecting and processing
                                    this information. Heart rate, breathing
                                    patterns and other physiological
                                    measurements can reveal information about a
                                    person's physical condition. This means that
                                    the way we handle these measurements needs
                                    to be considered carefully.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    One potential concern is network
                                    accessibility. In the current
                                    implementation, someone connected to the
                                    same network could theoretically establish a
                                    connection to the robot. Depending on the
                                    available interfaces and access, this could
                                    potentially expose physiological
                                    measurements to other devices on that
                                    network.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I consider the practical exposure relatively
                                    limited in our intended use case, since
                                    Reachy is designed as a desk robot that
                                    would normally be used by one person at a
                                    time. This means that access would generally
                                    be limited to people already connected to
                                    the same network, rather than arbitrary
                                    external users. However, this does not
                                    eliminate the underlying security concern,
                                    and access control should be considered in
                                    future development.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Another consideration is our use of Hugging
                                    Face for cloud-based language model
                                    processing and speech generation. This
                                    introduces an external service into the
                                    data-processing pipeline. Depending on the
                                    information transmitted, physiological
                                    context and related conversational
                                    information could be exposed to
                                    infrastructure outside our direct control.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    We were already planning to move this
                                    processing to the HvA AI servers. This would
                                    reduce our dependency on an external service
                                    and provide a more suitable environment for
                                    handling project data. Until that migration
                                    takes place, however, the external
                                    processing dependency remains a limitation
                                    that needs to be acknowledged.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Beyond data security, there is also an
                                    important ethical consideration regarding
                                    the interpretation of physiological
                                    measurements. A change in heart rate or
                                    breathing does not necessarily indicate a
                                    specific emotion. As we discovered during
                                    development, physical activity alone can
                                    influence these measurements considerably.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I therefore believe that the system should
                                    not treat physiological measurements as
                                    definitive evidence of someone's emotional
                                    state. They should be considered indications
                                    that may help the system adapt its
                                    interaction, rather than objective
                                    conclusions about what a person is feeling.
                                    This distinction is important to avoid
                                    misleading interpretations and to ensure
                                    that the technology remains supportive
                                    rather than making assumptions about its
                                    users.
                                </p>
                            </div>

                            {/* Conclusion */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Sprint 2 conclusion and next steps
                                </h3>

                                <p className="leading-7 text-muted-foreground">
                                    The second sprint marked an important
                                    transition from establishing individual
                                    technical components towards integrating
                                    them into a working prototype. We received
                                    the physical Reachy Mini, adapted an
                                    existing conversational application,
                                    implemented the physiological sensor clients
                                    and introduced simulated profiles that
                                    allowed us to demonstrate different
                                    physiological states in a controlled manner.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    I also took on more responsibility for
                                    coordinating the team, distributing research
                                    and implementation tasks, and maintaining
                                    the technical documentation. The experience
                                    helped me recognise both the importance and
                                    the difficulty of effective delegation. I
                                    also became more aware of the consequences
                                    of relying on AI-generated work without
                                    properly validating or understanding it.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    The documentation overhaul was another
                                    important contribution during this sprint.
                                    By improving its structure, presentation and
                                    functionality, I created a more suitable
                                    foundation for sharing technical knowledge.
                                    However, the experience also showed me that
                                    a professional-looking documentation
                                    environment is only useful if its contents
                                    accurately represent the actual
                                    implementation.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    Although our Society 5.0 demonstration was
                                    affected by hardware, network and
                                    environmental limitations, it provided
                                    valuable insight into how the prototype
                                    performs outside our development
                                    environment. It also gave us useful feedback
                                    on the direction of the concept itself.
                                </p>

                                <p className="leading-7 text-muted-foreground">
                                    For the next sprint, I want to focus on
                                    several improvements:
                                </p>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        Conduct additional tests in quieter and
                                        more controlled environments, analyse
                                        the collected results and document our
                                        findings.
                                    </li>
                                    <li>
                                        Investigate and resolve the PulseSensor
                                        hardware failure so that reliable
                                        physiological measurements can be
                                        collected again.
                                    </li>
                                    <li>
                                        Discuss the further creative/"dark tech"
                                        direction of the project with the
                                        project owner and organise a
                                        brainstorming session with the team.
                                    </li>
                                    <li>
                                        Continue developing the Interpret and
                                        Mirror modes based on the research and
                                        testing results.
                                    </li>
                                    <li>
                                        Review and document the breathing-based
                                        head wobble implementation so that its
                                        architecture and behaviour are
                                        understandable to the rest of the team.
                                    </li>
                                    <li>
                                        Improve team ownership and initiative by
                                        addressing how responsibilities and
                                        progress are managed.
                                    </li>
                                    <li>
                                        Make documentation a more integral part
                                        of development by requiring relevant
                                        documentation links in pull requests and
                                        ensuring that documentation accurately
                                        reflects the implementation.
                                    </li>
                                    <li>
                                        Encourage more critical and responsible
                                        AI usage by ensuring that generated
                                        code, documentation and plans are
                                        properly understood and validated.
                                    </li>
                                </ul>

                                <p className="leading-7 text-muted-foreground">
                                    Overall, this sprint taught me that
                                    developing a working prototype involves much
                                    more than implementing the required
                                    functionality. It also requires coordinating
                                    people, making informed design decisions,
                                    validating assumptions through testing and
                                    maintaining a shared understanding of the
                                    system. I want to carry these lessons into
                                    the next sprint, both in my technical work
                                    and in the way I approach my
                                    responsibilities within the team.
                                </p>
                            </div>

                            {/* Feedback */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Feedback from Classmates
                                </h3>

                                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                                    <li>
                                        <i>
                                            "Remember the learning goals and add
                                            them into your devlog."
                                        </i>
                                    </li>
                                    <li>
                                        <i>"Expand on learning goals."</i>
                                    </li>
                                    <li>
                                        <i>
                                            "Maybe summarise some parts,
                                            especially technical stuff. You
                                            could just use more images for example.3
                                        </i>
                                    </li>
                                </ul>
                            </div>
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
