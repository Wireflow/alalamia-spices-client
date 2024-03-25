import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetMembers } from "@/hooks/useGetMembers";

export const SelectMemberComboBox = () => {
  const { data } = useGetMembers();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  // console.log(data);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data?.find((member) => member.name === value)?.name
            : "Select Member..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search members..." className="h-9" />
          {
         
          data!=undefined ? (
            <CommandGroup>
              {data.map((member) => (
                <CommandItem
                  key={member.id}
                  value={member.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {member.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === member.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>Loading members...</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
  
};

export default SelectMemberComboBox;