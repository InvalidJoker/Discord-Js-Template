export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTimeString({
  timestamp = Date.now(),
  full = true,
} = {}): string {
  const date = new Date(timestamp);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = days[date.getDay()];
  const dd = date.getDate().toString().padStart(2, "0");
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  if (!full) {
    return `${dd}/${mm} ${hours}:${minutes}`;
  }
  return `${day} ${dd}/${mm}/${yyyy} ${hours}:${minutes}:${seconds}`;
}
