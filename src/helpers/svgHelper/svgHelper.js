import { SVG_CODE_TO_BE_INSERTED } from "../../constants/constants";

export const declareColourClass = (svgData) => {
  if (svgData.toString().search(SVG_CODE_TO_BE_INSERTED) < 0) {
    const positionToInsert = svgData.toString().indexOf(">") + 1;
    return [
      svgData.toString().slice(0, positionToInsert),
      SVG_CODE_TO_BE_INSERTED,
      svgData.toString().slice(positionToInsert, svgData.toString().length)
    ].join();
  } else {
    return svgData;
  }
};

export const isUndefinedOrNull=(data)=>{
  return data === undefined || data === null;
}
