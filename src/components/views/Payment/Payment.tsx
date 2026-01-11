import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import usePayment from "./usePayment"
import { useEffect } from "react"

const Payment = () => {
    const router = useRouter()
    const { mutateUpdateOrderStatus } = usePayment()
    const { order_id, status } = router.query

    useEffect(() => {
        if (router.isReady) {
            mutateUpdateOrderStatus()
        }
    }, [router.isReady])

    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo.svg" alt="Logo" width={180} height={180} />
                <Image src={status === "success" ? "/images/illustration/success.svg" : "/images/illustration/pending.svg"} alt="Success Transaction" width={300} height={300} />
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2">
                <h4 className="text-2xl font-bold text-danger capitalize">Transaction {status}</h4>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onPress={() => router.push(`/member/transaction/${order_id}`)}>Check your transaction here</Button>
            </div>
        </div>
    )
}

export default Payment