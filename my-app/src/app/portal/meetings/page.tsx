// import MeetingsTable from "@/components/portal/meetings-table";
// import AddMeetingForm from "@/components/portal/add-meeting-form";

import AddMeetingForm from "@/app/components/portal/add-meeting-form";
import MeetingsTable from "@/app/components/portal/meetings-table";

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Meetings</h1>
      <AddMeetingForm />
      <MeetingsTable />
    </div>
  );
}