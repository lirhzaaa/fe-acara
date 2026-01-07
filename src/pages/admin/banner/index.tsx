import DashboardLayout from "@/components/layouts/DashboardLayout"
import Banner from "@/components/views/Admin/Banner"

const AdminBannerPage = () => {
    return (
        <DashboardLayout title="Banner" description="List of all Banneres, create new Banner, and manage existing Banneres." type="admin">
            <Banner />
        </DashboardLayout>
    )
}

export default AdminBannerPage