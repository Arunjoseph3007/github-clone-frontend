// @ Components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// & UI
export default function MainLayout(page) {
  return (
    <div>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
}
