import { auth } from '../src/Firebase'

export function useAuth() {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    auth.onAuthStateChanged(function handleAuth(user) {
      if (user) {
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
  }, [user])

  return { user, loading }
}
