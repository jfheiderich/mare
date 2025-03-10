/**
 *
 * @param dateString
 * @returns
 * result.formattedDate => 19/02/2025
 * result.formattedTime => 14:24
 */
export const formatDateAndTime = (
  dateString: Date | string | null | undefined
) => {
  if (dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  } else {
    const formattedDate = `--/--/----`;
    const formattedTime = `--:--`;
    return { formattedDate, formattedTime };
  }
};
