import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { optionAction, orderActions } from '../../store';
import { GroupForm } from './GroupForm';
import css from './OrderForm.module.css';

interface IProps {
  order: IOrder;
  closeForm: () => void;
  closeOrderDetails: () => void;
}

const OrderForm: FC<IProps> = ({ order, closeForm, closeOrderDetails }) => {
  const [isAddGroup, setIsAddGroup] = useState(false);
  const { register, handleSubmit, setValue } = useForm<IOrder>();
  const { groups, course, courseType, status, courseFormat } = useAppSelector(
    (state) => state.option,
  );
  const { limit, offset } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(optionAction.getGroups());
  }, [dispatch, isAddGroup]);
  useEffect(() => {
    dispatch(optionAction.getStatuses());
    dispatch(optionAction.getCourses());
    dispatch(optionAction.getCourseFormats());
    dispatch(optionAction.getCourseTypes());
  }, [dispatch]);

  useEffect(() => {
    if (order) {
      setValue('name', order.name);
      setValue('surname', order.surname);
      setValue('email', order.email);
      setValue('phone', order.phone);
      setValue('age', order.age);
      setValue('group', order.group);
      setValue('status', order.status);
      setValue('course', order.course);
      setValue('course_format', order.course_format);
      setValue('course_type', order.course_type);
      setValue('sum', order.sum);
      setValue('already_paid', order.already_paid);
    }
  }, [order, setValue, course, courseType, groups, status, courseFormat]);

  const update: SubmitHandler<IOrder> = async (formData) => {
    const formattedData = {
      name: formData.name || null,
      surname: formData.surname || null,
      email: formData.email || null,
      phone: formData.phone || null,
      age: formData.age ? +formData.age : null,
      group: formData.group || null,
      status: formData.status || null,
      course: formData.course || null,
      course_format: formData.course_format || null,
      course_type: formData.course_type || null,
      sum: formData.sum ? +formData.sum : null,
      already_paid: formData.already_paid ? +formData.already_paid : null,
    };
    if (formattedData) {
      await dispatch(
        orderActions.updateById({ id: order._id, orderData: formattedData }),
      );
      await dispatch(orderActions.getAll({ limit, offset }));
      closeForm();
      closeOrderDetails();
    }
  };

  const addGroup = () => {
    setIsAddGroup(true);
  };

  return (
    <div className={css.OrderFormMain}>
      <form className={css.OrderForm} onSubmit={handleSubmit(update)}>
        <div className={css.OrderInputsBlock}>
          <div>
            <div className={css.Group}>
              {isAddGroup ? (
                <>
                  <label className={css.OrderLabel}>Group</label>
                  <GroupForm setIsAddGroup={setIsAddGroup} />
                </>
              ) : (
                <>
                  <label className={css.OrderLabel}>Group</label>
                  <select
                    {...register('group')}
                    className={css.OrderFormSelect}
                  >
                    <option value="">all groups</option>
                    {groups.map((group) => (
                      <option key={group._id} value={group._id}>
                        {group.group}
                      </option>
                    ))}
                  </select>
                  <button className={css.btnAddGroup} onClick={addGroup}>
                    ADD GROUP
                  </button>
                </>
              )}
            </div>
            <div className={css.FieldInputDiv}>
              <label className={css.OrderLabel}>Name</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('name')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label className={css.OrderLabel}>Surname</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('surname')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label>Email</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('email')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label>Phone</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('phone')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label>Age</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('age')}
              />
            </div>
          </div>
          <div>
            <div className={css.Status}>
              <label>Status</label>
              <select {...register('status')} className={css.OrderFormSelect}>
                <option value="">all statuses</option>
                {status.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.FieldInputDiv}>
              <label>Sum</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('sum')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label>Already paid</label>
              <input
                className={css.OrderFormInput}
                type="text"
                {...register('already_paid')}
              />
            </div>
            <div className={css.FieldInputDiv}>
              <label>Course</label>
              <select {...register('course')} className={css.OrderFormSelect}>
                <option value="">all courses</option>
                {course.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.FieldInputDiv}>
              <label>Course format</label>
              <select
                {...register('course_format')}
                className={css.OrderFormSelect}
              >
                <option value="">all formats</option>
                {courseFormat.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>
            </div>
            <div className={css.FieldInputDiv}>
              <label className={css.OrderLabel}>Course type</label>
              <select
                {...register('course_type')}
                className={css.OrderFormSelect}
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
        </div>
        <div className={css.ButtonsBlock}>
          <button className={css.btnSaveClose} onClick={closeForm}>
            CLOSE
          </button>
          <button className={css.btnSaveClose} type={'submit'}>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export { OrderForm };
