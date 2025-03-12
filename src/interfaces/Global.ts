import type { AxiosError } from "axios"

export type ErrorResponse = AxiosError<{ message: string }>
