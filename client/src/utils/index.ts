export function disorderArray <T> (array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const getDataFromForm = (form: HTMLFormElement) => {
  const _formData = new FormData(form)
  return Object.fromEntries(_formData.entries()) as Record<string, string>
}

export const sanitizeText = (text: string) => {
  return text.toLowerCase().trim()
}

export const $ = <T extends Element>(selector: string): T | null => {
  return document.querySelector<T>(selector)
}
