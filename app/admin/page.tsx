"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Edit2, Save, Image as ImageIcon, BookOpen, Briefcase, 
  ArrowLeft, LogOut, CheckCircle, AlertCircle, Loader2, HelpCircle 
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";
import Crest from "@/components/Crest";
import { galleryItems } from "@/data/gallery";
import { projects as staticProjects } from "@/data/projects";
import { siteContent } from "@/data/siteContent";

export default function AdminPage() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<"gallery" | "projects" | "magazine">("gallery");

  // Status/Feedback
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Gallery State
  const [gallery, setGallery] = useState<any[]>([]);
  const [newPhoto, setNewPhoto] = useState({
    src: "",
    alt: "",
    caption: "",
    span: "default"
  });

  // Projects State
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    status: "Ongoing",
    icon: "Info"
  });

  // Magazine State
  const [magazine, setMagazine] = useState({
    eyebrow: "",
    title: "",
    description: "",
    cover_image: "",
    download_url: "",
    read_url: ""
  });

  // Redirect non-admins
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/signin");
      } else if (profile && profile.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, profile, loading, router]);

  // Fetch all data
  useEffect(() => {
    if (user && profile?.role === "admin") {
      fetchGallery();
      fetchProjects();
      fetchMagazine();
    }
  }, [user, profile]);

  const showFeedback = (type: "success" | "error", message: string) => {
    if (type === "success") {
      setSuccess(message);
      setError(null);
    } else {
      setError(message);
      setSuccess(null);
    }
    // Auto clear after 4s
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 4000);
  };

  // --- STORAGE FILE UPLOADER ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "gallery" | "magazine") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (field === "gallery") {
        setNewPhoto((prev) => ({ ...prev, src: publicUrl }));
        showFeedback("success", "Image uploaded successfully!");
      } else if (field === "magazine") {
        setMagazine((prev) => ({ ...prev, cover_image: publicUrl }));
        showFeedback("success", "Cover image uploaded successfully!");
      }
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to upload file to storage.");
    } finally {
      setUploading(false);
    }
  };

  // --- CRUD GALLERY ---
  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      setGallery(data || []);
    } catch (err: any) {
      console.error("Error fetching gallery:", err);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .insert([newPhoto])
        .select();
      if (error) throw error;
      
      setGallery([...gallery, data[0]]);
      setNewPhoto({ src: "", alt: "", caption: "", span: "default" });
      showFeedback("success", "Photo added to gallery successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to add photo.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
      setGallery(gallery.filter(item => item.id !== id));
      showFeedback("success", "Photo deleted from gallery.");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to delete photo.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSeedGallery = async () => {
    if (!confirm("Seed gallery with initial static memories from codebase?")) return;
    setActionLoading(true);
    try {
      const formattedItems = galleryItems.map(item => ({
        src: item.src,
        alt: item.alt,
        caption: item.caption || "",
        span: item.span || "default"
      }));
      const { error } = await supabase.from("gallery").insert(formattedItems);
      if (error) throw error;
      await fetchGallery();
      showFeedback("success", "Seeded gallery successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to seed gallery.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- CRUD PROJECTS ---
  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .insert([newProject])
        .select();
      if (error) throw error;
      
      setProjects([...projects, data[0]]);
      setNewProject({ title: "", description: "", status: "Ongoing", icon: "Info" });
      showFeedback("success", "Project added successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to add project.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setActionLoading(true);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      setProjects(projects.filter(item => item.id !== id));
      showFeedback("success", "Project deleted successfully.");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to delete project.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSeedProjects = async () => {
    if (!confirm("Seed projects table with initial codebase projects?")) return;
    setActionLoading(true);
    try {
      const formattedProjects = staticProjects.map(proj => ({
        title: proj.title,
        description: proj.description,
        status: proj.status,
        icon: proj.title.includes("Scholar") ? "GraduationCap" : 
              proj.title.includes("Mentor") ? "Users" :
              proj.title.includes("Library") ? "BookOpen" :
              proj.title.includes("Tree") ? "Trees" : "HandHeart"
      }));
      const { error } = await supabase.from("projects").insert(formattedProjects);
      if (error) throw error;
      await fetchProjects();
      showFeedback("success", "Seeded projects successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to seed projects.");
    } finally {
      setActionLoading(false);
    }
  };

  // --- CRUD MAGAZINE ---
  const fetchMagazine = async () => {
    try {
      const { data, error } = await supabase
        .from("magazine")
        .select("*")
        .eq("id", 1)
        .single();
      if (error) {
        if (error.code !== "PGRST116") throw error; // PGRST116 is code for 'no rows returned'
        // Pre-fill with static content
        setMagazine({
          eyebrow: siteContent.magazine.eyebrow,
          title: siteContent.magazine.title,
          description: siteContent.magazine.description,
          cover_image: siteContent.magazine.coverImage,
          download_url: siteContent.magazine.downloadUrl,
          read_url: siteContent.magazine.readUrl
        });
      } else if (data) {
        setMagazine(data);
      }
    } catch (err: any) {
      console.error("Error fetching magazine:", err);
    }
  };

  const handleSaveMagazine = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("magazine")
        .upsert({
          id: 1,
          ...magazine
        });
      if (error) throw error;
      showFeedback("success", "Magazine details saved successfully!");
    } catch (err: any) {
      showFeedback("error", err.message || "Failed to save magazine.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading || !user || !profile || profile.role !== "admin") {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-maroon" />
          <p className="text-sm font-medium text-ink/60">Verifying administrator credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative isolate min-h-[100svh] bg-cream/35 pb-20 pt-10">
      {/* Background decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #800000 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-gold-100 blur-3xl opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-maroon-50 blur-3xl opacity-40"
      />

      <div className="container-narrow">
        {/* Admin Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-maroon-100 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Go to homepage">
              <Crest
                size={52}
                className="transition-transform duration-300 hover:scale-105"
                ringClassName="bg-maroon text-gold"
                fallbackTextClassName="text-sm"
              />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-maroon md:text-3xl">
                  Admin Panel
                </h1>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700">
                  Administrator
                </span>
              </div>
              <p className="text-xs text-ink/65 mt-0.5">
                Manage site content for ACOBA &lsquo;20
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="btn-outline !py-2 !px-4 !text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              View Site
            </Link>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  signOut();
                  router.push("/");
                }
              }}
              className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white hover:bg-maroon-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Action feedback banners */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-100"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
              <div>{error}</div>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 border border-emerald-100"
            >
              <CheckCircle size={18} className="mt-0.5 shrink-0 text-emerald-600" />
              <div>{success}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Selection */}
        <div className="mt-8 flex border-b border-ink/10">
          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3.5 text-sm font-semibold transition-all ${
              activeTab === "gallery"
                ? "border-maroon text-maroon"
                : "border-transparent text-ink/60 hover:text-maroon"
            }`}
          >
            <ImageIcon size={16} />
            Gallery Photos
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3.5 text-sm font-semibold transition-all ${
              activeTab === "projects"
                ? "border-maroon text-maroon"
                : "border-transparent text-ink/60 hover:text-maroon"
            }`}
          >
            <Briefcase size={16} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("magazine")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3.5 text-sm font-semibold transition-all ${
              activeTab === "magazine"
                ? "border-maroon text-maroon"
                : "border-transparent text-ink/60 hover:text-maroon"
            }`}
          >
            <BookOpen size={16} />
            Magazine Info
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          {/* TAB 1: GALLERY */}
          {activeTab === "gallery" && (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Form Block */}
              <div className="lg:col-span-1 rounded-2xl border border-maroon-100 bg-white p-6 shadow-elegant">
                <h3 className="font-serif text-lg font-bold text-maroon mb-4">Add Photo</h3>
                <form onSubmit={handleAddPhoto} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Image Source (URL)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newPhoto.src}
                      onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                    
                    <div className="mt-3 flex flex-col items-center justify-center border-2 border-dashed border-maroon-100 rounded-xl p-4 bg-cream/5 hover:bg-cream/10 transition-colors relative">
                      {uploading ? (
                        <div className="flex flex-col items-center gap-1.5 py-2">
                          <Loader2 size={20} className="animate-spin text-maroon" />
                          <span className="text-xs font-medium text-ink/60">Uploading to storage...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <ImageIcon size={20} className="text-maroon/60" />
                          <span className="text-xs font-semibold text-maroon hover:text-maroon-700 cursor-pointer">
                            Click to upload file
                          </span>
                          <span className="text-[10px] text-ink/50">PNG, JPG, WEBP up to 50MB</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, "gallery")}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Alt Text</label>
                    <input
                      type="text"
                      required
                      placeholder="Cricket Match 2020"
                      value={newPhoto.alt}
                      onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Caption (Optional)</label>
                    <input
                      type="text"
                      placeholder="Captured during the final assembly"
                      value={newPhoto.caption}
                      onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Grid Span Aspect</label>
                    <select
                      value={newPhoto.span}
                      onChange={(e) => setNewPhoto({ ...newPhoto, span: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    >
                      <option value="default">Square (Default)</option>
                      <option value="wide">Wide (Spans 2 columns)</option>
                      <option value="tall">Tall (Spans 2 rows)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={actionLoading || uploading}
                    className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Plus size={14} />
                    Add Image
                  </button>
                </form>
              </div>

              {/* Photos List Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-ink">Gallery Photos ({gallery.length})</h3>
                  {gallery.length === 0 && (
                    <button
                      onClick={handleSeedGallery}
                      disabled={actionLoading}
                      className="text-xs font-bold uppercase tracking-wider text-maroon hover:text-gold transition-colors flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Seed from Codebase
                    </button>
                  )}
                </div>

                {gallery.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink/20 p-12 text-center text-ink/50 bg-white">
                    No gallery photos found in Supabase. You can seed them using the button above.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {gallery.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center gap-4 rounded-xl border border-maroon-100 bg-white p-4 shadow-elegant"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={item.src} 
                            alt={item.alt} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-semibold text-ink">{item.alt}</h4>
                          <p className="truncate text-xs text-ink/65 mt-0.5">{item.caption || "No caption"}</p>
                          <span className="inline-block mt-1 bg-cream border border-maroon-100 rounded px-1.5 py-0.5 text-[8px] font-semibold text-maroon uppercase">
                            {item.span}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeletePhoto(item.id)}
                          disabled={actionLoading}
                          className="rounded-full p-2 text-ink/40 hover:bg-red-50 hover:text-red-600 transition-all shrink-0"
                          aria-label="Delete photo"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Form Block */}
              <div className="lg:col-span-1 rounded-2xl border border-maroon-100 bg-white p-6 shadow-elegant">
                <h3 className="font-serif text-lg font-bold text-maroon mb-4">Add Project</h3>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Scholarship Fund"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the scope and impact of this batch project..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Lucide Icon Badge</label>
                    <select
                      value={newProject.icon}
                      onChange={(e) => setNewProject({ ...newProject, icon: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    >
                      <option value="GraduationCap">Graduation Cap (Scholarships)</option>
                      <option value="Users">Users (Mentorships)</option>
                      <option value="BookOpen">Book (Library)</option>
                      <option value="Trees">Trees (Environment)</option>
                      <option value="HandHeart">Hand Heart (Charity)</option>
                      <option value="Info">Info (Generic)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Plus size={14} />
                    Add Project
                  </button>
                </form>
              </div>

              {/* Projects List Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-ink">Projects List ({projects.length})</h3>
                  {projects.length === 0 && (
                    <button
                      onClick={handleSeedProjects}
                      disabled={actionLoading}
                      className="text-xs font-bold uppercase tracking-wider text-maroon hover:text-gold transition-colors flex items-center gap-1"
                    >
                      <Plus size={12} />
                      Seed from Codebase
                    </button>
                  )}
                </div>

                {projects.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-ink/20 p-12 text-center text-ink/50 bg-white">
                    No projects found in Supabase. You can seed them using the button above.
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {projects.map((proj, idx) => (
                      <div 
                        key={proj.id || idx}
                        className="flex flex-col justify-between rounded-xl border border-maroon-100 bg-white p-5 shadow-elegant"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="bg-cream border border-maroon-100 rounded-full px-2.5 py-0.5 text-[9px] font-bold text-maroon uppercase">
                              {proj.icon}
                            </span>
                            <span className="text-[10px] font-semibold text-ink/50 uppercase tracking-wider">
                              {proj.status}
                            </span>
                          </div>
                          <h4 className="mt-3 font-serif text-base font-bold text-ink">{proj.title}</h4>
                          <p className="mt-2 text-xs leading-relaxed text-ink/75 line-clamp-3">{proj.description}</p>
                        </div>
                        <div className="mt-4 border-t border-ink/5 pt-3 flex justify-end">
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            disabled={actionLoading}
                            className="rounded-full p-2 text-ink/40 hover:bg-red-50 hover:text-red-600 transition-all"
                            aria-label="Delete project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MAGAZINE INFO */}
          {activeTab === "magazine" && (
            <div className="max-w-2xl mx-auto rounded-2xl border border-maroon-100 bg-white p-8 shadow-elegant">
              <h3 className="font-serif text-xl font-bold text-maroon mb-6 text-center">Update Batch Magazine Information</h3>
              <form onSubmit={handleSaveMagazine} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Eyebrow Header</label>
                    <input
                      type="text"
                      required
                      placeholder="Our Story in Print"
                      value={magazine.eyebrow}
                      onChange={(e) => setMagazine({ ...magazine, eyebrow: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Magazine Title</label>
                    <input
                      type="text"
                      required
                      placeholder="The Batch Magazine"
                      value={magazine.title}
                      onChange={(e) => setMagazine({ ...magazine, title: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide a description details for the batch publication..."
                    value={magazine.description}
                    onChange={(e) => setMagazine({ ...magazine, description: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Cover Image Source (URL)</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={magazine.cover_image}
                    onChange={(e) => setMagazine({ ...magazine, cover_image: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                  />
                  
                  <div className="mt-3 flex flex-col items-center justify-center border-2 border-dashed border-maroon-100 rounded-xl p-4 bg-cream/5 hover:bg-cream/10 transition-colors relative">
                    {uploading ? (
                      <div className="flex flex-col items-center gap-1.5 py-2">
                        <Loader2 size={20} className="animate-spin text-maroon" />
                        <span className="text-xs font-medium text-ink/60">Uploading to storage...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <ImageIcon size={20} className="text-maroon/60" />
                        <span className="text-xs font-semibold text-maroon hover:text-maroon-700 cursor-pointer">
                          Click to upload cover file
                        </span>
                        <span className="text-[10px] text-ink/50">PNG, JPG, WEBP up to 50MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, "magazine")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">Read Online Link</label>
                    <input
                      type="text"
                      required
                      placeholder="#"
                      value={magazine.read_url}
                      onChange={(e) => setMagazine({ ...magazine, read_url: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70">PDF Download Link</label>
                    <input
                      type="text"
                      required
                      placeholder="#"
                      value={magazine.download_url}
                      onChange={(e) => setMagazine({ ...magazine, download_url: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-ink/10 bg-cream/15 p-3 text-sm text-ink outline-none focus:border-maroon focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading || uploading}
                  className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-1.5 mt-4"
                >
                  <Save size={14} />
                  Save Magazine Details
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
