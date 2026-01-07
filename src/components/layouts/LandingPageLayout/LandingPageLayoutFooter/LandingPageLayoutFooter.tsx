import Image from "next/image"
import Link from "next/link"
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constansts"

const LandingPageLayoutFooter = () => {
    return (
        <div className="flex flex-col bg-slate-900 items-center justify-between px-6 py-10 text-center lg:flex-row lg:text-left xl:p-20">
            <Image src={"/images/general/logo.svg"} alt="Image Logo" className="mb-4 w-40 lg:w-60" width={200} height={100} />
            <div className="mb-4 flex flex-col gap-4 lg:mb-0">
                <div>
                    <h4 className="text-xl text-white">Customer Service</h4>
                    <p className="text-gray-600">
                        <Link href="mailto:mazhrilnurmaulidan@gmail.com">mazhrilnurmaulidan@gmail.com</Link> | {" "}
                        <Link href="tel:+6283805650232">+62 838-0565-0232</Link>
                    </p>
                </div>
                <div>
                    <h4 className="text-xl text-white">Office</h4>
                    <p className="text-gray-600">Bogor, Indonesia</p>
                </div>
            </div>
            <div className="mb-10 flex flex-col gap-2 lg:mb-0">
                <h2 className="text-xl text-white lg:mb-2">Menu</h2>
                {NAV_ITEMS.map((items) => (
                    <Link key={`footer-${items.label}`} href={items.href} className="cursor-pointer text-gray-600 hover:text-white">
                        {items.label}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col items-center gap-8">
                <div className="flex items-center justify-between gap-8 text-gray-600">
                    {SOCIAL_ITEMS.map((items) => (
                        <Link key={`social-${items.label}`} href={items.href} className="text-3xl hover:text-white">
                            {items.icon}
                        </Link>
                    ))}
                </div>
            <p className="w-full text-center text-xs text-gray-600">Copyright © 2026 Acara. All rights reserved.</p>
            </div>
        </div>
    )
}

export default LandingPageLayoutFooter
