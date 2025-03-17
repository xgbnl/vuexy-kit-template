// Lib Imports
import { handlers } from '@/libs/auth'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const { GET, POST } = handlers
