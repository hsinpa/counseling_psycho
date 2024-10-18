import { Link } from '@remix-run/react'
import './header.scss'

export default function Header_View() {
    return (
        <div id="header">
            <Link to='/'><h1>諮商師<span>輔助系統</span></h1></Link>
        </div>
    )
}