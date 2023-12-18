import ProgressBar from "@ramonak/react-progress-bar"
import { useProgress } from "@react-three/drei"

export default function Loader() {
  const { progress, errors, item } = useProgress()

  return <div className="w-full h-full flex flex-col items-center justify-center">
    <ProgressBar className="w-1/2" completed={progress.toFixed(2)} maxCompleted={100}
      baseBgColor="white"
      bgColor="#ea4c88"
    />
    <div 
      className="
      w-1/2 h-fit max-h-40
      bg-black
      rounded
      mt-2
      overflow-y-auto
      text-left
      "
    >
      {
        errors.map(error => {
          return <span className="block text-red-500" key={item}>Load failed: {error}</span>
        })
      }
    </div>
    <div className="
    flex items-center justify-center
    text-white
    font-medium text-5xl
    mt-10
    "
    >Loading...</div>
  </div>;
}
