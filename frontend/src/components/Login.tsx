import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <form>
      <input type="text" placeholder={'email'} {...register('email')} />
      <input type="text" placeholder={'password'} {...register('password')} />
      <button>LOGIN</button>
    </form>
  );
};

export { Login };
