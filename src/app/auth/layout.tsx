export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="relative h-screen bg-[#0c0d11] flex justify-center items-center">
      <div className=" bg-[#101219] rounded-2xl p-10 border border-white/15 w-full max-w-[380px] lg:max-w-[420px]">
        {children}
      </div>
    </section>
  );
}
