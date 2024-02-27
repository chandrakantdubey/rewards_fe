import qs from "query-string";

export const getQsValues = (data) => {
  return qs.stringify(
    { ...data },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );
};
