"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Eye, Edit2, Trash2 } from "lucide-react";
import DataTable from "@/src/components/dashboard/DataTable";
import Badge from "@/src/components/dashboard/Badge";
import ActionButton from "@/src/components/dashboard/ActionButton";
import Modal from "@/src/components/dashboard/Modal";
import { mockCampaigns, Campaign } from "@/lib/mockData";

export default function CampaignsPage() {
	const [campaigns, setCampaigns] = useState(mockCampaigns);
	const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
		null,
	);
	const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
	const [isActionModalOpen, setIsActionModalOpen] = useState(false);
	const [actionType, setActionType] = useState<"approve" | "reject" | null>(
		null,
	);

	const handleApprove = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		setActionType("approve");
		setIsActionModalOpen(true);
	};

	const handleReject = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		setActionType("reject");
		setIsActionModalOpen(true);
	};

	const handleViewDetails = (campaign: Campaign) => {
		setSelectedCampaign(campaign);
		setIsDetailModalOpen(true);
	};

	const confirmAction = () => {
		if (!selectedCampaign || !actionType) return;

		setCampaigns(
			campaigns.map((c) =>
				c.id === selectedCampaign.id
					? { ...c, status: actionType === "approve" ? "approved" : "rejected" }
					: c,
			),
		);

		setIsActionModalOpen(false);
		setSelectedCampaign(null);
		setActionType(null);
	};

	const getStatusBadge = (status: string) => {
		const variants: Record<
			string,
			"success" | "warning" | "error" | "info" | "pending"
		> = {
			active: "info",
			approved: "success",
			rejected: "error",
			completed: "success",
		};
		return variants[status] || "info";
	};

	const columns = [
		{
			key: "title" as const,
			label: "Campaign Title",
			sortable: true,
		},
		{
			key: "category" as const,
			label: "Category",
			sortable: true,
		},
		{
			key: "status" as const,
			label: "Status",
			sortable: true,
			render: (value: string) => (
				<Badge
					variant={getStatusBadge(value)}
					size="sm">
					{value.charAt(0).toUpperCase() + value.slice(1)}
				</Badge>
			),
		},
		{
			key: "fundedAmount" as const,
			label: "Funded",
			sortable: true,
			render: (value: number, row: Campaign) => (
				<div className="text-sm">
					<p className="font-medium">₨{value.toLocaleString()}</p>
					<div className="w-24 bg-setu-100 rounded-full h-2 mt-1">
						<div
							className="bg-setu-500 h-full rounded-full"
							style={{
								width: `${Math.min((value / row.targetAmount) * 100, 100)}%`,
							}}
						/>
					</div>
				</div>
			),
		},
		{
			key: "donorCount" as const,
			label: "Donors",
			sortable: true,
			render: (value: number) => (
				<span className="font-medium text-setu-900">{value}</span>
			),
		},
		{
			key: "id" as const,
			label: "Actions",
			render: (_: string, row: Campaign) => (
				<div className="flex gap-2">
					<ActionButton
						icon={Eye}
						label="View"
						variant="view"
						size="sm"
						onClick={() => handleViewDetails(row)}
					/>
					{row.status === "active" && (
						<>
							<ActionButton
								icon={CheckCircle}
								label="Approve"
								variant="approve"
								size="sm"
								onClick={() => handleApprove(row)}
							/>
							<ActionButton
								icon={XCircle}
								label="Reject"
								variant="reject"
								size="sm"
								onClick={() => handleReject(row)}
							/>
						</>
					)}
				</div>
			),
		},
	];

	return (
		<div className="space-y-6 animate-fade-in-up">
			<div>
				<h1 className="text-3xl font-display font-bold text-setu-900">
					Campaign Management
				</h1>
				<p className="text-setu-500 mt-2">
					Review, approve, and manage disaster relief campaigns
				</p>
			</div>

			{/* Campaign Statistics */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-white p-4 rounded-lg border border-setu-100">
					<p className="text-sm text-setu-600 mb-1">Total Campaigns</p>
					<p className="text-2xl font-bold text-setu-900">{campaigns.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg border border-setu-100">
					<p className="text-sm text-setu-600 mb-1">Active</p>
					<p className="text-2xl font-bold text-blue-600">
						{campaigns.filter((c) => c.status === "active").length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg border border-setu-100">
					<p className="text-sm text-setu-600 mb-1">Approved</p>
					<p className="text-2xl font-bold text-green-600">
						{campaigns.filter((c) => c.status === "approved").length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg border border-setu-100">
					<p className="text-sm text-setu-600 mb-1">Rejected</p>
					<p className="text-2xl font-bold text-red-600">
						{campaigns.filter((c) => c.status === "rejected").length}
					</p>
				</div>
			</div>

			{/* Campaigns Table */}
			<DataTable
				data={campaigns}
				columns={columns}
				searchableFields={["title", "category"]}
				title="All Campaigns"
			/>

			{/* Campaign Details Modal */}
			<Modal
				isOpen={isDetailModalOpen}
				onClose={() => setIsDetailModalOpen(false)}
				title="Campaign Details"
				footer={
					<button
						onClick={() => setIsDetailModalOpen(false)}
						className="px-4 py-2 rounded-lg bg-setu-100 text-setu-700 hover:bg-setu-200 font-medium transition-colors">
						Close
					</button>
				}>
				{selectedCampaign && (
					<div className="space-y-4">
						<div>
							<p className="text-sm text-setu-600">Title</p>
							<p className="text-lg font-semibold text-setu-900 mt-1">
								{selectedCampaign.title}
							</p>
						</div>

						<div>
							<p className="text-sm text-setu-600">Description</p>
							<p className="text-sm text-setu-700 mt-1">
								{selectedCampaign.description}
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-setu-600">Category</p>
								<p className="font-medium text-setu-900 mt-1">
									{selectedCampaign.category}
								</p>
							</div>
							<div>
								<p className="text-sm text-setu-600">Status</p>
								<Badge
									variant={getStatusBadge(selectedCampaign.status)}
									size="sm"
									className="mt-1">
									{selectedCampaign.status.charAt(0).toUpperCase() +
										selectedCampaign.status.slice(1)}
								</Badge>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-setu-600">Target Amount</p>
								<p className="font-semibold text-setu-900 mt-1">
									₨{selectedCampaign.targetAmount.toLocaleString()}
								</p>
							</div>
							<div>
								<p className="text-sm text-setu-600">Funded Amount</p>
								<p className="font-semibold text-green-600 mt-1">
									₨{selectedCampaign.fundedAmount.toLocaleString()}
								</p>
							</div>
						</div>

						<div>
							<p className="text-sm text-setu-600 mb-2">Funding Progress</p>
							<div className="bg-setu-100 rounded-full h-3 overflow-hidden">
								<div
									className="bg-setu-500 h-full transition-all duration-300"
									style={{
										width: `${Math.min(
											(selectedCampaign.fundedAmount /
												selectedCampaign.targetAmount) *
												100,
											100,
										)}%`,
									}}
								/>
							</div>
							<p className="text-sm text-setu-500 mt-2">
								{Math.round(
									(selectedCampaign.fundedAmount /
										selectedCampaign.targetAmount) *
										100,
								)}
								% funded
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-setu-600">Total Donors</p>
								<p className="font-semibold text-setu-900 mt-1">
									{selectedCampaign.donorCount}
								</p>
							</div>
							<div>
								<p className="text-sm text-setu-600">Created By</p>
								<p className="font-semibold text-setu-900 mt-1">
									{selectedCampaign.createdBy}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-setu-600">Start Date</p>
								<p className="text-sm text-setu-900 mt-1">
									{new Date(selectedCampaign.startDate).toLocaleDateString()}
								</p>
							</div>
							<div>
								<p className="text-sm text-setu-600">End Date</p>
								<p className="text-sm text-setu-900 mt-1">
									{new Date(selectedCampaign.endDate).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
				)}
			</Modal>

			{/* Action Confirmation Modal */}
			<Modal
				isOpen={isActionModalOpen}
				onClose={() => setIsActionModalOpen(false)}
				title={
					actionType === "approve" ? "Approve Campaign" : "Reject Campaign"
				}
				footer={
					<div className="flex gap-3">
						<button
							onClick={() => setIsActionModalOpen(false)}
							className="px-4 py-2 rounded-lg border border-setu-200 text-setu-700 hover:bg-setu-50 font-medium transition-colors">
							Cancel
						</button>
						<button
							onClick={confirmAction}
							className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
								actionType === "approve"
									? "bg-green-600 hover:bg-green-700"
									: "bg-red-600 hover:bg-red-700"
							}`}>
							{actionType === "approve" ? "Approve" : "Reject"}
						</button>
					</div>
				}>
				<div className="space-y-4">
					<p className="text-setu-700">
						{actionType === "approve"
							? `Are you sure you want to approve the campaign "${selectedCampaign?.title}"? This will make it visible to all donors.`
							: `Are you sure you want to reject the campaign "${selectedCampaign?.title}"? This action cannot be undone.`}
					</p>

					<div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
						<p className="text-sm text-yellow-800">
							{actionType === "approve"
								? "Approved campaigns will be featured on the platform."
								: "Rejected campaigns cannot be reactivated."}
						</p>
					</div>
				</div>
			</Modal>
		</div>
	);
}
