import type { FC } from "react";

const PageNoteFound: FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex justify-center items-center w-full h-full flex-1">
      <p>
        {message
          ? message
          : "Sorry. Unless you've got a time machine, that content is unavailable."}
      </p>
    </div>
  );
};

export default PageNoteFound;
