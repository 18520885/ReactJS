import React from 'react'
import Header from 'src/Components/Header'
import Footer from 'src/Components/Footer'

export default function AppLayout({children}) {
    return (
        <>
         <Header/>
         {children}
         <Footer/>  
        </>
    )
}
