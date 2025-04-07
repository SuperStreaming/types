import { defineConfig } from "vitest/config"

export default defineConfig(() => ({
  test: {
    disableConsoleIntercept: !!process.env.VSCODE_INSPECTOR_OPTIONS
  }
}))
