import { useCart } from "@/State/store";
import { Member } from "@prisma/client";
import { Phone, X } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useSelectMemberStore } from "@/store/useSelectMemberStore";
import { Button } from "../ui/button";

type Props = {
  member: Member;
  viewOnly?: boolean;
};

const SelectMemberCard = ({ member, viewOnly = false }: Props) => {
  const setMember = useCart((state) => state.setMember);
  const clearMember = useCart((state) => state.clearMember);
  const setDialogOpen = useSelectMemberStore((state) => state.setDialogOpen);
  const setSearchTerm = useSelectMemberStore((state) => state.setSearchTerm);

  return (
    <Card
      className="bg-white w-full cursor-pointer hover:bg-accent"
      onClick={() => {
        if (!viewOnly) {
          setMember(member);
          setDialogOpen(false);
          setSearchTerm("");
        }
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {member.address} <span>({member.name})</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Phone className="w-3 h-3" /> {member.phoneNumber}
        </CardDescription>
        {viewOnly && (
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
