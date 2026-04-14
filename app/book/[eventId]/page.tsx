'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ux } from '@/lib/ux';

export default function PublicBookingPage({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [step, setStep] = useState<'slots' | 'form' | 'success'>('slots');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
  });

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      console.log('Fetching event from:', `/api/public/events/${params.eventId}`);
      const res = await fetch(`/api/public/events/${params.eventId}`);
      
      if (!res.ok) {
        const errData = await res.json();
        console.error('API Error Response:', errData);
        throw new Error(errData.error || 'Failed to fetch');
      }

      const data = await res.json();
      console.log('Received Event Data:', data);
      setEvent(data);
      
      // Auto-select first date with available slots
      if (data.slots && data.slots.length > 0) {
        const firstDate = new Date(data.slots[0].startTime).toDateString();
        setSelectedDate(firstDate);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/public/events/${params.eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timeslotId: selectedSlot.id,
          duration: event.slotDuration || 30,
          prospectName: form.name,
          prospectEmail: form.email,
          prospectPhone: form.phone,
          studentGrade: form.grade,
        }),
      });

      if (res.ok) {
        setStep('success');
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to book');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading && step === 'slots') return <div className="p-8 text-center">Loading...</div>;
  if (!event || !event.slots) return <div className="p-8 text-center text-slate-500 font-bold">Event not found or has no available slots.</div>;

  const uniqueDates = Array.from(new Set(event.slots.map((s: any) => new Date(s.startTime).toDateString())));
  const filteredSlots = event.slots.filter((s: any) => new Date(s.startTime).toDateString() === selectedDate);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-10 selection:bg-blue-50">
      {/* Header */}
      <header className="bg-blue-800 text-white p-10 text-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/40 to-transparent"></div>
        <h1 className="text-5xl font-black tracking-tighter uppercase relative z-10 drop-shadow-md">Engage</h1>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        {step === 'slots' && (
          <div className="space-y-8">
            <section className="text-center space-y-4">
              <h2 className={cn(ux.text.heading, "text-4xl uppercase leading-[0.9]")}>
                {event.headerText || "YOUR GLOBAL FUTURE STARTS HERE"}
              </h2>
              <p className={cn(ux.text.body, "text-xl font-extrabold tracking-tight")}>
                {event.subheaderText || `Schedule your FREE ${event.slotDuration || 30}-minute consultation`}
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pt-2">
                <span className="bg-white border-2 border-slate-100 px-4 py-1.5 rounded-full text-slate-800 font-black shadow-md tracking-tight">📍 {event.location}</span>
              </div>
            </section>

            {/* Date Selector */}
            {uniqueDates.length > 1 && (
               <section className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Date</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {uniqueDates.map((date: any) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={cn(
                          "px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all border-2",
                          selectedDate === date 
                            ? "bg-blue-800 border-blue-800 text-white shadow-md" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-blue-200"
                        )}
                      >
                        {new Date(date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </button>
                    ))}
                  </div>
               </section>
            )}

            <section className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-blue-900">
                📅 Available Times for {new Date(selectedDate).toLocaleDateString([], { month: 'long', day: 'numeric' })}
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {filteredSlots.map((slot: any) => {
                  const isFull = slot.bookedCount >= slot.capacity;
                  return (
                    <button
                      key={slot.id}
                      disabled={isFull}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setStep('form');
                      }}
                      className={cn(
                        "w-full p-5 text-left rounded-2xl border-2 transition-all flex justify-between items-center",
                        isFull 
                          ? "bg-slate-50 border-slate-50 opacity-40 cursor-not-allowed" 
                          : "bg-white border-slate-100 hover:border-blue-500 hover:shadow-xl active:scale-[0.98] shadow-sm"
                      )}
                    >
                      <span className={cn(ux.text.heading, "text-2xl")}>
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={cn(
                        "px-4 py-1.5 rounded-full border",
                        isFull ? ux.badge.neutral : ux.badge.success
                      )}>
                        {isFull ? 'BOOKED' : 'AVAILABLE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Why Engage Section */}
            <section className="mt-10 pt-10 border-t border-slate-100 space-y-4">
               <h3 className="font-bold text-blue-900">Why Engage College Counselling?</h3>
               <ul className="grid grid-cols-1 gap-3 text-sm text-slate-600">
                 <li className="flex gap-2">✅ <span>10+ Years of Excellence in Global Admissions</span></li>
                 <li className="flex gap-2">✅ <span>IVY League & Top University Placements</span></li>
                 <li className="flex gap-2">✅ <span>Personalized 1-on-1 Mentorship</span></li>
                 <li className="flex gap-2">✅ <span>Proven 4-Step Success Framework</span></li>
               </ul>
            </section>
          </div>
        )}

        {step === 'form' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <button onClick={() => setStep('slots')} className="text-blue-600 font-bold flex items-center gap-1 hover:underline">
              ← Back to slots
            </button>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-1">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Confirming for</p>
              <p className="text-xl font-bold text-blue-900">
                {new Date(selectedSlot.startTime).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
              </p>
              <p className="text-sm text-blue-700 font-medium">{event.slotDuration || 30} Minute Consultation</p>
            </div>

            <form onSubmit={handleBooking} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Full Name *</label>
                <Input 
                  required 
                  className="h-14 text-base bg-slate-50 border-slate-200 text-slate-900 focus:bg-white transition-colors"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Email Address (Optional)</label>
                <Input 
                  type="email"
                  className="h-14 text-base bg-slate-50 border-slate-200 text-slate-900 focus:bg-white transition-colors"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Phone Number *</label>
                <Input 
                  required
                  type="tel"
                  className="h-14 text-base bg-slate-50 border-slate-200 text-slate-900 focus:bg-white transition-colors"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Student Grade (Optional)</label>
                <select 
                  className="w-full h-14 px-4 border-2 border-slate-100 rounded-xl text-base bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white transition-all outline-none"
                  value={form.grade}
                  onChange={e => setForm({...form, grade: e.target.value})}
                >
                  <option value="">Select Grade</option>
                  <option value="9">Grade 9</option>
                  <option value="10">Grade 10</option>
                  <option value="11">Grade 11</option>
                  <option value="12">Grade 12</option>
                  <option value="UG">Undergraduate</option>
                </select>
              </div>

              <Button 
                disabled={loading} 
                className="w-full h-16 text-xl font-bold bg-blue-800 hover:bg-blue-900 rounded-2xl shadow-lg hover:shadow-xl transition-all mt-4"
              >
                {loading ? 'Confirming...' : 'Confirm Booking →'}
              </Button>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-10 space-y-6 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
              ✅
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-blue-900 uppercase">CONSULTATION CONFIRMED!</h2>
              <p className="text-lg text-slate-600 font-medium">We look forward to meeting you at the event.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 text-left space-y-6 shadow-sm">
               <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">When</p>
                 <p className="text-xl font-bold text-slate-900">
                    {new Date(selectedSlot.startTime).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                 </p>
                 <p className="text-sm text-slate-500">{event.slotDuration || 30} Minute Consultation</p>
               </div>
               <div className="pt-4 border-t border-slate-200">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Where</p>
                 <p className="text-xl font-bold text-slate-900">{event.location}</p>
               </div>
            </div>

            <div className="space-y-4 pt-6">
              {form.email && <p className="text-sm text-slate-500 font-medium">A confirmation has been sent to {form.email}</p>}
              <Button variant="outline" className="w-full h-14 font-bold rounded-2xl border-2 hover:bg-slate-50 transition-colors" onClick={() => window.location.reload()}>
                Done
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-xl mx-auto px-4 text-center space-y-4 pt-10 border-t border-slate-100">
         <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">© 2026 Engage College Counselling</p>
      </footer>
    </div>
  );
}
