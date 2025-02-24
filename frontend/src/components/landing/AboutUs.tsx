const AboutUs = () => {
  return (
    <div>
        {/* first part */}
      <div className="h-[70vh] bg-white w-full p-15 flex flex-col justify-center">
        <div className="h-100 flex">
          <div className=" flex-2 flex flex-col gap-8 justify-center">
            <div className="text-2xl font-bold ">Our Story & Mission</div>
            <div className="text-lg">
              <div className="text-blue-500 inline">CollabIT CCTC</div> isn’t
              just a platform—it’s a vision brought to life by a group of
              passionate IT students from Consolatrix College of Toledo City who
              believe in the power of collaboration. We saw a gap in how IT
              students connect, learn, and grow together. That’s why we created
              this space—a unified learning hub where no one is left behind.
            </div>
          </div>
          <div className=" flex-[20vw] flex items-center justify-center p-15">
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
      <div className="h-[70vh] background w-full p-15 flex flex-col justify-center  ">
        <div className="h-100 flex">
          <div className=" flex-[20vw] flex items-center justify-center p-15">
            <div>
              <img
                src="Community/community_3.jpg"
                alt=""
                className="rounded-2xl"
              />
            </div>
          </div>
          <div className=" flex-2 flex flex-col gap-5 justify-center">
            <div className="text-2xl font-bold">Our Mission</div>
            <div className="flex flex-col gap-3">
              <div>
                📚 Encourage collaboration & learning beyond the four walls of
                the classroom.
              </div>
              <div>
                🌎 Make an impact in our school & community by fostering
                innovation and teamwork.
              </div>
              <div>
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
