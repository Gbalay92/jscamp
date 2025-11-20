import styles from '../components/Contact.module.css'

export function Contact() {

    const handleContactSubmit = (event) => {
        event.preventDefault();
        console.log("Formulario de contacto enviado");
    }
    return (
        <main>
            <section>
                <img src="./background.webp" />
                    <h1>Contact Page</h1>
                    <form className={styles.contactForm} onSubmit={handleContactSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" />
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message"></textarea>
                        <button type="submit">Send</button>
                    </form>
            </section>
        </main>
    )
}