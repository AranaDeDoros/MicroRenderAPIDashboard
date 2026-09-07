import { useServiceActions, useServicesQuery } from "../api/useServicesQuery"
import type { RenderServiceResponse, ServiceAction } from "../types/render"
import {
    Play,
    Square,
    RotateCcw,
    type LucideIcon,
} from "lucide-react"

function formatDate(value: string) {
    return new Date(value).toLocaleString()
}

function getStatusLabel(service: RenderServiceResponse["service"]) {
    return service.suspended === "suspended" ? "Suspended" : "Active"
}

interface ServiceActionProps {
    action?: ServiceAction
    disabled: boolean
    onClick: () => void
    className: string,
    icon: LucideIcon
}

function ServiceActionButton({
    action,
    disabled,
    onClick,
    className,
    icon: Icon
}: ServiceActionProps) {
    return (
        <div>
            <button
            title={action}
            className={`rounded-md px-3 py-1.5 text-sm font-medium text-amber-200 transition hover:border-amber-400  disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
            disabled={disabled}
            onClick={onClick}
            type="button"
        >
            <Icon size={16} />
        </button>
        </div>
    )
}

export function Services() {
    const servicesQuery = useServicesQuery()
    const actions = useServiceActions()

    if (servicesQuery.isLoading) {
        return (
            <div className="rounded-lg border border-emerald-800 bg-emerald-900/70 p-4">
                <h2 className="text-lg font-semibold text-amber-300">Services</h2>
                <p className="mt-2 text-sm text-olive-200">Loading services...</p>
            </div>
        )
    }

    if (servicesQuery.isError) {
        return (
            <div className="rounded-lg border border-rose-800 bg-rose-950/60 p-4">
                <h2 className="text-lg font-semibold text-rose-200">Services</h2>
                <p className="mt-2 text-sm text-rose-200">
                    Failed to load services.
                </p>
            </div>
        )
    }

    const services = servicesQuery.data ?? []

    return (
        <div className="rounded-lg border border-emerald-800 bg-emerald-900/70 p-4">
            <h2 className="text-lg font-semibold text-amber-300 undraggable">Services</h2>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead>
                        <tr className="text-amber-200">
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Name</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Type</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Status</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Branch</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Updated</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(({ service }) => {
                            const isSuspended = service.suspended === "suspended"
                            const resumeDisabled = !isSuspended || actions.resume.isPending
                            const suspendDisabled = isSuspended || actions.suspend.isPending
                            const restartDisabled = isSuspended || actions.restart.isPending

                            return (
                                <tr key={service.id} className="align-top text-olive-100">
                                    <td className="border-b border-emerald-950 px-3 py-3">
                                        <div className="font-medium text-white">{service.name}</div>
                                        <div className="text-xs text-olive-300">{service.id}</div>
                                    </td>
                                    <td className="border-b border-emerald-950 px-3 py-3">{service.type}</td>
                                    <td className="border-b border-emerald-950 px-3 py-3">
                                        {getStatusLabel(service)}
                                    </td>
                                    <td className="border-b border-emerald-950 px-3 py-3">
                                        {service.branch ?? "-"}
                                    </td>
                                    <td className="border-b border-emerald-950 px-3 py-3">
                                        {formatDate(service.updatedAt)}
                                    </td>
                                    <td className="border-b border-emerald-950 px-3 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            <ServiceActionButton
                                                action="resume"
                                                icon={Play}
                                                disabled={resumeDisabled}
                                                className="border-emerald-700 bg-emerald-400 text-emerald-950 hover:bg-emerald-300/60"
                                                onClick={() => actions.resume.mutate(service.id)}
                                            />
                                            <ServiceActionButton
                                                action="suspend"
                                                icon={Square}
                                                disabled={suspendDisabled}
                                                className="border-emerald-700 bg-red-400 text-red-950 hover:bg-red-300/60"
                                                onClick={() => actions.suspend.mutate(service.id)}
                                            />
                                            <ServiceActionButton
                                                action="restart"
                                                icon={RotateCcw}
                                                disabled={restartDisabled}
                                                className="border-emerald-700 bg-blue-400 text-blue-950 hover:bg-blue-300/60"
                                                onClick={() => actions.restart.mutate(service.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
