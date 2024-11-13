import { SESSION_KEY } from "../../constant";

export default function loadState() {
  try {
    const serializedState = sessionStorage.getItem(SESSION_KEY);
    if (serializedState === null) return;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("세션 스토리지 업로드 실패", e);
    return;
  }
}
