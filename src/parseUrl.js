const regex = /^(\w+):([\w\.]+)$/

export default function parseUrl (url) {
  const match = regex.exec(url)
  return !match ? null : {
    scheme: match[1],
    path: match[2]
  }
}
