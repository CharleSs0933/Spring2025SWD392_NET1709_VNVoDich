import { HeaderProps } from "@/types";

const Header = ({ subtitle, title, rightElement }: HeaderProps) => {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-white-50">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

export default Header;
