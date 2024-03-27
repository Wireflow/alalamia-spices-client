//@ts-nocheck
import { IReactToPrintProps } from "react-to-print";

const handlePrint = function (target) {
  return new Promise(() => {
    console.log("forwarding print request to the main process...");

    const data = target.contentWindow.document.documentElement.outerHTML;
    //console.log(data);
    const blob = new Blob([data], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.electronAPI.printComponent(url, (response: Electron.Response) => {
      console.log("Main: ", response);
    });
    //console.log('Main: ', data);
  });
};

const handlePreview = function (target) {
  return new Promise(() => {
    console.log("forwarding print preview request...");

    const data = target.contentWindow.document.documentElement.outerHTML;
    //console.log(data);
    const blob = new Blob([data], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    window.electronAPI.previewComponent(url, (response) => {
      console.log("Main: ", response);
    });
    //console.log('Main: ', data);
  });
};

export { handlePreview, handlePrint };
