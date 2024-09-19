type InputProps = {
  title: string;
  id: string;
  placeholder: string;
  register: any;
  errors?: any;
  type?: string;
};

export default function Input({
  title,
  id,
  placeholder,
  register,
  errors,
  type,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label
          className="cursor-pointer font-semibold text-DarkGrey"
          htmlFor={id}
        >
          {title}
        </label>
        {errors?.[id]?.message && (
          <p className="text-sm text-Red">{errors[id].message}</p>
        )}
      </div>
      <input
        className={`rounded-md bg-LightGrey px-4 py-3 text-sm font-medium text-MediumGrey placeholder:text-sm placeholder:font-light placeholder:capitalize placeholder:text-Grey focus:border-none focus:outline-none`}
        type={type || id}
        id={id}
        placeholder={placeholder}
        {...register}
        {...(id === "password" && { autoComplete: "new-password" })}
        {...(id === "email" && { autoComplete: "username" })}
      />
    </div>
  );
}
