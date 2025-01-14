import categoryModel from "./Category.model";

//1. create a category.
const createCategory = async (payload: { name: string }) => {
  const result = await categoryModel.create(payload);
  return result;
};

//2. get all category.
const getAllCategory = async () => {
  const result = await categoryModel.find({ isDeleted: false });
  return result;
};
//3. get all category.
const deleteCategory = async (id: string) => {
  const result = await categoryModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

const categoryService = { createCategory, getAllCategory, deleteCategory };
export default categoryService;
