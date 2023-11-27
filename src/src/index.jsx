import { Link, useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate("/hm3f");
        }}
      >
        花木3楼
      </button>
      <button
        onClick={() => {
          navigate("/hm17f");
        }}
      >
        花木17楼
      </button>
      <button
        onClick={() => {
          navigate("/zj6f");
        }}
      >
        张江6楼
      </button>
      <button
        onClick={() => {
          navigate("/hm3f_R");
        }}
      >
        射线
      </button>
    </>
  );
}

export default Index;
