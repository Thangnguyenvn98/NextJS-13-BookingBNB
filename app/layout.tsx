import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'

import { Nunito } from 'next/font/google'
import RegisterModal from './components/modals/RegisterModal';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb generated by NextJS 13',
}

const font = Nunito({
  subsets: ['latin'],
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}> 
      <RegisterModal/>
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
