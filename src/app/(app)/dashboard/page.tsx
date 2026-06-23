import Link from "next/link";

export default async function Dashboard() {
  return (
    <>
      <h1 className="block">Dashboard</h1>
      <Link href="/">Back to home</Link>
    </>
  );
}
