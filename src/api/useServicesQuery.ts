import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Requester } from "../infra/Requester"
import { camelizeKeys } from "../helpers/common"
import type {
    PostgresInstance,
    RenderPostgresResponse,
    RenderService,
    RenderServiceResponse,
    ServiceAction,
} from "../types/render"

const requester = new Requester()

const queryKeys = {
    postgresInstances: ["postgresInstances"] as const,
    services: ["services"] as const,
}

function toArray(value: unknown, listKeys: string[]): unknown[] {
    if (Array.isArray(value)) {
        return value
    }

    if (value !== null && typeof value === "object") {
        const record = value as Record<string, unknown>

        for (const key of listKeys) {
            const candidate = record[key]

            if (Array.isArray(candidate)) {
                return candidate
            }

            if (candidate !== undefined && candidate !== null) {
                return [candidate]
            }
        }
    }

    return []
}

function normalizeService(item: unknown): RenderServiceResponse {
    const mapped = camelizeKeys(item) as RenderServiceResponse | RenderService

    if (mapped !== null && typeof mapped === "object" && "service" in mapped) {
        return mapped as RenderServiceResponse
    }

    return { service: mapped as RenderService }
}

function normalizePostgres(item: unknown): RenderPostgresResponse {
    const mapped = camelizeKeys(item) as RenderPostgresResponse | PostgresInstance

    if (mapped !== null && typeof mapped === "object" && "postgres" in mapped) {
        return mapped as RenderPostgresResponse
    }

    return { postgres: mapped as PostgresInstance }
}

async function fetchServices(): Promise<RenderServiceResponse[]> {
    const response = await requester.request("GET", "/services")
    return toArray(response, ["services", "service"]).map(normalizeService)
}

async function fetchPostgresInstances(): Promise<RenderPostgresResponse[]> {
    const response = await requester.request("GET", "/services/list_postgres")
    return toArray(response, ["postgres", "postgreses"]).map(normalizePostgres)
}

async function runServiceAction(serviceId: string, action: ServiceAction) {
    const response = await requester.request("POST", `/services/${serviceId}/${action}`)
    return response === null || response === undefined ? null : normalizeService(response)
}

export function useServicesQuery() {
    return useQuery({
        queryKey: queryKeys.services,
        queryFn: fetchServices,
    })
}

export function usePostgresInstancesQuery() {
    return useQuery({
        queryKey: queryKeys.postgresInstances,
        queryFn: fetchPostgresInstances,
    })
}

export function useServiceActions() {
    const queryClient = useQueryClient()

    const invalidateServices = async () => {
        await queryClient.invalidateQueries({ queryKey: queryKeys.services })
    }

    const resume = useMutation({
        mutationFn: (serviceId: string) => runServiceAction(serviceId, "resume"),
        onSuccess: invalidateServices,
    })

    const suspend = useMutation({
        mutationFn: (serviceId: string) => runServiceAction(serviceId, "suspend"),
        onSuccess: invalidateServices,
    })

    const restart = useMutation({
        mutationFn: (serviceId: string) => runServiceAction(serviceId, "restart"),
        onSuccess: invalidateServices,
    })

    return {
        restart,
        resume,
        suspend,
    }
}
