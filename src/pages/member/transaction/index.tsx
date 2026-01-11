import DashboardLayout from "@/components/layouts/DashboardLayout";
import Transaction from "@/components/views/Member/Transaction";

const TransactionMemberPage = () => {
    return (
        <DashboardLayout title="Acara | Transaction" description="List of all transaction" type="member">
            <Transaction />
        </DashboardLayout>
    )
}

export default TransactionMemberPage