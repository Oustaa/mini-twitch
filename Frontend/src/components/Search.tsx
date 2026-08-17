import { Button, Input } from "@kousta-ui/components";
import type { FC } from "react";
import { BsSearch } from "react-icons/bs";

const Search: FC = () => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[500px]">
        <Input
          placeholder="search"
          rightSection={
            <Button variant="neutral" size="sm">
              <BsSearch />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Search;
