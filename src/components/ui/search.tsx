import React from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  className?: string;
  disabled?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  isLoading = false,
  isFetching = false,
  className = "",
  disabled = false,
}) => {
  const showLoader = isFetching && !isLoading;

  return (
    <div className={`flex-1 relative ${className}`}>
      {showLoader ? (
        <Loader2 className="absolute left-3 top-1/3 h-4 w-4 text-muted-foreground animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        disabled={disabled}
      />
    </div>
  );
};

export default SearchInput;
