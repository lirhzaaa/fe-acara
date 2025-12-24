import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import Image from "next/image"
import Link from "next/link"
import useRegister from "./useRegister"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Controller } from "react-hook-form"
import { cn } from "@/utils/cn"

const Register = () => {
    const { visiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors } = useRegister()

    return (
        <div className="flex w-full items-center justify-center gap-10 lg:gap-20 lg:flex-row flex-col">
            <div className="flex flex-col w-full lg:w-1/3 items-center justify-center gap-10">
                <Image src="../images/general/logo.svg" alt="Logo" width={180} height={180} />
                <Image src="../images/illustration/login.svg" alt="Login" className="w-2/3 lg:w-full" width={1024} height={1024} />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
                    <p className="text-small">Have an account?&nbsp;
                        <Link href="/login" className="font-semibold text-danger">Login here</Link>
                    </p>
                    {errors.root && (
                        <p className="font-medium my-2 text-danger">{errors?.root?.message}</p>
                    )}
                    <form className={cn("flex w-80 flex-col mt-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleRegister)}>
                        <Controller name="fullname" control={control} render={({ field }) => (
                            <Input {...field} type="text" label="Fullname" variant="bordered" autoComplete="off" isInvalid={errors.fullname !== undefined} errorMessage={errors.fullname?.message} />
                        )} />
                        <Controller name="username" control={control} render={({ field }) => (
                            <Input {...field} type="text" label="Username" variant="bordered" autoComplete="off" isInvalid={errors.username !== undefined} errorMessage={errors.username?.message} />
                        )} />
                        <Controller name="email" control={control} render={({ field }) => (
                            <Input {...field} type="email" label="Email" variant="bordered" autoComplete="off" isInvalid={errors.email !== undefined} errorMessage={errors.email?.message} />
                        )} />
                        <Controller name="password" control={control} render={({ field }) => (
                            <Input {...field} type={visiblePassword.password ? "text" : "password"} label="Password" variant="bordered" autoComplete="off" isInvalid={errors.password !== undefined} errorMessage={errors.password?.message} endContent={
                                <button type="button" className="focus:outline-none" onClick={() => handleVisiblePassword("password")}>
                                    {visiblePassword.password ? (
                                        <FaEye className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <FaEyeSlash className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                        )} />
                        <Controller name="confirmPassword" control={control} render={({ field }) => (
                            <Input {...field} type={visiblePassword.confirmPassword ? "text" : "password"} label="Password Confirmation" variant="bordered" autoComplete="off" isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message} endContent={
                                <button type="button" className="focus:outline-none" onClick={() => handleVisiblePassword("confirmPassword")}>
                                    {visiblePassword.confirmPassword ? (
                                        <FaEye className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <FaEyeSlash className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                        )} />
                        <Button color="danger" type="submit">
                            {isPendingRegister ? <Spinner color="white" size="sm" /> : "Register"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Register