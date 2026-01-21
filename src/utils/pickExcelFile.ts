import { supabase } from "@/src";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as XLSX from "xlsx";

/* -------------------------------------------
   Pick Excel file
-------------------------------------------- */
export async function pickExcelFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ],
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;
  return result.assets[0]; // { uri, name, mimeType }
}

/* -------------------------------------------
   Optional: Read Excel locally (preview / validate)
-------------------------------------------- */
export async function readExcelFile(uri: string) {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  const workbook = XLSX.read(base64, { type: "base64" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

/* -------------------------------------------
   Upload Excel to Supabase Storage (SIGNED URL)
   Bucket: uploads
-------------------------------------------- */

export async function uploadExcelToStorage(file: {
  uri: string;
  name: string;
  mimeType?: string;
}) {
  console.log("📤 Uploading:", file.name);

  // 1️⃣ Ask Edge Function for signed upload URL
  const { data, error } = await supabase.functions.invoke(
    "create-upload-url",
    { body: { fileName: file.name } }
  );

  if (error) throw error;

  const { signedUrl, path } = data as {
    signedUrl: string;
    path: string;
  };

  // 2️⃣ Upload file as raw binary (THIS is the fix)
  const result = await FileSystem.uploadAsync(
    signedUrl,
    file.uri,
    {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type":
          file.mimeType ??
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    }
  );

  if (result.status !== 200) {
    throw new Error("Upload failed");
  }

  console.log("✅ File uploaded to:", path);
  return path;
}


/* -------------------------------------------
   Trigger backend import (Edge Function)
-------------------------------------------- */
export async function triggerLeadsImport(filePath: string) {
  const { data, error } = await supabase.functions.invoke(
    "upload-leads",
    {
      body: { filePath },
    }
  );

  console.log("Import response", { data, error });

  if (error) {
    throw error;
  }

  if (!data?.success) {
    throw new Error("Import failed");
  }

  return data;
}
