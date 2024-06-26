import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
// import google from 'next-auth/providers/google'

import prisma from '@/lib/prisma'

import { signInEmailPassword } from '.'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  secret: 'f343e2c5d6ca9de453a9a01f8411dc8a',
  // basePath: '/api/auth',
  trustHost: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john.smith@my-mail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '_________',
        },
      },
      async authorize(credentials) {
        // console.log(credentials)
        // Add logic here to look up the user from the credentials supplied

        const user = await signInEmailPassword(
          credentials.email as string,
          credentials.password as string
        )
        // console.log(user)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
        // If you return null then an error will be displayed advising the user to check their details.
        return null

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  //*https://authjs.dev/guides/basics/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async jwt({ token, account, user, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? 'no-email' },
      })
      if (dbUser?.isActive === false) {
        throw new Error('User is not active')
      }

      if (dbUser) {
        token.roles = dbUser.roles ?? ['no-roles']
        token.id = dbUser.id ?? 'no-uuid'
      }

      return token
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles as string[]
        session.user.id = token.id as string
      }
      // console.log({ session })

      return session
    },

    // async redirect({url, baseUrl}) {
    //     return baseUrl
    // },
  },
})
