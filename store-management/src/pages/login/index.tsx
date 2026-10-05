import { useMutation } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import DsButton from "../../components/design-system/DsButton"
import PageHeader from "../../components/global/PageHeader"
import PagesLayout from "../../components/global/PagesLayout"
import { loginApi } from "../../services/login-service"

export type LoginFormData = {
  username: string
  password: string
}

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass'
    }
  });
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      sessionStorage.setItem('token', data.accessToken);
      toast.success('You Logined In Successfuly :)');
      navigate('/app/dashboard');
    },
    onError: (error) => {
      console.error('Login error:', error);
      toast.error(error.message);
    }
  })

  const onLogin = (formData: LoginFormData) => {
    login({
      username: formData.username,
      password: formData.password
    });
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/app/dashboard')
    }
  }, [])

  return (
    <PagesLayout>
      <PageHeader text="Store Manager - Login" />

      <form className="bg-neutral-900 p-8 rounded-lg mx-auto w-1/3" onSubmit={handleSubmit(onLogin)}>
        <div className='mb-4'>
          <label className='flex justify-between items-center text-lg mb-1'>
            Username
            {errors.username && <span className="text-red-500">Username is required</span>}
          </label>
          <input
            type="text"
            placeholder='Enter Username'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('username', { required: true })}
          />
        </div>

        <div className='mb-4'>
          <label className='flex justify-between items-center text-lg mb-1'>
            Password
            {errors.password && <span className="text-red-500">Password is required</span>}
          </label>
          <input
            type="password"
            placeholder='Enter Password'
            className='w-full border border-neutral-700 bg-neutral-900 px-3 py-2 text-lg rounded-md'
            {...register('password', { required: true })}
          />
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <DsButton type="submit" color="primary" size="large" loading={isPending}>Login To App</DsButton>
        </div>
      </form>
    </PagesLayout>
  )
}

export default Login
