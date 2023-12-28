import { MdMenu } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { useContext } from "react";
import GLOBAL from "../../configs/Global";
import AppContext from "../../components/AppContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";

export default function Selector({ size, setIsMenuOpen }) {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const {
    state: { curFloor },
    dispatch,
  } = useContext(AppContext);

  const switchFloor = (floor) => {
    dispatch({
      type: GLOBAL.ACTIONS.SWITCH_FLOOR,
      value: floor.currentKey,
    });

    setIsMenuOpen(false);
  };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          {size === "sm" ? (
            <Button
              fullWidth={true}
              variant="solid"
              startContent={<MdMenu className="h-full w-full" />}
            >
              Floor selector
            </Button>
          ) : (
            <Button
              endContent={<MdMenu className="h-full w-full" />}
              variant="light"
              size="sm"
            ></Button>
          )}
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        // className="w-[340px]"
        itemClasses={{
          base: "gap-4",
        }}
        selectionMode="single"
        selectedKeys={[curFloor]}
        onSelectionChange={switchFloor}
        aria-label="Dropdown menu for selecting a room"
      >
        <DropdownItem
          key={GLOBAL.CONST.HM3F}
          description="Lujiazui Century Financial Plaza, Shanghai, China"
          startContent={<FaRegBuilding className={iconClasses} />}
        >
          HM 3F
        </DropdownItem>
        <DropdownItem
          key={GLOBAL.CONST.HM17F}
          description="Lujiazui Century Financial Plaza, Shanghai, China"
          startContent={<FaRegBuilding className={iconClasses} />}
        >
          HM 17F
        </DropdownItem>
        <DropdownItem
          key={GLOBAL.CONST.ZJ6F}
          description="Zhang Jiang high tech Park, Shanghai, China"
          startContent={<FaRegBuilding className={iconClasses} />}
        >
          ZJ 6F
        </DropdownItem>
        <DropdownItem
          key={GLOBAL.CONST.TEST_SCENE}
          description="Only for test"
          startContent={<FaRegBuilding className={iconClasses} />}
        >
          Test scene
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
