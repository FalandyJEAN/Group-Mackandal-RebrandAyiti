export const openAuthModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openAuthModal"))
  }
}

export const openUploadModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openUploadModal"))
  }
}
