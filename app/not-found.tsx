import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icon";

export default function NotFound() { return <><Header /><main id="main" className="not-found wrap"><p className="eyebrow accent">404</p><h1>PAGE NOT<br />FOUND</h1><p>The page you’re looking for could not be found.</p><Link href="/" className="button button-accent">Back to home<Arrow /></Link></main><Footer /></>; }

