import { useCart } from "@/State/store";
import { Member } from "@prisma/client";
import { Phone } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useSelectMemberStore } from "@/store/useSelectMemberStore";

type Props = {
  member: Member;
};

const SelectMemberCard = ({ member }: Props) => {
  const setMember = useCart((state) => state.setMember);
  const setDialogOpen = useSelectMemberStore((state) => state.setDialogOpen);

  return (
    <Card
      className="bg-white w-full cursor-pointer hover:bg-accent"
      onClick={() => {
        setMember(member.id);
        setDialogOpen(false);
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {member.address} <span>({member.name})</span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Phone className="w-3 h-3" /> {member.phoneNumber}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SelectMemberCard;
