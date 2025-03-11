const AboutUs = () => {
  return (
    <div className="w-full">
      {/* first part */}
      <div className="lg:h-[80vh] h-[100vh] bg-white w-full flex lg:flex-row flex-col justify-center lg:items-center">
        <div className="lg:h-100 flex flex-col lg:flex-row px-8 gap-10">
          <div className=" flex-2 flex flex-col gap-8 items-center lg:items-start justify-center">
            <div className="text-2xl font-bold ">Our Story & Mission</div>
            <div className="text-lg text-center lg:text-start">
              <div className="text-blue-500 inline">CollabIT CCTC</div> isn’t
              just a platform—it’s a vision brought to life by a group of
              passionate IT students from Consolatrix College of Toledo City who
              believe in the power of collaboration. We saw a gap in how IT
              students connect, learn, and grow together. That’s why we created
              this space—a unified learning hub where no one is left behind.
            </div>
          </div>
          <div className=" lg:flex-[20vw] flex items-center justify-center lg:p-15">
            <div>
              <img
                src="Community/community_3.jpg"
                alt=""
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* second part */}
      <div className="lg:h-[70vh] h-[100vh] background w-full lg:p-15 flex flex-col justify-center  ">
        <div className="h-100 flex flex-col-reverse lg:flex-row px-8 gap-8">
          <div className=" lg:flex-[20vw] flex items-center justify-center lg:p-15">
            <img
              src="Community/community_3.jpg"
              alt=""
              className="rounded-2xl"
            />
          </div>
          <div className=" flex-2 flex flex-col gap-5 justify-center items-center lg:items-start">
            <div className="text-2xl font-bold">Our Mission</div>
            <div className="flex flex-col gap-3 text-lg">
              <div className="text-center lg:text-start">
                📚 Encourage collaboration & learning beyond the four walls of
                the classroom.
              </div>
              <div className="text-center lg:text-start">
                🌎 Make an impact in our school & community by fostering
                innovation and teamwork.
              </div>
              <div className="text-center lg:text-start">
                🚀 Bridge all IT students together in one space where ideas are
                exchanged freely.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
