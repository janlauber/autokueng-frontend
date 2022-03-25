import Footer from './Footer'
import Navbar from './Navbar'
import React from 'react'

const name = 'AutoKüng AG'

export default function Layout(props) {

    return (
        
        <div className="flex flex-col min-h-screen">
            <Navbar/>
                {React.cloneElement(props.children, { name })}
            <Footer />
        </div>
    )
}