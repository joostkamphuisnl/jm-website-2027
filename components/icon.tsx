export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}</svg>;
}

export function Play({ className = "" }: { className?: string }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l14-8z" /></svg>;
}

export function Pause() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3v14H7zm7 0h3v14h-3z" /></svg>;
}

export function Close() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function Instagram() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
}

export function TikTok() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.2v13a2.9 2.9 0 1 1-2.4-2.9V8.8a6.2 6.2 0 1 0 5.7 6.2V8.5a8.1 8.1 0 0 0 4.7 1.5V6.7A4.9 4.9 0 0 1 16.6 2Z" /></svg>;
}

export function YouTube() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1C.5 9 .5 12 .5 12s0 3 .5 4.9a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2c.5-1.9.5-4.9.5-4.9s0-3-.5-4.9ZM9.7 15.3V8.7l5.8 3.3-5.8 3.3Z" /></svg>;
}
