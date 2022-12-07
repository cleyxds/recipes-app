import { join } from "path"

import { ulid } from "ulid"

import multer from "multer"

import MulterGoogleCloudStorage from "multer-google-storage"

import { isDevelopment } from "./constants"

const PUBLIC_PATH = join(__dirname, "..", "..", "public", "uploads")

const handleUploadCloud = isDevelopment
  ? null
  : new MulterGoogleCloudStorage({
      filename: (req, file, callback) => {
        callback(null, `images/${ulid()}-${file.originalname}`)
      }
    })

const handleUploadLocal = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, PUBLIC_PATH)
  },
  filename: (req, file, callback) => {
    callback(null, `${ulid()}-${file.originalname}`)
  }
})

const useUpload = isDevelopment ? handleUploadLocal : handleUploadCloud

export { useUpload }
