import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Sidebar from '@/components/Sidebar'
import './globals.css'

import SupabaseProviders from '@/providers/SupabaseProviders';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongsByUserId from '@/Actions/getSongsByUserId';
import Player from '@/components/Player';
import getActiveProductsWithPrices from '@/Actions/getActiveProductsWithPrices';
const font_figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Created by Unmukt Shukla',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs =await  getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font_figtree.className}>
        <ToasterProvider />
        <SupabaseProviders>
          <UserProvider>
            <ModalProvider products = {products} />
            <Sidebar songs= {userSongs}>
              {children}
            </Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProviders>
        
      </body>
    </html>
  )
}
