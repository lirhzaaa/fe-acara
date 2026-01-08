import { IEvent } from "@/types/Event"
import { cn } from "@/utils/cn"
import { converTime } from "@/utils/date"
import { Card, CardBody, CardFooter, Skeleton } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react/jsx-runtime"

interface propTypes {
    event?: IEvent
    className?: string
    key?: string
    isLoading?: boolean
}

const CardEvent = (props: propTypes) => {
    const { event, className, key, isLoading } = props
    return (
        <Card shadow="sm" isPressable as={Link} href={!isLoading ? `/event/${event?.slug}` : "/"} key={key} className={cn(className, "cursor-pointer")}>
            {!isLoading ? (
                <Fragment>
                    <CardBody>
                        <Image src={`${event?.banner}`} alt="Cover" width={1920} height={1080} className="aspect-video w-full rounded-lg object-cover" />
                    </CardBody>
                    <CardFooter className="flex flex-col pt-0 w-full items-start">
                        <h2 className="line-clamp-1 text-lg font-bold text-danger">
                            {event?.name}
                        </h2>
                        <p className="mb-2 text-sm link-clamp-2">{event?.description}</p>
                        <p className="text-foreground-500 text-xs">
                            {converTime(`${event?.startDate}`)}
                        </p>
                    </CardFooter>
                </Fragment>
            ) : (
                <Fragment>
                    <Skeleton className="rounded-t-lg aspect-video w-full bg-default-300" />
                    <div className="flex flex-col p-2 gap-2">
                        <Skeleton className="w-3/5 rounded-lg bg-default-200 h-7" />
                        <Skeleton className="w-4/5 rounded-lg bg-default-200 h-5" />
                        <Skeleton className="w-2/5 rounded-lg bg-default-200 h-3" />
                    </div>
                </Fragment>
            )}
        </Card>
    )
}

export default CardEvent