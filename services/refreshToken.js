export default async function refreshToken() {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_NEXTJS_API_ROUTE}/refresh-token`, {
      method: 'POST'
    })
  } catch (e) {
    console.log('err', e)
  }
}
