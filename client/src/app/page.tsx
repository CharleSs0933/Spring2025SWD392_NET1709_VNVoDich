import Image from "next/image";
import NonDashboardNavbar from "./components/NonDashboardNavbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NonDashboardNavbar />
      <main className="flex flex-grow justify-center items-center w-full h-full">
        <Landing />
      </main>

      <Footer />
    </div>
  );
}
