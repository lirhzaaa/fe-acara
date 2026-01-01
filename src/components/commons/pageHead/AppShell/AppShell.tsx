import { ToastProvider } from "@heroui/react";
import { cn } from "@/utils/cn"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

interface PropTypes {
    children: ReactNode
}

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


const AppShell = (props: PropTypes) => {
    const { children } = props
    return (
        <>
            <ToastProvider />
            <main className={cn(inter.className)}>
                {children}
            </main>
        </>
    )
}

export default AppShell