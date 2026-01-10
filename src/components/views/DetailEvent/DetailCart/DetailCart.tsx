import { ICart, ITicket } from "@/types/Ticket"
import { converIDR } from "@/utils/currency"
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react"

interface propTypes {
    cart: ICart
    dataTicketInCart: ITicket
    onChangeQuantity: (type: "increment" | "decrement") => void
}

const DetailCart = (props: propTypes) => {
    const {
        cart,
        dataTicketInCart,
        onChangeQuantity
    } = props

    return (
        <Card radius="lg" className="lg:sticky lg:top-20 border-none p-6">
            <CardBody className="gap-4">
                <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
                {cart.ticket == "" ? (
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
            </CardBody>
            <CardFooter>
                <Button
                    size="md"
                    color="danger"
                    fullWidth
                    disabled={cart.quantity === 0}
                    className="disabled:bg-danger-200">
                    Checkout
                </Button>
            </CardFooter>
        </Card>
    )
}

export default DetailCart