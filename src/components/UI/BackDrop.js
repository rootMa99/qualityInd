import c from "./BackDrop.module.css";

const BackDrop = (p) => {
  const onClickHandler = (e) => {
    p.click();
  };

  return (
    <div
      className={c.backdrop}
      onClick={onClickHandler}
      style={p.zindex !== undefined ? { zIndex: p.zindex } : {}}
    ></div>
  );
};
export default BackDrop;
