import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";

const DashboardAdminPage = () => {
    return (
        <DashboardLayout title="Acara | Dashboard" type="admin">
            <Dashboard />
        </DashboardLayout>
    )
}

export default DashboardAdminPage