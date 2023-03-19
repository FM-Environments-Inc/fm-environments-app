export const formatDate = (date: string) => {
  const dateArr = date.split('T');
  const timeArr = dateArr[1].split(':');
  return `${dateArr[0]} ${timeArr[0]}:${timeArr[1]}`;
};
