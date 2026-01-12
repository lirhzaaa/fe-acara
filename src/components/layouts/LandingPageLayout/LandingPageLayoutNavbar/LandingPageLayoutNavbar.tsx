import { Avatar, Button, ButtonProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Listbox, ListboxItem, Spinner } from "@heroui/react"
import Image from "next/image"
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constansts"
import { cn } from "@/utils/cn"
import { useRouter } from "next/router"
import { CiSearch } from "react-icons/ci"
import { signOut, useSession } from "next-auth/react"
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar"
import { Fragment } from "react/jsx-runtime"
import { IEvent } from "@/types/Event"

const LandingPageLayoutNavbar = () => {
    const router = useRouter()
    const session = useSession()

    const {
        dataProfile,
        dataEventSearch,
        search,
        setSearch,

        handleSearch,
        isLoadingEventSearch,
        isRefetchingEventSearch
    } = useLandingPageLayoutNavbar()

    return (
        <Navbar maxWidth="full" isBordered isBlurred={false}>
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
                    <Input className="w-75" placeholder="Search Event" startContent={<CiSearch />} onChange={handleSearch} onClear={() => setSearch("")} isClearable />
                    {search !== "" && (
                        <Listbox items={dataEventSearch?.data || []} className="absolute right-0 top-12 rounded-xl shadow-2xl shadow-gray-700 bg-white">
                            {!isRefetchingEventSearch && !isLoadingEventSearch ? (
                                (item: IEvent) => (
                                    <ListboxItem key={`${item._id}`} href={`/event/${item.slug}`}>
                                        <div className="flex items-center gap-2">
                                            <Image src={`${item.banner}`} alt={`${item.name}`} className="w-2/5 rounded-md" width={100} height={100} />
                                            <p className="w-3/5 text-wrap">{`${item.name}`}</p>
                                        </div>
                                    </ListboxItem>
                                )
                            ) : (
                                <ListboxItem key="loading">
                                    <Spinner color="danger" size="sm" />
                                </ListboxItem>
                            )}
                        </Listbox>
                    )}
                </NavbarItem>
                {session.status === "authenticated" ? (
                    <NavbarItem className="hidden lg:flex">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar src={dataProfile?.profilePicture} className="cursor-pointer" showFallback />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="admin" href="/admin/" className={cn({
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
                        <NavbarMenuItem key={`nav-${items.label}`}>
                            <Link href={items.href} className={cn("font-medium text-default-700 hover:text-danger", {
                                "font-bold text-danger-500": router.pathname === items.href
                            })}>
                                {items.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    {session.status === "authenticated" ? (
                        <Fragment>
                            <NavbarMenuItem>
                                <Link href="/admin/" className={cn("font-medium text-default-700 hover:text-danger", {
                                    "hidden": dataProfile?.role !== "admin"
                                })}>
                                    Admin
                                </Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Link href="/member/profile" className="font-medium text-default-700 hover:text-danger">
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