import Link from "next/link";
import Posts from "@/components/Posts";

export default async function Home() {
  return (
    <main className="relative min-h-screen bg-white w-full md:w-[678px] mx-auto">
      <Posts />

      <Link
        href="/new"
        className="fixed bottom-4 right-4 md:right-1/2 md:translate-x-[339px] md:mr-8 bg-blue-500 text-white p-4 rounded-full hover:shadow-md"
      >
        New Post
      </Link>
    </main>
  );
}
