export interface Telemetry{
  data: Array<tireTelemetry>
}

export interface tireTelemetry{
  compound: string,
  times: Array<number>
}

export interface Lap{
  time: number
}

export interface tireFormTelemetry{
  compound: string,
  times: Array<string>
}
