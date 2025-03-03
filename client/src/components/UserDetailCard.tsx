import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  User,
  UserCircle2,
  AtSign,
  Phone,
  Calendar,
  Briefcase,
} from "lucide-react";
import { JSX } from "react";

interface UserDetailCardProps {
  profile: {
    username: string;
    full_name: string;
    email: string;
    phone: string;
    date_of_birth?: string;
  };
  role: "Parent" | "Tutor";
}

const UserDetailCard = ({ profile, role }: UserDetailCardProps) => {
  return (
    <Card className="bg-[#352F44] border-none shadow-lg">
      <CardHeader>
        <span className="text-xl font-bold text-primary-400">More Details</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <DetailItem
          icon={<User size={28} />}
          label="Username"
          value={profile.username}
        />
        <DetailItem
          icon={<UserCircle2 size={28} />}
          label="Full Name"
          value={profile.full_name}
        />
        <DetailItem
          icon={<AtSign size={28} />}
          label="Email"
          value={profile.email}
        />
        <DetailItem
          icon={<Phone size={28} />}
          label="Phone Number"
          value={profile.phone}
        />
        <DetailItem
          icon={<Calendar size={28} />}
          label="Date of Birth"
          value={profile.date_of_birth || "#N/A"}
        />
        <DetailItem icon={<Briefcase size={28} />} label="Role" value={role} />
      </CardContent>
    </Card>
  );
};

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) => (
  <section className="flex items-center gap-4">
    {icon}
    <div className="flex flex-col items-start gap-2">
      <strong className="text-lg">{label}:</strong>
      <span className="text-primary-750 text-md">{value}</span>
    </div>
  </section>
);

export default UserDetailCard;
