import { Request, Response } from 'express';
import { getDepartments, getDepartment, DepartmentKeys } from './model';
import { getSubDepartments } from './sub-departments/model';

const getDepartmentsController = (req: Request, res: Response) => {
  const departments = getDepartments(req.query.searchTerm as string);

  if (departments === null) {
    res.status(422).json({
      error: {
        code: '0001',
        message:
          "The search term provided wasn't long enough, please provide more than 2 characters",
      },
    });
    return;
  }

  res.json({ departments });
};

const getDepartmentContoller = (req: Request, res: Response) => {
  const departmentName = req.params.department_name as DepartmentKeys;
  const department = getDepartment(departmentName);

  if (department === null) {
    res.status(404).json({
      error: {
        code: '0002',
        message: `Department "${departmentName}" does not exist.`,
      },
    });
    return;
  }

  const subDepartments = getSubDepartments(departmentName);

  res.json({
    department: {
      ...department,
      subDepartments,
    },
  });
};

export default {
  getDepartmentsController,
  getDepartmentContoller,
};
