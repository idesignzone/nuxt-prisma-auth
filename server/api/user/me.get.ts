export default defineEventHandler(async (event) => {
  // This will throw a 401 error if the user is not logged in
  const session = await requireUserSession(event)
  
  return {
    user: session.user
  }
})
