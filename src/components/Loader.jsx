import ProgressBar from "@ramonak/react-progress-bar";
import { useProgress } from "@react-three/drei";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

function Test({ progress }) {
  return (
    <span className="flex items-center justify-center text-white">
      {parseInt(progress)}
      <span className="
        ml-3 inline-block h-7  w-1 rounded-sm bg-white
        before:inline-block before:w-2 before:h-2 before:bg-red-500 before:rounded-full before:absolute before:-right-3 before:bottom-1 before:z-10
        after:inline-block after:w-2 after:h-2 after:bg-red-500 after:rounded-full after:absolute after:-left-3 after:top-1 after:z-10
        " 
        style={{rotate: '25deg'}}
      />
    </span>
  );
}

export default function Loader(props) {
  const { progress, errors, item } = useProgress();

  return (
    <div className="flex h-screen h-screen flex-col items-center justify-center rounded-none border-none bg-gradient-to-b from-sky-700 from-70% to-sky-900">
      <CircularProgress
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "stroke-white",
          track: "stroke-white/10",
          value: "text-3xl font-semibold text-white",
        }}
        value={progress}
        strokeWidth={4}
        showValueLabel={true}
        valueLabel={<Test progress={progress} />}
        aria-label="Loading message"
      />
      <Chip
        classNames={{
          base: "border-1 border-white/30 mt-5",
          content: "text-white/90 text-small font-semibold",
        }}
        variant="bordered"
        aria-label="Loading message"
      >
        Loading...
      </Chip>{" "}
    </div>
  );
}
