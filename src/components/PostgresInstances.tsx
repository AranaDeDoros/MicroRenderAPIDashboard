import { LoaderCircle } from "lucide-react"
import { usePostgresInstancesQuery } from "../api/useServicesQuery"
import type { RenderPostgresResponse } from "../types/render"

function formatDate(value: string) {
    return new Date(value).toLocaleString()
}

function formatDiskSize(size: RenderPostgresResponse["postgres"]["diskSizeGb"]) {
    return size === null || size === undefined ? "Free Tier" : `${size} GB`
}

export function PostgresInstances() {
    const postgresInstancesQuery = usePostgresInstancesQuery()

    if (postgresInstancesQuery.isLoading) {
        return (
            <div className="rounded-lg border border-emerald-800 bg-emerald-900/70 p-4">
                <h2 className="text-lg font-semibold text-amber-300">Postgres</h2>
                <p className="mt-2 text-sm text-olive-200">
                    <span className="mt-2 text-sm text-olive-200">Loading services <LoaderCircle className="animate-spin inline" size={16} /></span>
                </p>
            </div>
        )
    }

    if (postgresInstancesQuery.isError) {
        return (
            <div className="rounded-lg border border-rose-800 bg-rose-950/60 p-4">
                <h2 className="text-lg font-semibold text-rose-200">Postgres</h2>
                <p className="mt-2 text-sm text-rose-200">
                    Failed to load postgres services.
                </p>
            </div>
        )
    }

    const postgresInstances = postgresInstancesQuery.data ?? []

    return (
        <div className="rounded-lg border border-emerald-800 bg-emerald-900/70 p-4">
            <h2 className="text-lg font-semibold text-amber-300 undraggable">Postgres</h2>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead>
                        <tr className="text-amber-200">
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Name</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Plan</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Disk</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Created</th>
                            <th className="border-b border-emerald-800 px-3 py-2 font-semibold">Expires</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postgresInstances.map(({ postgres }) => (
                            <tr key={postgres.id} className="align-top text-olive-100">
                                <td className="border-b border-emerald-950 px-3 py-3">
                                    <div className="font-medium text-white">{postgres.name}</div>
                                    <div className="text-xs text-olive-300">{postgres.id}</div>
                                </td>
                                <td className="border-b border-emerald-950 px-3 py-3">{postgres.plan}</td>
                                <td className="border-b border-emerald-950 px-3 py-3">
                                    {formatDiskSize(postgres.diskSizeGb)}
                                </td>
                                <td className="border-b border-emerald-950 px-3 py-3">
                                    {formatDate(postgres.createdAt)}
                                </td>
                                <td className="border-b border-emerald-950 px-3 py-3">
                                    {formatDate(postgres.expiresAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
