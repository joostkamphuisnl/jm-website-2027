import Image from "next/image";

export function ITunesLink({ href }: { href: string }) {
  return (
    <a className="itunes-link" href={`${href}&app=itunes`} target="_blank" rel="noreferrer">
      <Image src="/media/itunes-store.svg" alt="Get it on iTunes Store" width={110} height={32} />
    </a>
  );
}
