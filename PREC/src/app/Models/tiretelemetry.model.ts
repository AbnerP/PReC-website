export interface Telemetry{
  data: Array<tireTelemetry>
}

export interface tireTelemetry{
  compound: string,
  times: Array<Lap>
}

export interface Lap{
  lap: number,
  time: number
}
