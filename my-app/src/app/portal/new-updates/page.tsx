// import NewUpdatesList from "@/components/portal/new-updates-list";
// import AddUpdateForm from "@/components/portal/add-update-form";

import AddUpdateForm from "@/app/components/portal/add-update-form";
import NewUpdatesList from "@/app/components/portal/new-updates-list";

export default function NewUpdatesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">New Updates</h1>
      <AddUpdateForm />
      <NewUpdatesList />
    </div>
  );
}