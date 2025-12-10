import { NavLink } from "react-router"

export function Link({ href, children, ...props }) {
    
    return (
        <NavLink className={({isActive}) => isActive ? 'nav-link-active' : ''} to={href} {...props}>{children}</NavLink>
    )
}
