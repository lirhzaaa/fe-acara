interface ICategory {
  _id?: string;
  name: string;
  description: string;
  icon: string;
}

interface ICategoryForm extends Omit<ICategory, "icon"> {
  icon: FileList;
}

export { ICategory, ICategoryForm };
