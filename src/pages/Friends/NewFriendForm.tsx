import { SubmitHandler, useForm } from 'react-hook-form';
import { Friend } from '../../interfaces/userdata';
import { useState } from 'react';

type Inputs = {
  name: string;
  birthday: string;
  [key: string]: string;
};

interface Item {
  id: number;
}

function NewFriendForm({ setData, closeForm }: { setData: (friend: Friend) => void; closeForm: (close: boolean) => void }) {
  const [items, setItems] = useState<Item[]>([]);
  const [counter, setCounter] = useState<number>(1);

  const handleAddItem = () => {
    const newItem: Item = { id: counter };
    setItems([...items, newItem]);
    setCounter(counter + 1);
  };

  const handleRemoveItem = (idToRemove: number) => {
    const updatedItems: Item[] = items.filter((item) => item.id !== idToRemove);
    setItems(updatedItems);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const friend: Friend = {
      name: data.name,
      date: data.birthday,
      gifts: Object.keys(data)
        .filter((key) => key.startsWith('gift') && data[key])
        .map((key) => data[key]),
    };

    setData(friend);
  };

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-xl">Friend info</h2>
        <div>
          <label className="opacity-80 text-sm" htmlFor="name">
            Name
          </label>
          <input
            {...register('name', { required: 'The name is required' })}
            id="name"
            className="w-full block rounded-xl outline-none bg-slate-100 px-3 py-2"
            type="text"
          />
          {errors.name && <div className="error text-xs font-normal text-red-400">{errors.name.message}</div>}
        </div>
        <div className="">
          <label className="opacity-80 text-sm" htmlFor="birthday">
            Date of birth
          </label>
          <input
            {...register('birthday', {
              required: 'The birthday is required',
              max: { value: new Date().toISOString().split('T')[0], message: "Looks like your friend wasn't born yet." },
            })}
            id="birthday"
            className="w-full block rounded-xl outline-none bg-slate-100 px-3 py-2"
            type="date"
          />
          {errors.birthday && <div className="error text-xs font-normal text-red-400">{errors.birthday.message}</div>}
        </div>
      </div>
      <div className="">
        <div className="flex gap-4 items-center mb-2">
          <h2 className="font-bold text-xl">Gift ideas</h2>
          <div onClick={handleAddItem} className="w-6 h-6 text-center cursor-pointer rounded-full bg-pink-100">
            +
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <input
                {...register(`gift${item.id}`)}
                className="w-full block rounded-xl outline-none bg-slate-100 px-3 py-2"
                type="text"
              />
              <div
                onClick={() => handleRemoveItem(item.id)}
                className="w-6 h-6 text-center cursor-pointer rounded-full bg-indigo-100"
              >
                -
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <button
          onClick={() => closeForm(false)}
          className="inline-flex w-full items-center justify-center px-4 py-2 text-base leading-5 rounded-full border font-medium transition ease-in-out duration-150 focus:outline-none bg-transparent border-blue-100 hover:bg-blue-200 hover:border-blue-200"
          type="button"
        >
          close
        </button>
        <button
          className="inline-flex w-full items-center justify-center px-4 py-2 text-base leading-5 rounded-full border font-medium transition ease-in-out duration-150 focus:outline-none bg-blue-100 border-blue-100 hover:bg-blue-200 hover:border-blue-200"
          type="submit"
        >
          add friend
        </button>
      </div>
    </form>
  );
}

export default NewFriendForm;
