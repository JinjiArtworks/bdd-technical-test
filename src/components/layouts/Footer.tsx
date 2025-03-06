import { ModeToggle } from "../mode-toggle";

export function Footer() {
    return (
        <footer className="flex flex-col items-center justify-end gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row">
            <div className="hidden md:block">
                <ModeToggle />
            </div>
        </footer>
    )
}