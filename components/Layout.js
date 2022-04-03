import Footer from './Footer'
import Navbar from './Navbar'
import React from 'react'

const name = 'AutoKüng AG'

export default function Layout(props) {

    return (
        
        <div className="flex flex-col h-screen">
            <Navbar/>
            <main className="flex-1">
                {React.cloneElement(props.children, { name })}
            </main>
            <Footer />
        </div>
    )
}