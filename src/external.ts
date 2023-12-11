export enum ExternalType {
  FOO = "foo",
  BAR = "bar",
  WOW = "wow",
}

export function logExternal(type: ExternalType, times: number) {
  for (let i = 0; i < times; i++) {
    console.log(`Logged external type of: ${type}, index: ${i}`);
  }
}
