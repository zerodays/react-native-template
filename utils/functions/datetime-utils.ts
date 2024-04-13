export const formatDate = (date: Date, locale?: string) => {
  return date.toLocaleDateString(locale ?? 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: Date, locale?: string) => {
  return date.toLocaleTimeString(locale ?? 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
