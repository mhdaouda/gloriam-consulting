/**
 * Lien admin discret — smiley quasi invisible, visible au survol.
 */
export function AdminPortalLink() {
  return (
    <a
      href="/admin/"
      className="admin-portal-link ml-1 inline-block select-none text-[11px] leading-none opacity-[0.14] transition-opacity duration-300 hover:opacity-55 focus:opacity-70 focus:outline-none"
      aria-label="Administration"
      title=""
    >
      <span aria-hidden="true">🙂</span>
    </a>
  );
}
