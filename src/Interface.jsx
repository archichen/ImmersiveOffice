import { FaStreetView } from "react-icons/fa6";
import { GrThreeD } from "react-icons/gr";
import { useContext, useState } from "react";
import GLOBAL from "./configs/Global";
import AppContext from "./components/AppContext";
import {
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Selector from "./components/interface/Selector";
import SearchInput from "./components/interface/SearchInput";

export default function Interface() {
  const {
    state: { mode },
    dispatch,
  } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const switchMode = (event) => {
    event.preventDefault();

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
    <Navbar
      className=" bg-transparent"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      // isBlurred={false}
    >
      <NavbarContent className="md:hidden">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* Adapt to mobile phone */}
      <NavbarMenu>
        <NavbarMenuItem>
          <Selector size="sm" setIsMenuOpen={setIsMenuOpen} />
        </NavbarMenuItem>
        <NavbarItem>
          <SearchInput size="sm" />
        </NavbarItem>
      </NavbarMenu>

      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <Selector />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <SearchInput />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            isIconOnly
            size="sm"
            className="p-1"
            variant="light"
            onClick={switchMode}
          >
            {mode === GLOBAL.CONST.MODE_FLY ? (
              <FaStreetView className="h-full w-full" />
            ) : (
              <GrThreeD className="h-full w-full" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
