import Footer from './Footer'
import { Fragment, useEffect, useState } from 'react'

const name = 'AutoKüng AG'

export default function Layout({children}) {

    return (
        <div className="flex flex-col min-h-screen">
                <div className="flex-1">
                    { children }
                </div>
            <Footer />
        </div>
    )
}