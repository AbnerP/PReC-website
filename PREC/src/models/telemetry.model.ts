export interface fullTelemetry{
  laps: number;
  pitLoss: number;
  tires:Array<tireTelemetry>;
}

export interface tireTelemetry{
  tire: string;
  times: Array<number>;
}


