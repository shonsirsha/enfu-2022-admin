export default function imageURLCreator(url) {
  let urlArray = url.split('/')
  let userAssetsIx = urlArray.findIndex(item => item === 'user-assets')
  urlArray = urlArray.splice(userAssetsIx)
  let formattedURL = `${process.env.NEXT_PUBLIC_REST_API_DOMAIN}/${urlArray.join('/')}`

  return formattedURL
}
