import { useContext, useEffect } from 'react';
import { DataContext } from '../../providers/DataProvider';
import Timer from './Timer';
import { SubmitHandler, useForm } from 'react-hook-form';

type Input = {
  birthday: string;
};

function MyBirthday() {
  const { userData, setUserData } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    setUserData((prev) => ({ ...prev, date: data.birthday }));
  };

  const resetBirthday = () => {
    setUserData((prev) => ({ ...prev, date: ' ' }));
  };

  useEffect(() => {
    if (isSubmitSuccessful) reset({ birthday: '' });
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      {userData.date !== ' ' ? (
        <div className="flex flex-col gap-8 items-center">
          <Timer date={userData.date}></Timer>
          <button className="primary-button" onClick={resetBirthday}>
            reset your birthday
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="form-input"
              type="date"
              {...register('birthday', {
                required: 'The birthday is required',
                max: { value: new Date().toISOString().split('T')[0], message: "Looks like you wasn't born yet." },
              })}
            ></input>
            {errors.birthday && <div className="error text-xs font-normal text-red-400">{errors.birthday.message}</div>}
          </div>
          <button className="primary-button" type="submit">
            set your birthday
          </button>
        </form>
      )}
    </div>
  );
}

export default MyBirthday;
