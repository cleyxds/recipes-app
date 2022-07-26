export function wait(milliseconds = 1000) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
