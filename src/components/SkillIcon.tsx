import type { siIcon } from "simple-icons"

type SkillIconProps = {
    icon: typeof siIcon
}

export default function SkillIcon({ icon }: SkillIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-4 fill-current"
            role="img"
            aria-label={icon.title}
        >
            <path d={icon.path} />
        </svg>
    )
}
