import UserIcon from "../assets/icons/user-icon.svg";

export const UserLogo = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="w-12 h-12 cursor-pointer bg-gradient-to-br from-gray-500 to-gray-200 rounded-full flex items-center justify-center shrink-0 shadow-[var(--shadow-sm)]">
        <i className="text-white w-6 h-6 flex justify-center items-center">
          <UserIcon />
        </i>
      </button>
      <div className="flex flex-col">
        <h6 className="text-black">Андрей</h6>
        <p className="text-grey-600 text-body-2">Салон</p>
      </div>
    </div>
  );
};
