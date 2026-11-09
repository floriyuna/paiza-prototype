import React from "react";
import { createRoot } from "react-dom/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/app/page";
import Survey from "@/app/survey/page";
import Learn from "@/app/learn/page";
import Signup from "@/app/signup/page";
import Courses from "@/app/courses/page";
import CourseDetail from "@/app/courses/[slug]/page";
import { useUrl } from "./stubs/router";
import { getCourse } from "@/lib/courses";

function CD({ slug }: { slug: string }) {
  const c = getCourse(slug);
  if (!c) return <p>404</p>;
  const [el, setEl] = React.useState<any>(null);
  React.useEffect(() => {
    (CourseDetail as any)({ params: Promise.resolve({ slug }) }).then(setEl);
  }, [slug]);
  return el;
}

function App() {
  const path = useUrl().split("?")[0];
  let page: any = <p>404</p>;
  if (path === "/") page = <Home />;
  else if (path === "/survey") page = <Survey />;
  else if (path === "/learn") page = <Learn />;
  else if (path === "/signup") page = <Signup />;
  else if (path === "/courses") page = <Courses />;
  else if (path.startsWith("/courses/")) page = <CD slug={path.split("/")[2]} />;

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa] font-sans text-[#333333]">
      <Header />
      <main id="main" className="flex-1">
        {page}
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
