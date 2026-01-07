import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6"

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/event" },
]

const SOCIAL_ITEMS = [
    { label: "WhatsApp", href: "https://whatsapp.com", icon: <FaWhatsapp /> },
    { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
    { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook /> },
]

const BUTTON_ITEMS = [
    { label: "Register", href: "/auth/register", variant: "bordered" },
    { label: "Login", href: "/auth/login", variant: "solid" },
]

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS }