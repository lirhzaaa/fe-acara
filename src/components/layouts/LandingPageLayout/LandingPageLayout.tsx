import PageHead from "@/components/commons/pageHead"
import { ReactNode } from "react"
import { Fragment } from "react/jsx-runtime"
import LandingPageLayoutNavbar from "./LandingPageLayoutNavbar"

interface PropsTypes {
    title: string
    children: ReactNode
}

const LandingPageLayout = (props: PropsTypes) => {
    const { title, children } = props
    return (
        <Fragment>
            <PageHead title={title} />
            <LandingPageLayoutNavbar />
            <div className="max-w-screen-3xl 3xl:container py-10 md:p-6">
                {children}
            </div>
        </Fragment>
    )
}

export default LandingPageLayout