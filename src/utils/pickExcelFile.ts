import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as XLSX from "xlsx";

export async function pickExcelFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ],
    copyToCacheDirectory: true,
  });
  console.log(result);
  if (result.canceled) return null;

  return result.assets[0]; // { uri, name, size }
}


export async function readExcelFile(uri: string) {
    console.log("Reading Excel file...");
  
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
  
    const workbook = XLSX.read(base64, {
      type: "base64",
      raw: true,
      cellDates: true,
      dense: true,
    });
  
    console.log("Sheet names:", workbook.SheetNames);
  
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error("No sheets found in Excel file");
    }
  
    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];
  
    if (!sheet) {
      throw new Error("Sheet is empty or unreadable");
    }
  
    const rows = XLSX.utils.sheet_to_json(sheet, {
      defval: "",
    });
  
    console.log("Parsed rows:", rows.length);
  
    return rows as any[];
  }

  export type LeadRow = {
    id: string;
    name: string;
    time_utc?: string;
    date_char?: string;
    campaign?: string;
    ad_id?: string;
    campaign_id?: string;
    lead_id: string;
    form_id?: string;
    page_id?: string;
    created_time?: string;
    ad_name?: string;
  };

  function safeToISOString(value: any): string | undefined {
    if (!value) return undefined;
  
    // If it's already a Date
    if (value instanceof Date && !isNaN(value.getTime())) {
      return value.toISOString();
    }
  
    // Try parsing string / number
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return undefined;
    }
  
    return date.toISOString();
  }
  
  
  export function prepareLeads(rows: any[]): LeadRow[] {
    return rows.slice(0, 10).map((row) => ({
      id: String(row.Id ?? ""),
      name: String(row.Name ?? ""),
      lead_id: String(row.lead_id ?? ""),
      campaign: String(row.Campaign ?? ""),
      time_utc: row.TimeUtc ? String(row.TimeUtc) : undefined,
      date_char: row.DateChar ? String(row.DateChar) : undefined,
      ad_id: row.ad_id ? String(row.ad_id) : undefined,
  
      // ✅ FIX: campaign_id is TEXT, not date
      campaign_id: row.campaign_id ? String(row.campaign_id) : undefined,
  
      form_id: row.form_id ? String(row.form_id) : undefined,
      page_id: row.page_id ? String(row.page_id) : undefined,
      ad_name: row.ad_name ? String(row.ad_name) : undefined,
  
      // ✅ FIX: SAFE DATE CONVERSION
      created_time: safeToISOString(row.created_time),
    }));
  }
  
  

  import { supabase } from "@/src";

  export async function uploadLeads(leads: LeadRow[]) {
    // 🛑 Safety check
    if (leads.length > 10) {
      throw new Error("Attempted to upload more than 10 leads");
    }
  
    // 🧪 Debug – verify payload keys
    console.log("Uploading leads:", leads);
  
    const { data, error } = await supabase
      .from("leads")
      .insert(leads); // 👈 ONE CALL, ONE REQUEST
  
    if (error) {
      console.error("Upload error:", error);
      throw error;
    }
  
    return data;
  }

