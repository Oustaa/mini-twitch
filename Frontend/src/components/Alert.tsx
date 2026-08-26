import type { FC } from "react";
import { FaMinusCircle } from "react-icons/fa";

type AlertType = "Error" | "Warning";

type AlertProps = {
  title: string;
  description?: string;
  type?: AlertType;
};

const TypeToStyle: Record<AlertType, { border: string; text: string }> = {
  Error: { border: "border-red-600", text: "text-red-600" },
  Warning: { border: "border-yellow-600", text: "text-yellow-600" },
};

const Alert: FC<AlertProps> = ({ title, description, type = "Error" }) => {
  const style = TypeToStyle[type];
  return (
    <div
      className={`flex gap-2 p-2 bg-gray-200 rounded-sm border-b-4 mb-4 ${style.border}`}
    >
      <FaMinusCircle className={style.text} size={18} />
      <div>
        <h4 className="text-sm">{title}</h4>
        {description && <p className="text-xs text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

export default Alert;
