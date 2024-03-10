export function formatMessageTime(time: string): string {
  const date = new Date(time);
  const currentDate = new Date();
  const year = date.getFullYear();

  // If the year is the current year
  if (year === currentDate.getFullYear()) {
    return `${date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
    })}, ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    return `${date.toLocaleString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })}, ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }
}
