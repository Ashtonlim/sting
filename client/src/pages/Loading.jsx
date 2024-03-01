import Spinner from "/src/components/Spinner";
import LayoutOne from "/src/components/LayoutOne";

const Loading = () => {
  //   console.log("I am spinning @", window.location.href);
  return (
    <LayoutOne>
      <Spinner />
    </LayoutOne>
  );
};

export default Loading;
