import { useCart } from "@/State/store";
import { Member } from "@prisma/client";
import { Phone, X } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useSelectMemberStore } from "@/store/useSelectMemberStore";
import { Button } from "../ui/button";

type Props = {
  member: Member;
  mode?: "view" | "add";
};

const SelectMemberCard = ({ member, mode = "add" }: Props) => {
  const setMember = useCart((state) => state.setMember);
  const clearMember = useCart((state) => state.clearMember);
  const setDialogOpen = useSelectMemberStore((state) => state.setDialogOpen);
  const setSearchTerm = useSelectMemberStore((state) => state.setSearchTerm);

  return (
    <Card
      className="bg-white w-full cursor-pointer hover:bg-accent"
      onClick={() => {
        if (mode === "add") {
          setMember(member);
          setDialogOpen(false);
          setSearchTerm("");
        }
      }}
    >
      <CardHeader className="flex flex-row  items-center justify-between">
        <div className="flex flex-col gap-2 justify-end">
          <CardTitle>
            {member.address} <span>({member.name})</span>
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Phone className="w-3 h-3" /> {member.phoneNumber}
          </CardDescription>
        </div>
        {mode === "view" && (
          <Button
            variant={"destructive"}
            size={"icon"}
            onClick={() => clearMember()}
          >
            <X />
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};

export default SelectMemberCard;
