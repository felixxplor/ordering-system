'use client'

import { useAppContext } from '@/components/app-provider'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const menuItems = [
  {
    title: 'Menu',
    href: '/menu', // authRequired = undefined means that whether logged in or not, it will still be displayed
  },
  {
    title: 'Orders',
    href: '/orders',
    authRequired: true,
  },
  {
    title: 'Login',
    href: '/login',
    authRequired: false, // When false, it means not logged in, so it will be displayed
  },
  {
    title: 'Manage',
    href: '/manage/dashboard',
    authRequired: true,
  },
]

// Server: Menu, Login. Because the server doesn't know the user's login status.
// Client: Initially, the client will display Menu, Login.
// But right after that, the client renders Menu, Orders, Management because it has checked the login status

export default function NavItems({ className }: { className?: string }) {
  const { isAuth } = useAppContext()
  return menuItems.map((item) => {
    if ((item.authRequired === false && isAuth) || (item.authRequired === true && !isAuth))
      return null
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
