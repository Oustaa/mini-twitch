import { api } from "@/utils/ApiInstance";
import { Button, Input } from "@kousta-ui/components";
import { useDebounceCallback } from "@kousta-ui/hooks";
import { useCallback, useState, type FC } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router";

const Search: FC = () => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const response = await api.get(
      `/user/get-username-suggestions?query=${query}`,
    );

    const data = response.data;
    const body = data?.body;

    if (body.suggestions) {
      setSuggestions(body.suggestions);
    }
  }, []);

  const getSuggestionsDebounced = useDebounceCallback(getSuggestions, 200);

  return (
    <div className="flex-1 flex justify-center">
      <div className="w-full max-w-[500px] relative">
        <Input
          value={value}
          placeholder="search"
          onChange={(e) => {
            setValue(e.target.value);
            getSuggestionsDebounced(e.target.value);
          }}
          rightSection={
            <Button variant="neutral" size="sm">
              <BsSearch />
            </Button>
          }
        />
        {suggestions.length ? (
          <div className="absolute w-full bg-gray-100 top-full rounded-sm translate-y-[.25rem] divide-y divide-gray-200">
            {suggestions.map((item) => {
              return (
                <Link
                  className="block p-2"
                  to={item}
                  onClick={() => {
                    setSuggestions([]);
                    setValue("");
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
