import { useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

/**
 * Safe route helper that checks if a route exists before creating navigation object
 * @param routeName - The name of the route to check
 * @returns Route object if route exists, empty string if not found
 */
export const getSafeRoute = (routeName: string): RouteLocationRaw | '' => {
  const router = useRouter()

  try {
    const route = router.resolve({ name: routeName })
    return route.matched.length > 0 ? { name: routeName } : ''
  } catch {
    return ''
  }
}

/**
 * Check if a route exists by name
 * @param routeName - The name of the route to check
 * @returns true if route exists, false otherwise
 */
export const routeExists = (routeName: string): boolean => {
  const router = useRouter()

  try {
    const route = router.resolve({ name: routeName })
    return route.matched.length > 0
  } catch {
    return false
  }
}

/**
 * Safe navigation helper that only navigates if route exists
 * @param routeName - The name of the route to navigate to
 * @returns Promise that resolves if navigation succeeds, rejects if route doesn't exist
 */
export const safeNavigate = async (routeName: string) => {
  const router = useRouter()

  if (routeExists(routeName)) {
    return router.push({ name: routeName })
  } else {
    throw new Error(`Route '${routeName}' not found`)
  }
}
