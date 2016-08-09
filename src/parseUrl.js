
const schemePattern = '(\\w+):'
const urlPattern = schemePattern + '([\\w\\.]+)'
const urlRegex = new RegExp('^' + urlPattern + '$')
const templateRegex = new RegExp('((^' + schemePattern + ')|({{' + urlPattern + '}})|([\\w\\.:]+))', 'g')
const urlFrangmentRegex = new RegExp('^{{' + urlPattern + '}}$')

export default function parseUrl (url) {
  if (typeof url === 'string') {
    // simple urls
    let match = urlRegex.exec(url)
    if (match) {
      return {
        scheme: match[1],
        fragments: [ match[2] ]
      }
    }

    // template urls
    match = url.match(templateRegex)
    if (match && match.length > 1) {
      return {
        scheme: ((s) => s.substring(0, s.length - 1))(match.shift()),
        fragments: match.map(fragment => fragment.match(urlFrangmentRegex)
          ? parseUrl(fragment.substring(2, fragment.length - 2))
          : fragment
        )
      }
    }
  }
  return null
}
