import '@/assets/styles/global.css'
import AuthProvider from '@/components/AuthProvider'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

export const metadata = {
  title: 'PropertyPulse | Find The Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, find properties'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main >{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  )
}
