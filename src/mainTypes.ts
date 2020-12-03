export type TCategory = {
  id: number,
  name: string,
  flags: string | null
}
export type TChildren = {
  id: number,
  parent_id: number,
  name: string,
  flags: string | null
}
export type TEvent = {
  id: number,
  eventName: string,
  eventValue: string,
}