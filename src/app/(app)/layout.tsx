import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-center gap-x-2">
            <div className="bg-gradient-to-r from-[#8b7bff] to-[#6a57e6] rounded-sm w-7 h-7 flex items-center justify-center text-white font-bold">
              没
            </div>
            <p className="text-white text-lg font-bold">Immerse</p>
          </div>
        </SidebarHeader>
        <SidebarContent>content</SidebarContent>
      </Sidebar>
      <SidebarTrigger />
      <main>{children}</main>
    </SidebarProvider>
  );
}
