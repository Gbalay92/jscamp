export function Link({ href, children, ...props }) {

    const handleClick = (event) => {
        event.preventDefault()
        window.history.pushState({}, '', href)
        window.dispatchEvent(new PopStateEvent('popstate'))
        //Evento personalizado para notificar a la aplicación que la ruta ha cambiado
        // Esto es necesario porque pushState no recarga la página ni notifica a React automáticamente  
    }
    return (
        <a href={href} {...props} onClick={handleClick}>{children}</a>
    )
}
