import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import Sidebar from "../../components/sidebar/Sidebar";

const { IoIosArrowForward } = icons;

function Home() {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      <div className="w-main m-auto flex mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          {/* <DealDaily /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
