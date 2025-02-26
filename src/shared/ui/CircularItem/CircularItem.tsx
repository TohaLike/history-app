import style from "./circularitem.module.scss";

export const CircularItem: React.FC<any> = ({
  itemIndex,
  title,
  circleRef,
  textRef,
}: any) => {
  return (
    <div
      className={style.item__content}
      ref={(el: any) => (circleRef.current[itemIndex] = el)}
    >
      <span>{itemIndex + 1}</span>
      <h2 ref={(el: any) => (textRef.current[itemIndex] = el)}>{title}</h2>
    </div>
  );
};
