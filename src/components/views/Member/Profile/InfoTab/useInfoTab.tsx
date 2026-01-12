import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateInfo = Yup.object().shape({
    fullname: Yup.string().required("Please input your fullname"),
})

const useInfoTab = () => {

    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
        defaultValues: {
            fullname: ""
        }
    })

    return {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    }
}

export default useInfoTab