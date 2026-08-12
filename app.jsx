import React, { useState, useMemo } from "react";
import {
  Search, SlidersHorizontal, Star, Heart, X, ChevronDown,
  Smartphone, ArrowUpDown, Scale, BatteryMedium, Camera,
  Cpu, HardDrive, MonitorSmartphone, Check, Signal
} from "lucide-react";

// ---------- Mock data ----------
const PHONES = [
  { id: 1, brand: "Apple", model: "iPhone 15 Pro Max", price: 159900, category: "Flagship", ram: 8, storage: 256, display: 6.7, battery: 4422, camera: 48, rating: 4.8, year: 2023, color: "#8B7FE8" },
  { id: 2, brand: "Apple", model: "iPhone 15", price: 79900, category: "Flagship", ram: 6, storage: 128, display: 6.1, battery: 3349, camera: 48, rating: 4.6, year: 2023, color: "#8B7FE8" },
  { id: 3, brand: "Samsung", model: "Galaxy S24 Ultra", price: 129999, category: "Flagship", ram: 12, storage: 256, display: 6.8, battery: 5000, camera: 200, rating: 4.7, year: 2024, color: "#8B7FE8" },
  { id: 4, brand: "Samsung", model: "Galaxy A55", price: 39999, category: "Mid-range", ram: 8, storage: 128, display: 6.6, battery: 5000, camera: 50, rating: 4.3, year: 2024, color: "#F5A623" },
  { id: 5, brand: "Samsung", model: "Galaxy M14", price: 12999, category: "Budget", ram: 4, storage: 64, display: 6.6, battery: 6000, camera: 50, rating: 4.0, year: 2023, color: "#34D399" },
  { id: 6, brand: "Xiaomi", model: "Redmi Note 13 Pro", price: 24999, category: "Mid-range", ram: 8, storage: 256, display: 6.67, battery: 5100, camera: 200, rating: 4.4, year: 2024, color: "#F5A623" },
  { id: 7, brand: "Xiaomi", model: "Redmi A3", price: 7499, category: "Budget", ram: 3, storage: 64, display: 6.71, battery: 5000, camera: 8, rating: 3.8, year: 2024, color: "#34D399" },
  { id: 8, brand: "Xiaomi", model: "Xiaomi 14", price: 69999, category: "Flagship", ram: 12, storage: 256, display: 6.36, battery: 4610, camera: 50, rating: 4.5, year: 2024, color: "#8B7FE8" },
  { id: 9, brand: "OnePlus", model: "OnePlus 12", price: 64999, category: "Flagship", ram: 12, storage: 256, display: 6.82, battery: 5400, camera: 50, rating: 4.6, year: 2024, color: "#8B7FE8" },
  { id: 10, brand: "OnePlus", model: "OnePlus Nord CE 4", price: 24999, category: "Mid-range", ram: 8, storage: 128, display: 6.7, battery: 5500, camera: 50, rating: 4.2, year: 2024, color: "#F5A623" },
  { id: 11, brand: "Google", model: "Pixel 8 Pro", price: 106999, category: "Flagship", ram: 12, storage: 128, display: 6.7, battery: 5050, camera: 50, rating: 4.5, year: 2023, color: "#8B7FE8" },
  { id: 12, brand: "Google", model: "Pixel 8a", price: 52999, category: "Mid-range", ram: 8, storage: 128, display: 6.1, battery: 4492, camera: 64, rating: 4.4, year: 2024, color: "#F5A623" },
  { id: 13, brand: "Realme", model: "Realme 12 Pro+", price: 29999, category: "Mid-range", ram: 8, storage: 256, display: 6.7, battery: 5000, camera: 50, rating: 4.1, year: 2024, color: "#F5A623" },
  { id: 14, brand: "Realme", model: "Realme C63", price: 9499, category: "Budget", ram: 4, storage: 128, display: 6.67, battery: 5000, camera: 50, rating: 3.9, year: 2024, color: "#34D399" },
  { id: 15, brand: "Vivo", model: "Vivo V30 Pro", price: 41999, category: "Mid-range", ram: 12, storage: 256, display: 6.78, battery: 5000, camera: 50, rating: 4.2, year: 2024, color: "#F5A623" },
  { id: 16, brand: "Vivo", model: "Vivo Y28", price: 13999, category: "Budget", ram: 6, storage: 128, display: 6.56, battery: 5000, camera: 50, rating: 3.9, year: 2024, color: "#34D399" },
  { id: 17, brand: "OPPO", model: "OPPO Reno 11 Pro", price: 34999, category: "Mid-range", ram: 12, storage: 256, display: 6.7, battery: 4600, camera: 50, rating: 4.1, year: 2024, color: "#F5A623" },
  { id: 18, brand: "Nothing", model: "Phone (2a)", price: 23999, category: "Mid-range", ram: 8, storage: 128, display: 6.7, battery: 5000, camera: 50, rating: 4.3, year: 2024, color: "#F5A623" },
];

