import { Autocomplete, AutocompleteItem, Select, SelectItem, Skeleton } from "@heroui/react"
import { Controller } from "react-hook-form"
import useEventFilter from "./useEventFilter"
import { ICategory } from "@/types/Category"
import useChangeUrl from "@/hooks/useChangeUrl"
import { useEffect } from "react"

const EventFilter = () => {
    const { control, setValue, dataCategory, dataEvent, isSuccessGetCategory, isSuccessGetEvent } = useEventFilter()
    const {
        currentCategory,
        currentIsOnline,
        currentIsFeatured,
        handleChangeCategory,
        handleChangeIsOnline,
        handleChangeIsFeatured } = useChangeUrl()

    useEffect(() => {
        if (currentCategory !== "") {
            setValue("category", `${currentCategory}`)
        }

        if (currentIsFeatured && currentIsOnline !== "") {
            setValue("isOnline", `${currentIsOnline}`)
            setValue("isFeatured", `${currentIsFeatured}`)
        }
    }, [isSuccessGetCategory, isSuccessGetEvent])

    console.log(dataEvent?.data)

    return (
        <div className="lg:sticky top-20 h-fit w-full rounded-xl shadow p-4 lg:w-80">
            <h4 className="text-xl font-semibold">Filter</h4>
            <div className="mt-4 flex flex-col gap-4">
                {isSuccessGetCategory ? (
                    <Controller name="category" control={control} render={({ field: { onChange, ...field } }) => (
                        <Autocomplete
                            {...field}
                            defaultSelectedKey={`${currentCategory}`}
                            defaultItems={dataCategory?.data.data || []}
                            label="Category"
                            placeholder="Select Category Event"
                            variant="bordered"
                            onSelectionChange={(value) => {
                                onChange(value)
                                handleChangeCategory(value !== null ? `${value}` : "")
                            }}
                        >
                            {(category: ICategory) => (
                                <AutocompleteItem key={`${category._id}`}>
                                    {category.name}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    )} />
                ) : (
                    <Skeleton className="w-full h-14 rounded-xl" />
                )}
                
                {isSuccessGetCategory ? (
                    <Controller
                        name="isOnline"
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                            <Select
                                {...field}
                                label="Online / Offline"
                                placeholder="Select Online / Offline"
                                labelPlacement="outside"
                                variant="bordered"
                                disallowEmptySelection
                                defaultSelectedKeys={`${currentIsOnline}`}
                                onChange={(e) => handleChangeIsOnline(e.target.value)}>
                                <SelectItem key="true" textValue="Online">Online</SelectItem>
                                <SelectItem key="false" textValue="Offline">Offline</SelectItem>
                            </Select>
                        )}
                    />
                ) : (
                    <Skeleton className="w-full h-14 rounded-xl" />
                )}

                {isSuccessGetCategory ? (
                    <Controller
                        name="isFeatured"
                        control={control}
                        render={({ field: { onChange, ...field } }) => (
                            <Select
                                {...field}
                                label="Featured"
                                placeholder="Select Category Event"
                                labelPlacement="outside"
                                variant="bordered"
                                disallowEmptySelection
                                defaultSelectedKeys={`${currentIsFeatured}`}
                                onChange={(e) => handleChangeIsFeatured(e.target.value)}>
                                <SelectItem key="true" textValue="Yes">Yes</SelectItem>
                                <SelectItem key="false" textValue="No">No</SelectItem>
                            </Select>
                        )}
                    />
                ) : (
                    <Skeleton className="w-full h-14 rounded-xl" />
                )}
            </div>
        </div>
    )
}

export default EventFilter
