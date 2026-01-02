import DashboardLayout from "@/components/layouts/DashboardLayout"
import DetailCategory from "@/components/views/Admin/Category/DetailCategory"

const AdminDetailCategoryPage = () => {
    return (
        <DashboardLayout title="Detail Category" description="Manage information for this category." type="admin">
            <DetailCategory />
        </DashboardLayout>
    )
}

export default AdminDetailCategoryPage