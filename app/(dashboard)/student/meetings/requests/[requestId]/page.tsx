import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { MeetingBackButton } from '@/components/meetings/MeetingBackButton';
import { RequestManagementClient } from './RequestManagementClient';

export default async function StudentRequestDetailPage({ params }: { params: { requestId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const request = await prisma.meetingRequest.findUnique({
    where: { id: params.requestId },
    include: {
      student: {
        include: {
          user: true,
        },
      },
      host: true,
    },
  });

  if (!request) return notFound();
  if (request.studentId !== session.user.id) return notFound();

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-start">
        <MeetingBackButton />
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="flex justify-between items-start border-b pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className={`px-2 py-0.5 ${
                 request.status === 'Declined' ? 'bg-red-100 text-red-800' :
                 request.status === 'Cancelled' ? 'bg-gray-100 text-gray-800' :
                 'bg-yellow-100 text-yellow-800'
               } text-[10px] uppercase rounded-full font-bold`}>
                 {request.status === 'Pending' ? 'Pending Request' : request.status}
               </span>
            </div>
            <h1 className="text-3xl font-bold text-black">{request.meetingType} Session</h1>
            <p className="text-gray-600 mt-2">
              {request.status === 'Declined' ? (
                <>Request declined by <span className="font-semibold text-black">{request.host.firstName} {request.host.lastName}</span></>
              ) : request.status === 'Cancelled' ? (
                <>Meeting request was cancelled.</>
              ) : (
                <>Request sent to <span className="font-semibold text-black">{request.host.firstName} {request.host.lastName}</span></>
              )}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                <span className="text-lg">📅</span>
                {new Date(request.requestedStart).toLocaleDateString(undefined, { dateStyle: 'long' })}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                <span className="text-lg">⏰</span>
                {new Date(request.requestedStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(request.requestedEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          <div className="text-right">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
               Submitted on {new Date(request.createdAt).toLocaleDateString()}
             </span>
          </div>
        </div>

        <RequestManagementClient request={JSON.parse(JSON.stringify(request))} />
        
        {request.hostNote && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Note from Counselor</h3>
            <p className="text-sm text-gray-700">{request.hostNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
