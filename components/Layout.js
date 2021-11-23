import Navbar from './Navbar'
import Footer from './Footer'

const name = 'AutoKüng AG'
const Layout = ({ children }) => (
    <div className="content">
        <Navbar />
        { children }
        <Footer />
    </div>
    )
    
    export default Layout