const BRANDS = [...new Set(PHONES.map(p => p.brand))].sort();
const CATEGORIES = ["Budget", "Mid-range", "Flagship"];
const MAX_PRICE = Math.max(...PHONES.map(p => p.price));

const inr = (n) => "₹" + n.toLocaleString("en-IN");

// ---------- Small UI atoms ----------
function CategoryBadge({ category, color }) {
  return (
    <span
      style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}
      className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
    >
      {category}
    </span>
  );
}

function SignalBars({ rating }) {
  const bars = Math.round((rating / 5) * 4);
  return (
    <div className="flex items-end gap-[2px] h-3">
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          style={{ height: `${i * 25}%` }}
          className={`w-[3px] rounded-sm ${i <= bars ? "bg-[#5AA9E6]" : "bg-[#2A2E3B]"}`}
        />
      ))}
    </div>
  );
}

function SpecRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#242835] last:border-0">
      <span className="flex items-center gap-1.5 text-[#8B90A0] text-[13px]">
        <Icon size={13} /> {label}
      </span>
      <span className="font-mono text-[13px] text-[#EDEFF5]">{value}</span>
    </div>
  );
}

// ---------- Phone card ----------
function PhoneCard({ phone, onOpen, onToggleWishlist, isWishlisted, onToggleCompare, isCompared, compareFull }) {
  return (
    <div className="group bg-[#171A24] border border-[#242835] rounded-xl overflow-hidden hover:border-[#3A4058] transition-colors flex flex-col">
      <div
        onClick={() => onOpen(phone)}
        className="cursor-pointer p-5 flex flex-col items-center justify-center h-40 relative"
        style={{ background: `radial-gradient(circle at 50% 20%, ${phone.color}18, transparent 70%)` }}
      >
        <Smartphone size={56} strokeWidth={1.2} style={{ color: phone.color }} />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(phone.id); }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#0F1117]/70 hover:bg-[#0F1117] transition-colors"
        >
          <Heart size={16} className={isWishlisted ? "fill-[#D4537E] text-[#D4537E]" : "text-[#8B90A0]"} />
        </button>
      </div>

      <div onClick={() => onOpen(phone)} className="cursor-pointer px-4 pt-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] text-[#8B90A0] font-mono uppercase tracking-wider">{phone.brand}</p>
            <h3 className="text-[15px] font-medium text-[#EDEFF5] leading-tight mt-0.5">{phone.model}</h3>
          </div>
          <CategoryBadge category={phone.category} color={phone.color} />
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <SignalBars rating={phone.rating} />
          <span className="text-[12px] text-[#8B90A0] font-mono">{phone.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-3 mt-2 text-[12px] font-mono text-[#8B90A0]">
          <span>{phone.ram}GB RAM</span>
          <span className="w-1 h-1 rounded-full bg-[#3A4058]" />
          <span>{phone.storage}GB</span>
        </div>

        <p className="font-mono text-[19px] text-[#EDEFF5] mt-3 mb-1">{inr(phone.price)}</p>
      </div>

      <div className="px-4 pb-4 pt-1">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleCompare(phone.id); }}
          disabled={!isCompared && compareFull}
          className={`w-full flex items-center justify-center gap-1.5 text-[12px] py-2 rounded-lg border transition-colors
            ${isCompared
              ? "border-[#5AA9E6] bg-[#5AA9E6]/10 text-[#5AA9E6]"
              : compareFull
                ? "border-[#242835] text-[#4A4E5C] cursor-not-allowed"
                : "border-[#242835] text-[#8B90A0] hover:border-[#3A4058] hover:text-[#EDEFF5]"}`}
        >
          {isCompared ? <Check size={13} /> : <Scale size={13} />}
          {isCompared ? "Added to compare" : "Compare"}
        </button>
      </div>
    </div>
  );
}

