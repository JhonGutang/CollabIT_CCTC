import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  imageLink?: string
}

const AuthLayout = ({ children, imageLink }: PageProps) => {
  return (
    <div className="background h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full md:w-[70vw] h-auto md:h-[65vh] flex flex-col md:flex-row items-center justify-center shadow-xl overflow-hidden">
        <div className="w-full md:flex-[3] h-40 md:h-full flex items-center justify-center overflow-hidden transition-all duration-300">
          <img
            src={imageLink}
            alt="Auth Picture"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Form Container */}
        <main className="w-full md:flex-[2] flex flex-col justify-center items-center p-6 md:p-10 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
