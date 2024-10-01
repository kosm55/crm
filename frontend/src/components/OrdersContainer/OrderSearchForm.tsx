import { joiResolver } from '@hookform/resolvers/joi';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { IGroup } from '../../interfaces/groupInterface';
import { IQueryParamsFilters } from '../../interfaces/queryInterface';
import { OrderValidator } from '../../validators';
import css from './OrderSearchForm.module.css';

interface IState {
  groups: IGroup[];
  status: string[];
  courseFormat: string[];
  course: string[];
  courseType: string[];
  resetFilters: () => void;
  searchOrders: (formValues: IQueryParamsFilters) => void;
  loadingXlsFile: () => void;
}
const OrderSearchForm: FC<IState> = ({
  groups,
  status,
  courseFormat,
  course,
  courseType,
  resetFilters,
  searchOrders,
  loadingXlsFile,
}) => {
  const { register, handleSubmit, reset, watch } =
    useForm<IQueryParamsFilters>();
  const formValues = watch();
  // const onSubmit = (data: IQueryParamsFilters) => {
  //   searchOrders(data);
  // };
  const skipFilter = () => {
    reset();
    resetFilters();
  };

  return (
    <form className={css.OrderSearchForm} onChange={handleSubmit(searchOrders)}>
      <div>
        <div className={css.InputBlock}>
          <input
            type="text"
            className={css.OrderSearchFormInput}
            placeholder={'Name'}
            {...register('name')}
          />
          <input
            type="text"
            className={css.OrderSearchFormInput}
            placeholder={'Surname'}
            {...register('surname')}
          />
          <input
            type="text"
            className={css.OrderSearchFormInput}
            placeholder={'Email'}
            {...register('email')}
          />
          <input
            type="text"
            className={css.OrderSearchFormInput}
            placeholder={'Phone'}
            {...register('phone')}
          />
          <input
            type="text"
            className={css.OrderSearchFormInput}
            placeholder={'Age'}
            {...register('age')}
          />
        </div>

        <div className={css.InputBlock}>
          <select {...register('group')} className={css.OrderSearchFormSelect}>
            <option value="">all groups</option>
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.group}
              </option>
            ))}
          </select>
          <select {...register('status')} className={css.OrderSearchFormSelect}>
            <option value="">all statuses</option>
            {status.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select {...register('course')} className={css.OrderSearchFormSelect}>
            <option value="">all courses</option>
            {course.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          <select
            {...register('course_format')}
            className={css.OrderSearchFormSelect}
          >
            <option value="">all formats</option>
            {courseFormat.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
          <select
            {...register('course_type')}
            className={css.OrderSearchFormSelect}
          >
            <option value="">all types</option>
            {courseType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={css.ButtonBlock}>
        <div className={css.CheckboxBlock}>
          <input
            type={'checkbox'}
            {...register('userOnly')}
            className={css.OrderSearchFormInputCheckbox}
          />
          <label className={css.OrderSearchFormLabel}>My order</label>
        </div>
        <div className={css.OrderSearchFormImgBlock}>
          <img
            src="/reset.svg"
            alt="reset"
            onClick={skipFilter}
            className={css.OrderSearchFormImg}
          />
        </div>
        <div className={css.OrderSearchFormImgBlock}>
          <img
            src="/xls.svg"
            alt="xls"
            onClick={loadingXlsFile}
            className={css.OrderSearchFormImg}
          />
        </div>
      </div>
    </form>
  );
};

export { OrderSearchForm };
