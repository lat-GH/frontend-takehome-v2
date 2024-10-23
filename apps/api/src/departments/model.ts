const departments = [
  { id: 'apparel', name: 'Apparel' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'handbags', name: 'Handbags' },
  { id: 'eyewear', name: 'Eyewear' },
  { id: 'watches', name: 'Watches' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'lingerie', name: 'Lingerie' },
  { id: 'swimwear', name: 'Swimwear' },
  { id: 'athletic-wear', name: 'Athletic Wear' },
  { id: 'formal-wear', name: 'Formal Wear' },
  { id: 'casual-wear', name: 'Casual Wear' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'childrens-clothing', name: "Children's Clothing" },
  { id: 'maternity-wear', name: 'Maternity Wear' },
  { id: 'plus-size-clothing', name: 'Plus Size Clothing' },
  { id: 'vintage-clothing', name: 'Vintage Clothing' },
  { id: 'streetwear', name: 'Streetwear' },
  { id: 'ethnic-wear', name: 'Ethnic Wear' },
  { id: 'workwear', name: 'Workwear' },
  { id: 'uniforms', name: 'Uniforms' },
  { id: 'costumes', name: 'Costumes' },
] as const;

export type DepartmentKeys = (typeof departments)[number]['id'];

export const getDepartments = (
  filterName?: string | undefined
): Array<string> => {
  if (filterName && filterName.length < 3) {
    return null;
  }

  if (filterName) {
    return departments.filter((department) =>
      department.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  return departments;
};

export const getDepartment = (id: DepartmentKeys) => {
  const foundDepartment = departments.find((deparment) => deparment.id === id);

  if (!foundDepartment) {
    return null;
  }

  return foundDepartment;
};
