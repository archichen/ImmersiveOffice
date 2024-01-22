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
  Card,
  CardFooter,
  Image,
  CardHeader,
  CardBody,
  Modal, ModalContent, ModalHeader, ModalBody,useDisclosure, ModalFooter
} from "@nextui-org/react";
import Selector from "./components/interface/Selector";
import SearchInput from "./components/interface/SearchInput";
import { useModeSwitchStore, useSelectedSeatStore } from "./store/runtimeStore";
import seatImg from "./assets/seat.jpg";

export default function Interface() {
  const {
    state: { mode },
    dispatch,
  } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setFlyMode = useModeSwitchStore((state) => state.setFlyMode);
  const setFirstPersonMode = useModeSwitchStore(
    (state) => state.setFirstPersonMode,
  );
  const selectedSeat = useSelectedSeatStore((state) => state.selectedSeat);

  const {isOpen, onOpen, onClose} = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }

  const switchMode = (event) => {
    event.preventDefault();

    if (mode === GLOBAL.CONST.MODE_FLY) {
      dispatch({
        type: GLOBAL.ACTIONS.SWITCH_MODE,
        value: GLOBAL.CONST.MODE_FIRST_PERSON,
      });

      setFirstPersonMode();
    } else {
      dispatch({
        type: GLOBAL.ACTIONS.SWITCH_MODE,
        value: GLOBAL.CONST.MODE_FLY,
      });

      setFlyMode();
    }
  };
  return (
    <>
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
      {/* Absolute elements */}
      {selectedSeat !== "" && (
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
          style={{
            position: "absolute",
            top: "100px",
            right: "40px",
            backgroundColor: "black",
          }}
        >
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={200}
            src={seatImg}
            width={200}
          />
          <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">{selectedSeat}</p>
            <Button
              className="bg-black/20 text-tiny text-white"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
              onClick={handleOpen}
            >
              Details
            </Button>
          </CardFooter>
          <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

        </Card>
      )}
    </>
  );
}
