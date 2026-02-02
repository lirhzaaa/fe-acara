import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react"
import useDetailTransaction from "./useDetailTransaction"
import { converIDR } from "@/utils/currency"
import { QRCodeSVG } from "qrcode.react"
import { converTime } from "@/utils/date"
import Link from "next/link"
import Script from "next/script"
import { environment } from "@/config/environment"

const DetailTransaction = () => {
    const {
        dataOrder,
        dataEvent,
        dataTicket
    } = useDetailTransaction()
    return (
        <Card className="px-5 py-4">
            <CardBody className="gap-8">
                <Script src={environment.MIDTRANS_SNAP_URL} data-client-key={environment.MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Order:</h4>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                            <p className="text-sm font-semibold">Order ID:</p>
                            <Skeleton isLoaded={!!dataOrder?.orderId} className="h-4 rounded-md">
                                <p className="text-sm">{dataOrder?.orderId}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Ticket:</p>
                            <Skeleton isLoaded={!!dataTicket?.name} className="h-4 rounded-md">
                                <p className="text-sm">{`${dataTicket?.name} ( ${converIDR(dataTicket?.price)} x ${dataOrder?.quantity} )`}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Total:</p>
                            <Skeleton isLoaded={!!dataOrder?.total} className="h-4 rounded-md">
                                <p className="text-sm">{converIDR(dataOrder?.total)}</p>
                            </Skeleton>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Status:</p>
                            <Skeleton isLoaded={!!dataOrder?.status} className="h-4 rounded-md">
                                <Chip className="capitalize" color={dataOrder?.status === "completed" ? "success" : "warning"} variant="flat" size="sm">
                                    {dataOrder?.status}
                                </Chip>
                            </Skeleton>
                        </div>
                    </div>
                </div>
                {dataOrder?.status === "completed" && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold">Ticket:</h4>
                        <div className="mt-2 flex flex-col gap-4">
                            {dataOrder?.vouchers.map((voucher: { voucherId: string }) => (
                                <Card shadow="sm" className="p-4 pt-6 lg:p-2" key={`voucher-${voucher.voucherId}`}>
                                    <CardBody className="gap-8 lg:flex-row">
                                        <div className="mx-auto w-2/3 lg:m-0 lg:w-1/5">
                                            <QRCodeSVG value={voucher.voucherId} className="h-full! w-full!" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-danger">{dataEvent?.name}</h2>
                                            <div className="font-bold text-sm">
                                                <p className="text-foreground-500">Date</p>
                                                <p className="text-danger">
                                                    {`${converTime(dataEvent?.startDate)} - ${converTime(dataEvent?.endDate)}`}
                                                </p>
                                            </div>
                                            <div className="font-bold text-sm">
                                                <p className="text-foreground-500">Location</p>
                                                <p className="text-danger">
                                                    {dataEvent?.isOnline ? "Online" : "Offline"}
                                                </p>
                                                {dataEvent?.isOnline ? (
                                                    <Button as={Link} href={`${dataEvent?.location?.address}`} variant="bordered" color="danger" className="w-fit mt-2">Join Now</Button>
                                                ) : (
                                                    <p className="font-medium text-danger">{dataEvent?.location?.address}</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
                {dataOrder?.status === "pending" && (
                    <Button
                        color="danger"
                        className="w-fit"
                        onPress={() => window.snap.pay(dataOrder?.payment?.token)}>
                        Pay Now
                    </Button>
                )}
            </CardBody>
        </Card>
    )
}

export default DetailTransaction
