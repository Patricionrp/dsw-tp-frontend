import { remove } from "../../hooks/useDelete";

export const deleteCourse = async (courseId: string) => {
  return await remove(`/api/courses/${courseId}`);
};
