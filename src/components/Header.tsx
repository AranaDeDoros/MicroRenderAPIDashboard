import { useIsOnline } from "../hooks/useIsOnline"
import { Radio, RadioOff } from "lucide-react"

interface UserInfoProps {
    username: string
}

export function Header({ username }: UserInfoProps) {
    const isOnline = useIsOnline()
    return (
        <>
            <header className="border-b border-emerald-900 pb-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                    Render MicroAPI
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-olive-400 sm:text-4xl">
                    A quick status rundown on your services
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-amber-500 sm:text-base">
                    Welcome, {username}!
                </p>
            </header>
            <div className="mt-6 flex items-end justify-center gap-4 undraggable">
                <span className="text-md font-medium uppercase tracking-[0.4em] text-amber-500 ">
                    status {isOnline ? (
                        <Radio className="animate-pulse inline"  size={24} />
                    ) : (
                        <RadioOff className="animate-pulse inline" size={24} />
                    )}
                </span>
            </div>
        </>
    )
}