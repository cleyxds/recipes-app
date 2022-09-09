export default ({ ms = 1000, random = false, maxRandomTime = 600 }) => {
  const milliseconds = random ? Math.floor(Math.random() * maxRandomTime) : ms

  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
