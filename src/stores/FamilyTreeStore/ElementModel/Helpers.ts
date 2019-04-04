export default class ElementHelpers {
  static getTextWidth(text: string, font: string): number {
    // re-use canvas object for better performance
    // @ts-ignore
    const canvas = ElementHelpers.getTextWidth.canvas || (ElementHelpers.getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);

    return metrics.width;
  }
}