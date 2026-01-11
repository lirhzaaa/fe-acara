import { ICart, ITicket } from "@/types/Ticket"
import { converIDR } from "@/utils/currency"
import { Button, Card, CardBody, CardFooter, Divider, Spinner } from "@heroui/react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"

interface propTypes {
    cart: ICart
    dataTicketInCart: ITicket
    onChangeQuantity: (type: "increment" | "decrement") => void
    onCreateOrder: () => void
    isLoading: boolean
}

const DetailCart = (props: propTypes) => {
    const {
        cart,
        dataTicketInCart,
        onChangeQuantity,
        onCreateOrder,
        isLoading
    } = props

    const session = useSession()
    const router = useRouter()

    return (
        <Card radius="lg" className="lg:sticky lg:top-20 border-none p-6">
            {session.status === "authenticated" ? (
                <CardBody className="gap-4">
                    <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
                    {`${cart.ticket}` == "" ? (
                        <p className="text-foreground-500 text-sm">Your cart is empty</p>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">{dataTicketInCart.name}</p>
                                <div className="flex items-center gap-2">
                                    <Button
                                        size="md"
                                        variant="bordered"
                                        className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                                        onPress={() => onChangeQuantity("decrement")}>
                                        -
                                    </Button>
                                    <span className="text-sm font-bold">{cart.quantity}</span>
                                    <Button
                                        size="md"
                                        variant="bordered"
                                        className="h-9 w-9 min-w-0 scale-80 rounded-full font-bold text-foreground-500"
                                        onPress={() => onChangeQuantity("increment")}>
                                        +
                                    </Button>
                                </div>
                            </div>
                            <p className="font-semibold">{converIDR(Number(dataTicketInCart.price) * cart.quantity)}</p>
                        </div>
                    )}
                    <Divider />
                    <Button
                        size="md"
                        color="danger"
                        fullWidth
                        disabled={cart.quantity === 0 || isLoading}
                        className="disabled:bg-danger-200"
                        onPress={onCreateOrder}>
                        {isLoading ? <Spinner size="md" color="white" /> : "Checkout"}
                    </Button>
                </CardBody>
            ) : (
                <CardBody>
                    <Button
                        size="lg"
                        color="danger"
                        fullWidth
                        as={Link}
                        href={`/auth/login?callbackUrl=/event/${router.query.slug}`}
                    >
                        Login for book ticket
                    </Button>
                </CardBody>
            )}
        </Card>
    )
}

export default DetailCart