// ---------- Detail modal ----------
function DetailModal({ phone, onClose, onToggleWishlist, isWishlisted }) {
  if (!phone) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#171A24] border border-[#242835] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
      >
        <div
          className="p-8 flex flex-col items-center relative"
          style={{ background: `radial-gradient(circle at 50% 10%, ${phone.color}22, transparent 70%)` }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-[#0F1117]/70 hover:bg-[#0F1117]">
            <X size={18} className="text-[#8B90A0]" />
          </button>
          <Smartphone size={90} strokeWidth={1} style={{ color: phone.color }} />
          <p className="text-[12px] text-[#8B90A0] font-mono uppercase tracking-wider mt-4">{phone.brand} &middot; {phone.year}</p>
          <h2 className="text-2xl font-medium text-[#EDEFF5] mt-1 text-center">{phone.model}</h2>
          <CategoryBadge category={phone.category} color={phone.color} />
          <p className="font-mono text-3xl text-[#EDEFF5] mt-4">{inr(phone.price)}</p>
        </div>

        <div className="px-6 pb-6">
          <div className="bg-[#0F1117] rounded-xl px-4 py-1 mt-2">
            <SpecRow icon={Cpu} label="RAM" value={`${phone.ram} GB`} />
            <SpecRow icon={HardDrive} label="Storage" value={`${phone.storage} GB`} />
            <SpecRow icon={MonitorSmartphone} label="Display" value={`${phone.display}"`} />
            <SpecRow icon={BatteryMedium} label="Battery" value={`${phone.battery} mAh`} />
            <SpecRow icon={Camera} label="Camera" value={`${phone.camera} MP`} />
            <SpecRow icon={Star} label="Rating" value={`${phone.rating.toFixed(1)} / 5`} />
          </div>

          <button
            onClick={() => onToggleWishlist(phone.id)}
            className={`w-full flex items-center justify-center gap-2 mt-4 py-2.5 rounded-lg border text-[13px] transition-colors
              ${isWishlisted ? "border-[#D4537E] bg-[#D4537E]/10 text-[#D4537E]" : "border-[#242835] text-[#8B90A0] hover:border-[#3A4058] hover:text-[#EDEFF5]"}`}
          >
            <Heart size={14} className={isWishlisted ? "fill-[#D4537E]" : ""} />
            {isWishlisted ? "Saved to wishlist" : "Add to wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------- Compare tray/modal ----------
function CompareModal({ phones, onClose, onRemove }) {
  if (phones.length === 0) return null;
  const rows = [
    { label: "Price", key: "price", fmt: (p) => inr(p.price) },
    { label: "Category", key: "category", fmt: (p) => p.category },
    { label: "RAM", key: "ram", fmt: (p) => `${p.ram} GB` },
    { label: "Storage", key: "storage", fmt: (p) => `${p.storage} GB` },
    { label: "Display", key: "display", fmt: (p) => `${p.display}"` },
    { label: "Battery", key: "battery", fmt: (p) => `${p.battery} mAh` },
    { label: "Camera", key: "camera", fmt: (p) => `${p.camera} MP` },
    { label: "Rating", key: "rating", fmt: (p) => `${p.rating.toFixed(1)} / 5` },
  ];
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-[#171A24] border border-[#242835] rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#242835] sticky top-0 bg-[#171A24]">
          <h2 className="text-[15px] font-medium text-[#EDEFF5] flex items-center gap-2"><Scale size={16} /> Compare phones</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#0F1117]">
            <X size={18} className="text-[#8B90A0]" />
          </button>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                <td className="w-28"></td>
                {phones.map(p => (
                  <td key={p.id} className="px-3 pb-4 text-center align-top">
                    <div className="relative inline-block">
                      <button onClick={() => onRemove(p.id)} className="absolute -top-2 -right-2 bg-[#0F1117] rounded-full p-1 border border-[#242835]">
                        <X size={11} className="text-[#8B90A0]" />
                      </button>
                      <Smartphone size={40} strokeWidth={1.2} style={{ color: p.color }} className="mx-auto" />
                    </div>
                    <p className="text-[12px] text-[#8B90A0] font-mono mt-1">{p.brand}</p>
                    <p className="text-[13px] text-[#EDEFF5] font-medium leading-tight">{p.model}</p>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.key} className="border-t border-[#242835]">
                  <td className="py-2.5 text-[12px] text-[#8B90A0]">{row.label}</td>
                  {phones.map(p => (
                    <td key={p.id} className="py-2.5 text-center font-mono text-[13px] text-[#EDEFF5]">{row.fmt(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------- Main app ----------
export default function PhoneExplorer() {
  const [query, setQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [minRam, setMinRam] = useState(0);
  const [sortBy, setSortBy] = useState("popularity");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [activePhone, setActivePhone] = useState(null);
  const [view, setView] = useState("catalog"); // catalog | wishlist
  const [compareOpen, setCompareOpen] = useState(false);

  const toggleBrand = (b) => setSelectedBrands(s => s.includes(b) ? s.filter(x => x !== b) : [...s, b]);
  const toggleCategory = (c) => setSelectedCategories(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c]);
  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const toggleCompare = (id) => setCompareIds(c => c.includes(id) ? c.filter(x => x !== id) : c.length < 3 ? [...c, id] : c);

  const filtered = useMemo(() => {
    let list = PHONES.filter(p => {
      const matchesQuery = (p.brand + " " + p.model).toLowerCase().includes(query.toLowerCase());
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price <= maxPrice;
      const matchesRam = p.ram >= minRam;
      return matchesQuery && matchesBrand && matchesCategory && matchesPrice && matchesRam;
    });

    if (view === "wishlist") list = list.filter(p => wishlist.includes(p.id));

    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => b.year - a.year); break;
      default: list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [query, selectedBrands, selectedCategories, maxPrice, minRam, sortBy, view, wishlist]);

  const compareFull = compareIds.length >= 3;
  const comparedPhones = PHONES.filter(p => compareIds.includes(p.id));

  const clearFilters = () => {
    setSelectedBrands([]); setSelectedCategories([]); setMaxPrice(MAX_PRICE); setMinRam(0);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-[#EDEFF5]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0F1117]/90 backdrop-blur border-b border-[#242835]">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Signal size={22} className="text-[#5AA9E6]" />
            <span className="font-display font-semibold text-[17px]">Signal<span className="text-[#5AA9E6]">.</span></span>
          </div>

          <div className="flex-1 relative max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B90A0]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or model…"
              className="w-full bg-[#171A24] border border-[#242835] rounded-lg pl-9 pr-3 py-2 text-[13px] placeholder-[#5C6070] focus:outline-none focus:border-[#5AA9E6] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button
              onClick={() => setView(v => v === "wishlist" ? "catalog" : "wishlist")}
              className={`flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-lg border transition-colors
                ${view === "wishlist" ? "border-[#D4537E] bg-[#D4537E]/10 text-[#D4537E]" : "border-[#242835] text-[#8B90A0] hover:text-[#EDEFF5] hover:border-[#3A4058]"}`}
            >
              <Heart size={14} className={view === "wishlist" ? "fill-[#D4537E]" : ""} />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlist.length > 0 && <span className="font-mono text-[11px]">({wishlist.length})</span>}
            </button>
            <button
              onClick={() => setCompareOpen(true)}
              disabled={compareIds.length === 0}
              className={`flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-lg border transition-colors
                ${compareIds.length > 0 ? "border-[#5AA9E6] bg-[#5AA9E6]/10 text-[#5AA9E6]" : "border-[#242835] text-[#4A4E5C] cursor-not-allowed"}`}
            >
              <Scale size={14} />
              <span className="hidden sm:inline">Compare</span>
              {compareIds.length > 0 && <span className="font-mono text-[11px]">({compareIds.length})</span>}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-6 flex gap-6">
        {/* Filters sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <FilterPanel
            selectedBrands={selectedBrands} toggleBrand={toggleBrand}
            selectedCategories={selectedCategories} toggleCategory={toggleCategory}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            minRam={minRam} setMinRam={setMinRam}
            clearFilters={clearFilters}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="font-display text-lg font-semibold">
                {view === "wishlist" ? "Your wishlist" : "All phones"}
              </h1>
              <p className="text-[12px] text-[#8B90A0] font-mono mt-0.5">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-lg border border-[#242835] text-[#8B90A0]"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-[#171A24] border border-[#242835] rounded-lg pl-3 pr-8 py-2 text-[13px] focus:outline-none focus:border-[#5AA9E6] cursor-pointer"
                >
                  <option value="popularity">Top rated</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
                <ArrowUpDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B90A0] pointer-events-none" />
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-[#242835] rounded-xl py-20 text-center">
              <Smartphone size={32} className="mx-auto text-[#3A4058] mb-3" />
              <p className="text-[#8B90A0] text-[14px]">
                {view === "wishlist" ? "Nothing saved yet. Tap the heart on a phone to add it here." : "No phones match those filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(phone => (
                <PhoneCard
                  key={phone.id}
                  phone={phone}
                  onOpen={setActivePhone}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(phone.id)}
                  onToggleCompare={toggleCompare}
                  isCompared={compareIds.includes(phone.id)}
                  compareFull={compareFull}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filters sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setFiltersOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-72 bg-[#0F1117] border-l border-[#242835] p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-[15px]">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X size={18} className="text-[#8B90A0]" /></button>
            </div>
            <FilterPanel
              selectedBrands={selectedBrands} toggleBrand={toggleBrand}
              selectedCategories={selectedCategories} toggleCategory={toggleCategory}
              maxPrice={maxPrice} setMaxPrice={setMaxPrice}
              minRam={minRam} setMinRam={setMinRam}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      )}

      <DetailModal
        phone={activePhone}
        onClose={() => setActivePhone(null)}
        onToggleWishlist={toggleWishlist}
        isWishlisted={activePhone ? wishlist.includes(activePhone.id) : false}
      />

      {compareOpen && (
        <CompareModal
          phones={comparedPhones}
          onClose={() => setCompareOpen(false)}
          onRemove={(id) => setCompareIds(c => c.filter(x => x !== id))}
        />
      )}
    </div>
  );
}

function FilterPanel({ selectedBrands, toggleBrand, selectedCategories, toggleCategory, maxPrice, setMaxPrice, minRam, setMinRam, clearFilters }) {
  return (
    <div className="space-y-6 sticky top-20">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-mono uppercase tracking-wider text-[#8B90A0]">Filters</span>
        <button onClick={clearFilters} className="text-[12px] text-[#5AA9E6] hover:underline">Clear</button>
      </div>

      <div>
        <p className="text-[13px] font-medium mb-2.5">Max price</p>
        <input
          type="range" min={5000} max={MAX_PRICE} step={1000}
          value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <p className="font-mono text-[13px] text-[#5AA9E6] mt-1">{inr(maxPrice)}</p>
      </div>

      <div>
        <p className="text-[13px] font-medium mb-2.5">Category</p>
        <div className="space-y-1.5">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2 text-[13px] text-[#8B90A0] cursor-pointer hover:text-[#EDEFF5]">
              <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="accent-[#5AA9E6]" />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[13px] font-medium mb-2.5">Brand</p>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          {BRANDS.map(b => (
            <label key={b} className="flex items-center gap-2 text-[13px] text-[#8B90A0] cursor-pointer hover:text-[#EDEFF5]">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-[#5AA9E6]" />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[13px] font-medium mb-2.5">Minimum RAM</p>
        <div className="flex gap-1.5 flex-wrap">
          {[0, 4, 6, 8, 12].map(r => (
            <button
              key={r}
              onClick={() => setMinRam(r)}
              className={`text-[12px] font-mono px-2.5 py-1 rounded-md border transition-colors
                ${minRam === r ? "border-[#5AA9E6] bg-[#5AA9E6]/10 text-[#5AA9E6]" : "border-[#242835] text-[#8B90A0] hover:border-[#3A4058]"}`}
            >
              {r === 0 ? "Any" : `${r}GB+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
