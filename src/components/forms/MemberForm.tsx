import { MemberSchema, MemberType } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import submitNewMember from "../../use-cases/submitNewMember";
import updateMember from "@/use-cases/updateMember";
import { Member } from "@prisma/client";
import { FormMode } from "@/types/form";

type MemberFormProps = {
  setOpen: (isOpen: boolean) => void;
  mode: FormMode;
  member?: Member;
};

const MemberForm = ({ setOpen, mode, member }: MemberFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: mode === "edit" ? updateMember : submitNewMember,
    onSuccess: () => {
      setOpen(false);
      return queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  const form = useForm<MemberType>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      name: member?.name ? member.name : undefined,
      address: member?.address ? member.address : undefined,
      city: member?.city ? member.city : undefined,
      state: member?.state ? member.state : undefined,
      zipCode: member?.zipCode ? member.zipCode : undefined,
      phoneNumber: member?.phoneNumber ? member.phoneNumber : undefined,
      owedBalance: member?.owedBalance ? member.owedBalance : undefined,
      id: member?.id ? member.id : undefined,
    },
  });

  const onSubmit = async (data: MemberType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" mode={mode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} type="text" mode={mode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 w-full gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" mode={mode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" mode={mode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(e.target.value.slice(0, 5))
                      }
                      mode={mode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{
                maxLength: 10,
              }}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(e.target.value.slice(0, 10))
                      }
                      mode={mode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="owedBalance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Balance Owed (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    mode={mode}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {renderModeButton(mode, isPending, setOpen)}
        </div>
      </form>
    </Form>
  );
};

export default MemberForm;

const renderModeButton = (
  mode: FormMode,
  isPending: boolean,
  setOpen: (isOpen: boolean) => void
) => {
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
