import express, { Router } from 'express';
import departmentController from './controller';
import subDepartmentController from './sub-departments/controller';

const DEFAULT_ROUTE = '';

export default (router: Router) => {
  const departments = express.Router();

  departments
    .route(DEFAULT_ROUTE)
    .get(departmentController.getDepartmentsController);

  departments
    .route('/:department_name')
    .get(departmentController.getDepartmentContoller);

  router.use('/departments', departments);
};
