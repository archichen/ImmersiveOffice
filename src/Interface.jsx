import { MdMenu, MdMenuOpen } from "react-icons/md";
import { FaStreetView } from "react-icons/fa6";
import { MdOutlineSearch } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { GrThreeD } from "react-icons/gr";
import { useContext, useState } from "react";
import GLOBAL from "./configs/Global";
import AppContext from "./components/AppContext";

export default function Interface() {
  const [searchStr, setSearchStr] = useState("");
  const [isMenuClick, setIsMenuClick] = useState(false);
  const {
    state: { mode },
    dispatch,
  } = useContext(AppContext);

  const handleMenuClick = () => {
    if (isMenuClick) {
      setIsMenuClick(false);
    } else {
      setIsMenuClick(true);
    }
  };

  const switchFloor = (floor) => {
    dispatch({
      type: GLOBAL.ACTIONS.SWITCH_FLOOR,
      value: floor,
    });
  };

  const switchMode = () => {
    if (mode === GLOBAL.CONST.MODE_FLY) {
      dispatch({
        type: GLOBAL.ACTIONS.SWITCH_MODE,
        value: GLOBAL.CONST.MODE_FIRST_PERSON,
      });
    } else {
      dispatch({
        type: GLOBAL.ACTIONS.SWITCH_MODE,
        value: GLOBAL.CONST.MODE_FLY,
      });
    }
  };

  return (
    <>
      <div
        role="menu"
        className="
        absolute top-8 z-10
        inline-flex h-12
        w-12 items-center
        justify-center
     "
        style={{ left: "10%" }}
      >
        <div className="h-full w-full">
          <details>
            <summary
              className="
              marker:content-none
              hover:cursor-pointer
              "
              onClick={handleMenuClick}
            >
              {isMenuClick ? (
                <MdMenuOpen className="h-full w-full" color="white" />
              ) : (
                <MdMenu className="h-full w-full" color="white" />
              )}
            </summary>
            <div
              className="
                flex h-fit
                w-48
                flex-col
                items-start justify-start
                rounded-xl bg-white px-2 py-2
              "
            >
              <span className="text-xs font-light text-slate-600">Floors</span>
              <ul className="h-full w-full before:contents">
                <li
                  className="
                  mx-1 my-1
                  flex cursor-pointer items-center px-3 py-1 text-start text-sm
                  hover:rounded-md hover:bg-slate-100
                  "
                  onClick={() => switchFloor(GLOBAL.CONST.HM3F)}
                >
                  <FaRegBuilding className="mr-2 inline" />
                  HM 3F
                  <CiLocationArrow1 className="ml-auto mr-2 inline text-xl" />
                </li>
                <li
                  className="
                  mx-1 my-1
                  flex cursor-pointer items-center px-3 py-1 text-start text-sm
                  hover:rounded-md hover:bg-slate-100
                  "
                  onClick={() => switchFloor(GLOBAL.CONST.HM17F)}
                >
                  <FaRegBuilding className="mr-2 inline" />
                  HM 17F
                  <CiLocationArrow1 className="ml-auto mr-2 inline text-xl" />
                </li>
                <li
                  className="
                  mx-1 my-1
                  flex cursor-pointer items-center px-3 py-1 text-start text-sm
                  hover:rounded-md hover:bg-slate-100
                  "
                  onClick={() => switchFloor(GLOBAL.CONST.ZJ6F)}
                >
                  <FaRegBuilding className="mr-2 inline" />
                  ZJ 6F
                  <CiLocationArrow1 className="ml-auto mr-2 inline text-xl" />
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>

      <div
        role="search_box"
        className="
        absolute top-8 z-10
        inline-flex h-12
        w-1/3 items-center
        justify-start rounded-3xl
        bg-white
        "
        style={{ left: "calc(50% - 16.5%)" }}
      >
        <input
          type="text"
          value={searchStr}
          onChange={(event) => setSearchStr(event.target.value)}
          className="
            ml-5
            h-5/6
            text-left
            "
          placeholder="Search..."
          style={{ width: "80%" }}
        />
        <MdOutlineSearch
          className="
            ml-1.5 h-7
            w-7
            hover:cursor-pointer
            "
          color=""
        />
      </div>

      <div
        role="mode"
        className="
        absolute top-8 z-10
        inline-flex h-12
        w-12 cursor-pointer
        items-center
        justify-center
        "
        style={{ left: "85%" }}
        onClick={switchMode}
      >
        {mode === GLOBAL.CONST.MODE_FLY ? (
          <GrThreeD className="h-full w-full" color="white" />
        ) : (
          <FaStreetView className="h-full w-full" color="white" />
        )}
      </div>
    </>
  );
}
