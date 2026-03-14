"use client";

import { useState } from "react";
import { Folder, CheckCircle, Package } from "lucide-react";
import { mockCategories } from "@/lib/mockData";
import { DataTable } from "@/src/components/dashboard/DataTable";
import { DashboardCard } from "@/src/components/dashboard/DashboardCard";
import { Badge } from "@/src/components/dashboard/Badge";
import { ActionButton } from "@/src/components/dashboard/ActionButton";
import { Modal } from "@/src/components/dashboard/Modal";
import Link from "next/link";

interface CategoryRow {
	id: string;
	name: string;
	description: string;
	itemCount: number;
	createdAt: string;
	status: "active" | "inactive";
}

export default function CategoriesPage() {
	const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(
		null,
	);
	const [showModal, setShowModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState<"name" | "itemCount" | "createdAt">(
		"name",
	);

	const categoryRows: CategoryRow[] = mockCategories.map((cat) => ({
		id: cat.id,
		name: cat.name,
		description: cat.description,
		itemCount: cat.itemCount || 0,
		createdAt: new Date(cat.createdAt).toLocaleDateString(),
		status: cat.status as "active" | "inactive",
	}));

	const filteredCategories = categoryRows
		.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (sortBy === "name") return a.name.localeCompare(b.name);
			if (sortBy === "itemCount") return b.itemCount - a.itemCount;
			if (sortBy === "createdAt")
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			return 0;
		});

	const handleEdit = (category: CategoryRow) => {
		setSelectedCategory(category);
		setShowModal(true);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this category?")) {
			console.log("Deleted category:", id);
		}
	};

	const activeCount = categoryRows.filter((c) => c.status === "active").length;
	const totalItems = categoryRows.reduce((sum, c) => sum + c.itemCount, 0);

	return (
		<div className="space-y-8 pb-8">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-4xl font-bold font-display text-setu-950 mb-2">
						Categories
					</h1>
					<p className="text-setu-600">
						Manage relief categories and disaster types
					</p>
				</div>
				<button className="px-6 py-3 bg-setu-600 text-white rounded-lg font-semibold hover:bg-setu-700 transition-colors">
					+ New Category
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<DashboardCard
					title="Total Categories"
					value={categoryRows.length}
					subtitle="relief types"
					variant="green"
					icon={Folder}
					trend={{ value: 5, direction: "up" }}
				/>
				<DashboardCard
					title="Active Categories"
					value={activeCount}
					subtitle="currently in use"
					variant="green"
					icon={CheckCircle}
					trend={{ value: 2, direction: "up" }}
				/>
				<DashboardCard
					title="Total Items"
					value={totalItems}
					subtitle="across all categories"
					variant="green"
					icon={Package}
					trend={{ value: 12, direction: "up" }}
				/>
			</div>

			{/* Categories Table */}
			<div className="bg-white border border-setu-200 rounded-xl shadow-sm overflow-hidden card-lift">
				<div className="p-6 border-b border-setu-200">
					<div className="flex items-center justify-between gap-4">
						<div className="flex-1">
							<input
								type="text"
								placeholder="Search categories..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full px-4 py-2 border border-setu-200 rounded-lg input-setu focus:ring-2 focus:ring-setu-400 focus:ring-offset-0"
							/>
						</div>
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as any)}
							className="px-4 py-2 border border-setu-200 rounded-lg input-setu">
							<option value="name">Sort by Name</option>
							<option value="itemCount">Sort by Items</option>
							<option value="createdAt">Sort by Date</option>
						</select>
					</div>
				</div>

				<table className="w-full">
					<thead className="bg-setu-50 border-b border-setu-200">
						<tr>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Name
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Description
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Items
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Status
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Created
							</th>
							<th className="px-6 py-4 text-left text-sm font-semibold text-setu-900">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-setu-200">
						{filteredCategories.length > 0 ? (
							filteredCategories.map((category) => (
								<tr
									key={category.id}
									className="hover:bg-setu-50 transition-colors">
									<td className="px-6 py-4 font-semibold text-setu-950">
										{category.name}
									</td>
									<td className="px-6 py-4 text-setu-600 text-sm">
										{category.description}
									</td>
									<td className="px-6 py-4">
										<span className="inline-block px-3 py-1 bg-setu-100 text-setu-700 text-sm rounded-full font-medium">
											{category.itemCount}
										</span>
									</td>
									<td className="px-6 py-4">
										<Badge
											variant={
												category.status === "active" ? "success" : "secondary"
											}>
											{category.status === "active" ? "Active" : "Inactive"}
										</Badge>
									</td>
									<td className="px-6 py-4 text-setu-600 text-sm">
										{category.createdAt}
									</td>
									<td className="px-6 py-4 flex gap-2">
										<ActionButton
											onClick={() => handleEdit(category)}
											variant="edit"
											size="sm"
										/>
										<ActionButton
											onClick={() => handleDelete(category.id)}
											variant="delete"
											size="sm"
										/>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className="px-6 py-8 text-center text-setu-600">
									No categories found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Edit Modal */}
			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false);
					setSelectedCategory(null);
				}}
				title={selectedCategory ? "Edit Category" : "New Category"}>
				{selectedCategory && (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-semibold text-setu-900 mb-2">
								Name
							</label>
							<input
								type="text"
								defaultValue={selectedCategory.name}
								className="w-full px-4 py-2 border border-setu-200 rounded-lg input-setu"
								placeholder="Category name"
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold text-setu-900 mb-2">
								Description
							</label>
							<textarea
								defaultValue={selectedCategory.description}
								className="w-full px-4 py-2 border border-setu-200 rounded-lg input-setu"
								placeholder="Category description"
								rows={3}
							/>
						</div>
						<div className="flex gap-3 justify-end mt-6">
							<button
								onClick={() => setShowModal(false)}
								className="px-4 py-2 border border-setu-300 text-setu-700 rounded-lg font-semibold hover:bg-setu-50 transition-colors">
								Cancel
							</button>
							<button className="px-4 py-2 bg-setu-600 text-white rounded-lg font-semibold hover:bg-setu-700 transition-colors">
								Save Changes
							</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}
