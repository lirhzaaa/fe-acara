import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import useLogin from "./useLogin"
import { Controller } from "react-hook-form"
import { cn } from "@/utils/cn"

const Login = () => {
    const { isVisible, toogleVisibility, control, handleSubmit, handleLogin, isPendingLogin, errors } = useLogin()
    return (
        <div className="flex w-full items-center justify-center gap-10 lg:gap-20 lg:flex-row flex-col">
            <div className="flex flex-col w-full lg:w-1/3 items-center justify-center gap-10">
                <Image src="../images/general/logo.svg" alt="Logo" width={180} height={180} />
                <Image src="../images/illustration/login.svg" alt="Login" className="w-2/3 lg:w-full" width={1024} height={1024} />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-2xl font-bold text-danger-500">Login</h2>
                    <p className="text-small mt-2">Don`n have an account?&nbsp;
                        <Link href="/auth/register" className="font-semibold text-danger">Register here</Link>
                    </p>
                    {errors.root && (
                        <p className="text-sm font-medium my-2 text-danger">{errors?.root?.message}</p>
                    )}
                    <form className={cn("flex w-80 flex-col mt-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
                        <Controller name="identifier" control={control} render={({ field }) => (
                            <Input {...field} type="text" label="Email / Username" variant="bordered" autoComplete="off" isInvalid={errors.identifier !== undefined} errorMessage={errors.identifier?.message} />
                        )} />
                        <Controller name="password" control={control} render={({ field }) => (
                            <Input {...field} type={isVisible ? "text" : "password"} label="Password" variant="bordered" autoComplete="off" isInvalid={errors.password !== undefined} errorMessage={errors.password?.message} endContent={
                                <button type="button" className="focus:outline-none" onClick={toogleVisibility}>
                                    {isVisible ? (
                                        <FaEye className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <FaEyeSlash className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                        )} />
                        <Button color="danger" type="submit">
                            {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login