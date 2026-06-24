export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="relative h-screen bg-[#0c0d11] flex justify-center items-center">
      <div className=" bg-[#101219] rounded-2xl p-10 border border-white/15 min-w-[380px]">
        {children}
      </div>
    </section>
  );
}
