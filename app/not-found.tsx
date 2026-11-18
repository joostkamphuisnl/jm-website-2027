import Link from "next/link";
import { Arrow } from "@/components/icon";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="not-found">
      <div className="wrap">
        <h1>Page not found</h1>
        <p>This address may have changed. Find the music in our release catalogue.</p>
        <Link href="/#releases" className="button button-accent">Browse releases<Arrow /></Link>
      </div>
    </main>
  );
}

