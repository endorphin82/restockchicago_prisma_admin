import { useState } from 'react'
import { Category, Product } from '../__generated__/types'

export const priceStringToIntCent = (str: string) => {
  return Math.round(100 * parseFloat(str.replace(/[$,]/g, '')))
}
export const priceToDollars = (price: any) => {
  return Number(price / 100)
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return []

  return Array.isArray(candidate) ? candidate : [candidate]
}

export const useSetValuesFromForm = () => {
  const [values, setValues] = useState<Product | Category | any>({})
  const handleChange = (e: { target: any }) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  return { values, setValues, handleChange }
}

export const useSetFilesFromForm = () => {
  const [fl, setFl] = useState<any>([])
  const setFilesFromForm = (valuefromformlist: any) => {
    const formData = new FormData()
    fl ?? valuefromformlist.files.forEach((file: any) => {
      setFl((fl: any[]) => [...fl, file.originFileObj])
      formData.append('files[]', file.originFileObj)
    })
  }
   const propsUploadF = (setFl: any, fl: any) => ({
    multiple: true,
    beforeUpload: (file: any) => {
      setFl((fl: any[]) => [...fl, file])
      return false
    },
    accept: 'image/jpeg,image/png,image/gif,image/svg+xml',
    onRemove: (file: any) => {
      const index = fl.indexOf(file)
      const newFl = fl.slice()
      newFl.splice(index, 1)
      setFl([...newFl])
    },
    fl
  })

  const propsUpload = propsUploadF(setFl, fl)

  return { fl, setFl, setFilesFromForm, propsUpload }
}

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

