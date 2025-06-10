
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UsersTable } from "@/components/users-table"

export default function Component() {
  return (
    // <SidebarProvider>
    //   <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">User Management</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4">
          <UsersTable/>
        </div>
      </SidebarInset>
    // </SidebarProvider>
  )
}
