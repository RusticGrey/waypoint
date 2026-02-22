import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function CoordinatorStudentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const students = await prisma.student.findMany({
    where: { coordinatorId: session.user.id },
    include: {
      user: true,
      personalProfile: true,
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Students</h1>
        <Link href="/coordinator">
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <Link key={student.userId} href={`/coordinator/students/${student.userId}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                      {student.user.firstName[0]}{student.user.lastName[0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {student.user.firstName} {student.user.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Grade {student.currentGrade} • Class of {student.graduationYear}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <span className="text-gray-500">Completion</span>
                  <span className="font-medium text-blue-600">{student.profileCompletionPct}%</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {students.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No students assigned to you yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
