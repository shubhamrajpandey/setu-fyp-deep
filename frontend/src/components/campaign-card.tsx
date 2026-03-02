import Link from "next/link";
import { Users, Target } from "lucide-react";

interface CampaignCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
  donors: number;
  category: string;
  urgent?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  Medical: "bg-red-50 text-red-700 border-red-100",
  Education: "bg-blue-50 text-blue-700 border-blue-100",
  Emergency: "bg-orange-50 text-orange-700 border-orange-100",
  Animals: "bg-purple-50 text-purple-700 border-purple-100",
  Charity:
    "bg-[var(--setu-green-50)] text-[var(--setu-green-700)] border-[var(--setu-green-100)]",
  default: "bg-gray-50 text-gray-700 border-gray-100",
};

export function CampaignCard({
  id,
  title,
  description,
  imageUrl,
  raised,
  goal,
  donors,
  category,
  urgent,
}: CampaignCardProps) {
  const percentage = Math.min((raised / goal) * 100, 100);
  const categoryStyle = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;

  return (
    <Link href={`/campaigns/${id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-[var(--setu-green-100)] card-hover shadow-sm">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--setu-green-50)]">
          <img
            src={imageUrl || "/placeholder.svg?height=200&width=320"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {/* Category badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryStyle}`}
          >
            {category}
          </span>
          {urgent && (
            <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500 text-white animate-pulse">
              Urgent
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-[var(--setu-green-900)] text-base leading-snug line-clamp-2 group-hover:text-[var(--setu-green-600)] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="relative h-2 bg-[var(--setu-green-100)] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--setu-green-500)] to-[var(--setu-green-400)] rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-[var(--setu-green-800)]">
                  NPR {raised.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 ml-1">
                  of NPR {goal.toLocaleString()}
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--setu-green-600)]">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3.5 h-3.5 text-[var(--setu-green-500)]" />
                <span>{donors.toLocaleString()} donors</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Target className="w-3.5 h-3.5 text-[var(--setu-green-500)]" />
                <span>Goal: NPR {goal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donate CTA on hover */}
        <div className="px-5 pb-5">
          <div className="w-full py-2.5 bg-[var(--setu-green-50)] hover:bg-[var(--setu-green-700)] text-[var(--setu-green-700)] hover:text-white text-sm font-semibold rounded-xl text-center transition-all duration-200 border border-[var(--setu-green-200)] hover:border-transparent">
            Donate Now
          </div>
        </div>
      </div>
    </Link>
  );
}
