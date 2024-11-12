import { remove } from "../../common/hooks/useDelete";

export const deleteLevel = async (levelId: string) => {
  return await remove(`/api/levels/${levelId}`);
};
