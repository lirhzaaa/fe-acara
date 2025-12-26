import PageHead from "@/components/commons/pageHead"
import { ReactNode, useState } from "react"
import DashboardLayoutSidebar from "./DashboardLayoutSidebar"
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans"
import { Navbar, NavbarMenuToggle } from "@heroui/react"

interface PropsTypes {
    children?: ReactNode
    title: string
    description?: string
    type?: string
}

const DashboardLayout = (props: PropsTypes) => {
    const { children, title, description, type } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <PageHead title={title} />
            <div className="max-w-screen-3xl 3xl:container flex">
                <DashboardLayoutSidebar sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER} isOpen={open} />
                <div className="h-screen w-full overflow-y-auto p-8">
                    <Navbar className="flex justify-between bg-transparent px-0" isBlurred={false} position="static" classNames={{ wrapper: "p-0" }}>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <NavbarMenuToggle arial-label={open ? "Close Menu" : "Open Menu"} onClick={() => setOpen(!open)} className="lg:hidden" />
                    </Navbar>
                    <p className="mb-4 text-small">{description}</p>
                    {children}
                </div>
            </div>
        </>
    )
}

export default DashboardLayout
