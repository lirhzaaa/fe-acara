import { Card } from "@heroui/react"
import useDetailTransaction from "./useDetailTransaction"

const DetailTransaction = () => {
    const {
        dataOrder,
        dataEvent,
        dataTicket
    } = useDetailTransaction()
    console.log("order", dataOrder)
    console.log("event", dataEvent)
    console.log("ticket", dataTicket)
    return (
        <Card>
            <div></div>
        </Card>
    )
}

export default DetailTransaction
