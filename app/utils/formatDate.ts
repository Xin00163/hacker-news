export default function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });
}
