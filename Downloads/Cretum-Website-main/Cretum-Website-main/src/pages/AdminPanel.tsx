import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Upload, Trash2, LogOut, Save, FileText } from "lucide-react";

interface ChartRow {
  id: string;
  month: string;
  month_order: number;
  valor: number;
}

interface GVVDoc {
  id: string;
  name: string;
  file_path: string;
  file_url: string;
  created_at: string;
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<ChartRow[]>([]);
  const [documents, setDocuments] = useState<GVVDoc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) navigate("/admin/login");
  };

  const fetchData = async () => {
    const [chartRes, docRes] = await Promise.all([
      supabase.from("gvv_chart_data").select("*").order("month_order"),
      supabase.from("gvv_documents").select("*").order("created_at", { ascending: false }),
    ]);
    if (chartRes.data) setChartData(chartRes.data);
    if (docRes.data) setDocuments(docRes.data as GVVDoc[]);
  };

  const handleValueChange = (id: string, value: string) => {
    setChartData((prev) =>
      prev.map((row) => (row.id === id ? { ...row, valor: parseFloat(value) || 0 } : row))
    );
  };

  const saveChart = async () => {
    setSaving(true);
    setMsg("");
    for (const row of chartData) {
      await supabase
        .from("gvv_chart_data")
        .update({ valor: row.valor })
        .eq("id", row.id);
    }
    setSaving(false);
    setMsg("✓ Gráfica guardada correctamente.");
    setTimeout(() => setMsg(""), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMsg("");

    const filePath = `cartas/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("gvv-documents")
      .upload(filePath, file);

    if (uploadError) {
      setMsg("Error al subir el archivo.");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("gvv-documents")
      .getPublicUrl(filePath);

    await supabase.from("gvv_documents").insert({
      name: file.name,
      file_path: filePath,
      file_url: urlData.publicUrl,
    });

    setMsg("✓ Carta subida correctamente.");
    fetchData();
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    setTimeout(() => setMsg(""), 3000);
  };

  const deleteDocument = async (id: string, filePath: string) => {
    await supabase.storage.from("gvv-documents").remove([filePath]);
    await supabase.from("gvv_documents").delete().eq("id", id);
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif text-primary">Panel de Administrador</h1>
          <p className="text-xs text-muted-foreground">Cretum Partners</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Salir
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {msg && (
          <div className="bg-primary/10 border border-primary/20 text-primary text-sm rounded-md px-4 py-3">
            {msg}
          </div>
        )}

        {/* Chart Editor */}
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif text-foreground mb-1">
            Gráfica — Valor del Portafolio GVV
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Edita los valores y presiona Guardar para actualizar la gráfica pública.
          </p>

          {/* Preview */}
          <div className="h-48 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={["dataMin - 5", "dataMax + 5"]} />
                <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, "Valor"]} />
                <Line type="monotone" dataKey="valor" stroke="hsl(214 60% 32%)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Input grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-5">
            {chartData.map((row) => (
              <div key={row.id} className="flex flex-col gap-1">
                <label className="text-xs font-medium text-muted-foreground">{row.month}</label>
                <input
                  type="number"
                  step="0.01"
                  value={row.valor}
                  onChange={(e) => handleValueChange(row.id, e.target.value)}
                  className="w-full px-2 py-1.5 border border-border rounded text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveChart}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </section>

        {/* File Upload */}
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-serif text-foreground mb-1">
            Carta Mensual de GVV
          </h2>
          <p className="text-xs text-muted-foreground mb-6">
            Sube el PDF o documento de la carta mensual. El más reciente se mostrará al público.
          </p>

          <label className="flex items-center gap-3 px-5 py-3 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary/40 transition-colors w-fit">
            <Upload className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {uploading ? "Subiendo..." : "Seleccionar archivo"}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

          {documents.length > 0 && (
            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Archivos subidos</p>
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 px-4 py-3 bg-secondary/40 border border-border rounded-md"
                >
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline truncate flex-1"
                  >
                    {doc.name}
                  </a>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(doc.created_at).toLocaleDateString("es-MX")}
                  </span>
                  <button
                    onClick={() => deleteDocument(doc.id, doc.file_path ? doc.file_path : "")}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
