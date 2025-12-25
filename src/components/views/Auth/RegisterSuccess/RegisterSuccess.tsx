import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"

const RegisterSuccess = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo.svg" alt="Logo" width={180} height={180} />
                <Image src="/images/illustration/email-send.svg" alt="Success" width={500} height={500} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 text-center">
                <h4 className="text-2xl font-bold text-danger">Create Account Success</h4>
                <p className="text-md font-semibold text-default-500">Check your email for account activation</p>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={() => router.push("/")}>Back To Home</Button>
            </div>
        </div>
    )
}

export default RegisterSuccess
