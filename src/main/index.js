import { app, BrowserWindow, Menu, nativeImage, shell, Tray} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray = null;

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

/**
 * 打开应用程序主界面
 */
function createMainWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 750,
    useContentSize: true,
    width: 1200
  });

  mainWindow.loadURL(winURL);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.on("close", (e) => {
        e.preventDefault();
        mainWindow.hide();
    });

    mainWindow.onbeforeunload = (e) => {
        console.log('I do not want to be closed');

        // 与通常的浏览器不同,会提示给用户一个消息框,
        //返回非空值将默认取消关闭
        //建议使用对话框 API 让用户确认关闭应用程序.
        e.returnValue = false; // 相当于 `return false` ，但是不推荐使用
    };

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.

        mainWindow = null;
    });
}

/**
 *
 */
const initTray = () => {
    const image = nativeImage.createFromPath('./static/icon/favicon.ico');
    tray = new Tray(image);

    const trayMenuTemplate = [
        {
            label: '打开主窗口',
            type: 'normal',
            click() {
                mainWindow.show();
                mainWindow.focus();
            }
        },
        {
            label: '退出',
            type: 'normal',
            click() {
                app.exit();
            }
        }
    ];

    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    tray.on("double-click", function () {
        mainWindow.show();
        mainWindow.focus();
    })
};

// 单个实例
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        mainWindow.show();
        if (mainWindow.isMinimized()) {
            mainWindow.restore();
        }
        mainWindow.focus();
    }
});
if (shouldQuit) {
    app.quit();
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createMainWindow();
    initTray();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow();
    }
});
