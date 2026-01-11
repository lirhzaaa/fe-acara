import { ToastProvider } from "@heroui/react";
import { cn } from "@/utils/cn"
import { Inter } from "next/font/google"
import { Fragment, ReactNode } from "react"

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
        <Fragment>
            <ToastProvider />
            <main className={cn(inter.className)}>
                {children}
            </main>
        </Fragment>
    )
}

export default AppShell