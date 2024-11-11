import { remove } from "../../hooks/useDelete";

export const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
