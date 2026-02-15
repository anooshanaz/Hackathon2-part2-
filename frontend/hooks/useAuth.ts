// /**
//  * useAuth custom hook for authentication state management
//  */

// 'use client'

// import { useState, useEffect, useCallback } from 'react'
// import { api } from '@/lib/api'
// import {
//   getUser,
//   setUser,
//   setToken,
//   removeUser,
//   removeToken,
//   validateToken,
// } from '@/lib/auth'
// import { User, LoginData, RegisterData } from '@/types'
// import { formatErrorMessage } from '@/lib/utils'

// interface UseAuthReturn {
//   user: User | null
//   isLoading: boolean
//   isAuthenticated: boolean
//   error: string | null
//   login: (data: LoginData) => Promise<void>
//   signup: (data: RegisterData) => Promise<void>
//   logout: () => void
//   clearError: () => void
// }

// export function useAuth(): UseAuthReturn {
//   const [user, setUserState] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Check authentication status on mount
//   useEffect(() => {
//     const checkAuth = () => {
//       try {
//         const isValid = validateToken()
//         if (isValid) {
//           const storedUser = getUser()
//           if (storedUser) {
//             setUserState(storedUser)
//           } else {
//             // Token exists but no user data - clear everything
//             removeToken()
//             removeUser()
//           }
//         } else {
//           // Token invalid or expired - clear everything
//           removeToken()
//           removeUser()
//           setUserState(null)
//         }
//       } catch (err) {
//         console.error('Error checking authentication:', err)
//         removeToken()
//         removeUser()
//         setUserState(null)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkAuth()
//   }, [])

//   const login = useCallback(async (data: LoginData) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       const response = await api.login(data)

//       // Store token and user data
//       setToken(response.access_token)
//       setUser(response.user)
//       setUserState(response.user)
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   const signup = useCallback(async (data: RegisterData) => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       await api.register(data)
//       // Note: After signup, user needs to login separately
//       // This matches the backend flow where register doesn't return a token
//     } catch (err) {
//       const errorMessage = formatErrorMessage(err)
//       setError(errorMessage)
//       throw err
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   const logout = useCallback(() => {
//     removeToken()
//     removeUser()
//     setUserState(null)
//     setError(null)
//   }, [])

//   const clearError = useCallback(() => {
//     setError(null)
//   }, [])

//   return {
//     user,
//     isLoading,
//     isAuthenticated: user !== null,
//     error,
//     login,
//     signup,
//     logout,
//     clearError,
//   }
// }


/**
 * Authentication hook for the Todo App
 * Exports the useAuth hook from the auth context
 */

import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';
import { User } from '../types';

// Export the interface
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

// Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};