import { remove } from "../../hooks/useDelete";

export const deleteUnit = async (unitId: string) => {
  return await remove(`/api/units/${unitId}`);
};
