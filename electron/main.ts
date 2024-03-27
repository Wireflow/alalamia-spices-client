//@ts-nocheck

import { app, BrowserWindow, ipcMain } from "electron";

import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");

process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function handleIpcTest(event: Electron.IpcMainEvent, test: string) {
  const webContents = event.sender;
  const win = BrowserWindow.fromWebContents(webContents);
  console.log(test);
}

function createWindow() {
  win = new BrowserWindow({
    width: 2736,
    height: 1824,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // devTools: true,
    },
    autoHideMenuBar: true, // PRODUCTION
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(`../../../index.html`); // PRODUCTION
    // This ensures that the file is treated as part of your Electron application and avoids the security restrictions
    // win.loadURL(`file://${path.join(__dirname, "index.html")}`);

    // win.loadURL(path.join(process.env.DIST, "index.html"));
    // win.loadFile(path.join(__dirname, "index.html"));
  }

  ipcMain.on("test-ipc", (event, test) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    console.log(test);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const printOptions: Electron.WebContentsPrintOptions = {
  silent: true,
  printBackground: true,
  color: true,
  margin: {
    marginType: "printableArea",
  },
  landscape: false,
  pagesPerSheet: 1,
  collate: false,
  copies: 1,
  header: "Page header",
  footer: "Page footer",
};

ipcMain.handle("printComponent", async (event, url) => {
  const win = new BrowserWindow({ show: false });

  win.webContents.on("did-finish-load", () => {
    win.webContents.print(printOptions, (success, failureReason) => {
      console.log("Print Initiated in Main...");
      if (!success) console.log(failureReason);
    });
  });

  await win.loadURL(url);
  return "shown print dialog";
});

ipcMain.handle("previewComponent", async (event, url) => {
  let win = new BrowserWindow({
    title: "Print Preview",
    show: false,
    autoHideMenuBar: true,
  });

  win.webContents.once("did-finish-load", () => {
    win.webContents
      .printToPDF(printOptions)
      .then((data) => {
        const buf = Buffer.from(data);
        data = buf.toString("base64");
        const url = "data:application/pdf;base64," + data;

        win.webContents.on("ready-to-show", () => {
          win.once("page-title-updated", (e) => e.preventDefault());
          win.show();
        });

        win.webContents.on("closed", () => (win = null));
        win.loadURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  await win.loadURL(url);
  return "shown preview window";
});

// Event handler for printing the receipt
// ipcMain.on("print-receipt", () => {
//   win?.webContents.print({ silent: true });
// });

app.whenReady().then(createWindow);
