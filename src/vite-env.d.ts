/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
export interface IpcRenderer {
  closeWindow: () => Promise<void>,
}

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}