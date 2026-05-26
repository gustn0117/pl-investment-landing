export function isValidIp(s: string): boolean {
  const v = (s || "").trim();
  if (!v) return false;
  // IPv4
  const v4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const m = v.match(v4);
  if (m) {
    return m.slice(1).every((p) => {
      const n = Number(p);
      return n >= 0 && n <= 255 && String(n) === p;
    });
  }
  // IPv6 (lenient — must contain colons and only hex/colon characters)
  if (v.includes(":") && /^[0-9a-fA-F:]+$/.test(v) && v.length <= 45) {
    return true;
  }
  return false;
}
