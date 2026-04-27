import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { KnowledgeWorkflow } from "@/components/admin/rankings/KnowledgeWorkflow";

export const metadata = {
  title: "College Knowledge Repository | Waypoint",
  description: "Upload and manage college ranking documents",
};

export default async function KnowledgeRepositoryPage() {
  // Check authentication
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }

  // Check authorization (counselor only)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || user.role !== "counselor") {
    redirect("/");
  }

  // Fetch colleges and ranking sources
  const [colleges, rankingSources] = await Promise.all([
    prisma.college.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.rankingSource.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
        isActive: true,
      },
      where: {
        isActive: true,
      },
      orderBy: {
        displayName: "asc",
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                College Knowledge Repository
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Upload, extract, and manage college ranking documents
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <KnowledgeWorkflow
          colleges={colleges}
          rankingSources={rankingSources}
        />
      </div>
    </div>
  );
}