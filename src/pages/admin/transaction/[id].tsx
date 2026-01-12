import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailTransaction from "@/components/views/Member/Transaction/DetailTransaction";

const TransactionDetailMemberPage = () => {
    return (
        <DashboardLayout title="Detail Transaction" description="Information for specific Information" type="member">
            <DetailTransaction />
        </DashboardLayout>
    )
}

export default TransactionDetailMemberPage