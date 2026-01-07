import { Avatar, Button, ButtonProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constansts"
import { cn } from "@/utils/cn"
import { useRouter } from "next/router"
import { CiSearch } from "react-icons/ci"
import { signOut, useSession } from "next-auth/react"
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar"
import { Fragment } from "react/jsx-runtime"

const LandingPageLayoutNavbar = () => {
    const router = useRouter()
    const session = useSession()

    const { dataProfile } = useLandingPageLayoutNavbar()

    console.log(dataProfile)

    return (
        <Navbar maxWidth="full" className="max-w-screen-3xl 3xl:container" isBordered isBlurred={false} shouldHideOnScroll>
            <div className="flex items-center gap-8">
                <NavbarBrand as={Link} href="/">
                    <Image src="/images/general/logo.svg" alt="Logo Acara" width={100} height={50} className="cursor-pointer" />
                </NavbarBrand>
                <NavbarContent className="hidden lg:flex">
                    {NAV_ITEMS.map((items) => (
                        <NavbarItem key={`nav-${items.label}`} as={Link} href={items.href} className={cn("font-medium text-default-700 hover:text-danger", {
                            "font-bold text-danger-500": router.pathname === items.href
                        })}>
                            {items.label}
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <NavbarContent justify="end">
                <NavbarMenuToggle className="lg:hidden" />
                <NavbarItem className="hidden lg:flex lg:relative">
                    <Input isClearable className="w-[300px]" placeholder="Search Event" startContent={<CiSearch />} onClear={() => { }} onChange={() => { }} />
                </NavbarItem>
                {session.status === "authenticated" ? (
                    <NavbarItem className="hidden lg:flex">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar src={dataProfile?.profilePicture} className="cursor-pointer" showFallback />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="admin" href="/admin/dashboard" className={cn({
                                    hidden: dataProfile?.role !== "admin"
                                })}>
                                    Admin
                                </DropdownItem>
                                <DropdownItem key="profile" href="/member/profile">
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="signout" onPress={() => signOut()}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : (
                    <div className="hidden lg:flex lg:gap-4">
                        {BUTTON_ITEMS.map((items) => (
                            <NavbarItem key={`button-${items.label}`}>
                                <Button as={Link} color="danger" href={items.href} variant={items.variant as ButtonProps["variant"]}>
                                    {items.label}
                                </Button>
                            </NavbarItem>
                        ))}
                    </div>
                )}

                <NavbarMenu className="gap-4">
                    {NAV_ITEMS.map((items) => (
                        <NavbarMenuItem key={`nav-${items.label}`}
                            className={cn("font-medium text-default-700 hover:text-danger", {
                                "font-bold text-danger-500": router.pathname === items.href
                            })}>
                            <Link href={items.href}>
                                {items.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    {session.status === "authenticated" ? (
                        <Fragment>
                            <NavbarMenuItem className={cn("font-medium text-default-700 hover:text-danger", {
                                "hidden": dataProfile?.role !== "admin"
                            })}>
                                <Link href="/admin/dashboard">
                                    Admin
                                </Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem className="font-medium text-default-700 hover:text-danger">
                                <Link href="/member/profile">
                                    Profile
                                </Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Button color="danger" onPress={() => signOut()} className="mt-2 w-full" variant="bordered" size="md">
                                    Log Out
                                </Button>
                            </NavbarMenuItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {BUTTON_ITEMS.map((items) => (
                                <NavbarMenuItem key={`button-${items.label}`}>
                                    <Button as={Link} color="danger" href={items.href} fullWidth variant={items.variant as ButtonProps["variant"]} size="md">
                                        {items.label}
                                    </Button>
                                </NavbarMenuItem>
                            ))}
                        </Fragment>
                    )}
                </NavbarMenu>
            </NavbarContent>
        </Navbar >
    )
}

export default LandingPageLayoutNavbar