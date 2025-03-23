"use client";

import {
  useConnectToStripeMutation,
  useGetTutorQuery,
  useLazyCheckTutorConnectionQuery,
  useUpdateTutorMutation,
} from "@/state/api";
import Cookies from "js-cookie";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useForm } from "react-hook-form";
import { TutorFormData, tutorSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/CustomFormField";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Hint from "@/components/Hint";
import { Trash } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";
import { createTutorFormData } from "@/lib/utils";
import { toast } from "sonner";

const Profile = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  const userId = user?.ID;
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [demoVideoUrl, setDemoVideoUrl] = useState<string | null>(null);
  const [updateTutor] = useUpdateTutorMutation();
  const [checkTutorConnection] = useLazyCheckTutorConnectionQuery();
  const [connectToStripeAPI] = useConnectToStripeMutation();

  const {
    data: tutor,
    isLoading,
    isError,
    refetch,
  } = useGetTutorQuery(userId as string);

  const methods = useForm<TutorFormData>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      userName: "",
      fullName: "",
      email: "",
      phone: "",
      bio: "",
      qualifications: "",
      teaching_style: "",
      demo_video_url: "",
    },
  });

  useEffect(() => {
    if (tutor) {
      methods.reset({
        userName: tutor?.profile?.username,
        fullName: tutor?.profile?.full_name,
        email: tutor?.profile?.email,
        phone: tutor?.profile?.phone,
        bio: tutor?.bio,
        qualifications: tutor?.qualifications,
        teaching_style: tutor?.teaching_style,
        demo_video_url: tutor?.demo_video_url,
      });
      setDemoVideoUrl(tutor?.demo_video_url || null);
    }
  }, [tutor, methods]);

  const onSubmit = async (data: TutorFormData) => {
    try {
      const formData = createTutorFormData({
        ...data,
        demo_video_url: demoVideoUrl || "",
      });
      await updateTutor({
        tutorId: userId,
        formData,
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update profile: ", error);
    }
  };

  const handleRemoveDemoVideo = () => {
    setDemoVideoUrl(null);
  };

  const checkStripeConnection = async () => {
    setIsCheckingConnection(true);
    try {
      const data = await checkTutorConnection({ userId }).unwrap();

      if (data.isConnected) {
        toast.success(data.description);
      } else {
        toast.error(data.description);
      }
    } catch (error) {
      toast.error("Failed to check Stripe connection");
    } finally {
      setIsCheckingConnection(false);
    }
  };

  const connectToStripe = async () => {
    setIsConnecting(true);
    try {
      const data = await connectToStripeAPI({}).unwrap();

      if (data.onboardingUrl) {
        window.location.href = data.onboardingUrl;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (isLoading) return <Loading />;
  if (isError || !tutor) return <div>Error fetching tutor details.</div>;

  return (
    <div className="w-full h-full">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title="Profile"
            subtitle="View and edit your profile"
            rightElement={
              <div className="flex gap-2">
                {tutor.stripe_account_id ? (
                  <Button
                    type="button"
                    onClick={checkStripeConnection}
                    disabled={isCheckingConnection}
                    className="bg-primary-700 hover:bg-primary-600"
                  >
                    {isCheckingConnection
                      ? "Checking..."
                      : "Check Stripe Connection"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={connectToStripe}
                    disabled={isConnecting}
                    className="bg-primary-700 hover:bg-primary-600"
                  >
                    {isConnecting ? "Connecting..." : "Connect To Stripe"}
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-600"
                >
                  Save Profile
                </Button>
              </div>
            }
          />
          <div className="flex justify-between md:flex-row flex-col gap-10 mt-5 font-ds-sans">
            <div className="basis-1/2">
              <div className="space-y-4">
                <CustomFormField
                  name="userName"
                  label="User Name"
                  type="text"
                  className="border-none"
                  disabled
                />
                <CustomFormField
                  name="email"
                  label="Email"
                  type="text"
                  disabled
                  className="border-none"
                />
                <CustomFormField
                  name="fullName"
                  label="Full Name"
                  type="text"
                  placeholder="Write full name here"
                  className="border-none"
                />
                <CustomFormField
                  name="phone"
                  label="Phone"
                  type="text"
                  placeholder="Write phone number here"
                  className="border-none"
                />
                <CustomFormField
                  name="bio"
                  label="Bio"
                  type="textarea"
                  placeholder="Write your bio here"
                  className="border-none"
                />
                <CustomFormField
                  name="qualifications"
                  label="Qualifications"
                  type="text"
                  placeholder="List your qualifications"
                  className="border-none"
                />
                <CustomFormField
                  name="teaching_style"
                  label="Teaching Style"
                  type="text"
                  placeholder="Describe your teaching style"
                  className="border-none"
                />
              </div>
            </div>
            <div className="basis-1/2">
              <div className="space-y-4">
                {demoVideoUrl ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white-100/10">
                    <div className="absolute top-2 right-2 ring-2 z-[10]">
                      <Hint label="Remove video" asChild side="left">
                        <Button
                          type="button"
                          className="h-auto w-auto p-1.5 bg-red-500 hover:bg-red-600"
                          onClick={handleRemoveDemoVideo}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </Hint>
                    </div>
                    <video
                      src={demoVideoUrl}
                      controls
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="tutorDemoVideoUploader"
                    appearance={{
                      label: { color: "#FFFFFF" },
                      allowedContent: { color: "#FFFFFF" },
                      button: { color: "#7878fc" },
                    }}
                    onClientUploadComplete={(res) => {
                      if (res?.[0]?.url) {
                        setDemoVideoUrl(res[0].url);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
