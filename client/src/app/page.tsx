import Image from "next/image";
import NonDashboardNavbar from "./components/NonDashboardNavbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import CourseDetail from "./components/CourseDetail";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NonDashboardNavbar />
      <main className="flex flex-grow justify-center items-center w-full h-full">
        <CourseDetail />
      </main>

      <Footer />
    </div>
  );
}
