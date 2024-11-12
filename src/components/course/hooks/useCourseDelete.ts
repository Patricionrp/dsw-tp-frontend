import { remove } from "../../common/hooks/useDelete";

export const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
