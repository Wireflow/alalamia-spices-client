import { FormMode } from "@/types/form";
import { Button } from "../ui/button";

type FormButtonProps = {
  mode: FormMode;
  isPending: boolean;
  setOpen: (isOpen: boolean) => void;
};

const FormButton = ({ mode, isPending, setOpen }: FormButtonProps) => {
  if (mode === "add") {
    return (
      <Button type="submit" className="w-full mt-4" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </Button>
    );
  }

  if (mode === "edit") {
    return (
      <Button type="submit" className="w-full mt-4" disabled={isPending}>
        {isPending ? "Saving changes..." : "Save"}
      </Button>
    );
  }

  if (mode === "view") {
    return (
      <Button className="w-full mt-4" onClick={() => setOpen(false)}>
        Close
      </Button>
    );
  }

  return null;
};

export default FormButton;
