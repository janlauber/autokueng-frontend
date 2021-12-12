import Footer from './Footer'
import Navbar from './Navbar'
import React from 'react'

const name = 'AutoKüng AG'

export default function Layout(props) {

    return (
        
        <div className="flex flex-col min-h-screen">
            <Navbar 
                updateState={props.updateState}
                auth={props.auth}    
            />
                {React.cloneElement(props.children, { auth: props.auth, updateState: props.updateState })}
            <Footer />
        </div>
    )
}