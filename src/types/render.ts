
type ServiceStatus = "suspended" | "not_suspended"
type ServiceType =
  | "web_service"
  | "static_service"
  | "background_worker"
  | "cron_job"
  | "private_service"
type ServiceAction = "resume" | "suspend" | "restart"

interface ServiceDetails {
  buildCommand: string | null
  publishPath: string | null
  url: string | null
}

interface RenderService {
  id: string
  name: string
  type: ServiceType
  suspended: ServiceStatus | null
  branch: string | null
  repo: string | null
  createdAt: string
  updatedAt: string
  dashboardUrl: string
  serviceDetails: ServiceDetails
}

interface RenderServiceResponse {
  service: RenderService
}

interface ServiceStateUpdate {
  serviceId: string
  statusChange: ServiceAction
}

interface PostgresInstance {
  id: string
  plan: string
  diskSizeGb: number | null
  name: string
  createdAt: string
  updatedAt: string
  expiresAt: string
}

interface RenderPostgresResponse {
  postgres: PostgresInstance
}

export type {
  PostgresInstance,
  RenderPostgresResponse,
  RenderService,
  RenderServiceResponse,
  ServiceAction,
  ServiceDetails,
  ServiceStateUpdate,
  ServiceStatus,
  ServiceType,
}
