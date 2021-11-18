export interface strategy{
  compounds: Array<string>,
  pits: Array<number>,
  totalTime: number
}

export interface pitStop{
  lap: number,
  compound: string
}
