export const formatDate = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
