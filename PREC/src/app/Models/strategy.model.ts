export interface strategy{
  // pits: Array<pitStop>,
  compounds: Array<string>,
  pitLaps: Array<number>,
  totalTime: number
}

export interface pitStop{
  lap: number,
  compound: string
}
