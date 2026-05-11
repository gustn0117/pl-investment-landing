export type PhoneCheck =
  | { ok: true; normalized: string }
  | { ok: false; error: string };

export function normalizePhone(raw: string): string {
  return (raw || "").replace(/\D/g, "");
}

export function validatePhone(raw: string): PhoneCheck {
  const digits = normalizePhone(raw);
  if (digits.length === 0) {
    return { ok: false, error: "휴대폰 번호를 입력해 주세요." };
  }
  if (digits.length < 10 || digits.length > 11) {
    return { ok: false, error: "휴대폰 번호는 10~11자리여야 합니다." };
  }
  if (!digits.startsWith("0")) {
    return { ok: false, error: "올바른 형식의 휴대폰 번호를 입력해 주세요." };
  }
  return { ok: true, normalized: digits };
}
