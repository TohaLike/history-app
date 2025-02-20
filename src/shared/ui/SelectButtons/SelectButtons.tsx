// import React, { useContext } from "react";
// import style from "./selectbuttons.module.scss";
// import { AppContext } from "@/app/App";

// export const SelectButtons: React.FC = () => {
//   const { currentYear, setCurrentYear } = useContext(AppContext);

//     const toPaddedString = (value: number) => {
//       return String(value).padStart(2, "0");
//     };
  
//     function CurrentList() {
//       return `${toPaddedString(currentYear + 1)}/${toPaddedString(YEARS.length)}`;
//     }
    
//   return (
//     <div>
//       <div className={style.current__list}>
//         <span>
//           <CurrentList />
//         </span>
//       </div>

//       <div className={style.buttons__container}>
//         <SelectButton
//           icon={<LeftArrowIcon />}
//           onClick={handlePrev}
//           disabled={currentYear === 0}
//         />
//         <SelectButton
//           icon={<RightArrowIcon />}
//           onClick={handleNext}
//           disabled={currentYear === YEARS.length - 1}
//         />
//       </div>
//     </div>
//   );
// };
