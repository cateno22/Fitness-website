import { useState } from "react";

const MUSCLES = [
  { id: "quad", name: "Quadrizeps", latin: "Quadriceps femoris", icon: "🦵", color: "#e85d3a" },
  { id: "delt", name: "Schulter", latin: "Deltoideus", icon: "🔺", color: "#3a7de8" },
  { id: "biz", name: "Bizeps", latin: "Biceps brachii", icon: "💪", color: "#e8a83a" },
  { id: "triz", name: "Trizeps", latin: "Triceps brachii", icon: "🔙", color: "#3ae8c2" },
  { id: "lat", name: "Latissimus", latin: "Latissimus dorsi", icon: "🪂", color: "#a83ae8" },
  { id: "trap", name: "Trapezius", latin: "Trapezius", icon: "🏔️", color: "#e83a8a" },
  { id: "abs", name: "Bauch", latin: "Abdominis", icon: "⬡", color: "#3ae85d" },
  { id: "calf", name: "Waden", latin: "Gastrocnemius & Soleus", icon: "🦶", color: "#e8d03a" },
  { id: "ham", name: "Beinbeuger", latin: "Biceps femoris & Co.", icon: "🦿", color: "#3ab4e8" },
];

const EXERCISES = {
  quad: {
    free: [
      { name: "Klassische Kniebeugen", desc: "Squats", sets: "4×12" },
      { name: "Ausfallschritte", desc: "Lunges", sets: "3×10" },
    ],
    equipment: [
      { name: "Kelch-Kniebeuge", desc: "Goblet Squat mit Hantel", sets: "4×10" },
      { name: "Step-Ups", desc: "Mit Hanteln", sets: "3×12" },
    ],
    gym: [
      { name: "Beinpresse", desc: "Maschine", sets: "4×10" },
      { name: "Beinstrecker", desc: "Maschine", sets: "3×15" },
    ],
  },
  delt: {
    free: [
      { name: "Pike Push-ups", desc: "V-Liegestütz", sets: "3×10" },
      { name: "Armkreisen", desc: "Isometrisch", sets: "3×30s" },
    ],
    equipment: [
      { name: "Schulterdrücken", desc: "Mit Hantel", sets: "4×10" },
      { name: "Seitheben", desc: "Hantel oder Theraband", sets: "3×15" },
    ],
    gym: [
      { name: "Military Press", desc: "Langhantel", sets: "4×8" },
      { name: "Schulterdrück-Maschine", desc: "Maschine", sets: "3×12" },
    ],
  },
  biz: {
    free: [
      { name: "Klimmzüge Untergriff", desc: "Tür oder Kante", sets: "3×8" },
      { name: "Isometrisches Halten", desc: "Bodyweight", sets: "3×30s" },
    ],
    equipment: [
      { name: "Bizeps-Curls", desc: "Hantel", sets: "3×12" },
      { name: "Hammer-Curls", desc: "Hantel oder Band", sets: "3×12" },
    ],
    gym: [
      { name: "SZ-Stangen Curls", desc: "Langhantel", sets: "4×10" },
      { name: "Scott-Curl", desc: "Bizeps-Maschine", sets: "3×12" },
    ],
  },
  triz: {
    free: [
      { name: "Enge Liegestütze", desc: "Bodyweight", sets: "3×12" },
      { name: "Dips", desc: "Stuhlkante", sets: "3×10" },
    ],
    equipment: [
      { name: "Trizeps über Kopf", desc: "Hantel", sets: "3×12" },
      { name: "Kickbacks", desc: "Hantel oder Band", sets: "3×15" },
    ],
    gym: [
      { name: "Trizepsdrücken", desc: "Kabelzug", sets: "4×12" },
      { name: "Barren-Dips", desc: "Eigengewicht", sets: "3×10" },
    ],
  },
  lat: {
    free: [
      { name: "Superman-Variante", desc: "Schnee-Engel in Bauchlage", sets: "3×12" },
      { name: "Klimmzüge", desc: "Bodyweight", sets: "3×8" },
    ],
    equipment: [
      { name: "Einarmiges Rudern", desc: "Hantel", sets: "4×10" },
      { name: "Pullover", desc: "Überzüge mit Hantel", sets: "3×12" },
    ],
    gym: [
      { name: "Latzug zur Brust", desc: "Kabelzug", sets: "4×10" },
      { name: "Rudern am Kabelzug", desc: "Kabelzug", sets: "4×10" },
    ],
  },
  trap: {
    free: [
      { name: "Y-W-T Heben", desc: "In Bauchlage", sets: "3×12" },
      { name: "Schulterblatt-Liegestütze", desc: "Bodyweight", sets: "3×12" },
    ],
    equipment: [
      { name: "Shruggs", desc: "Schulterzucken mit Hanteln", sets: "4×15" },
      { name: "Aufrechtes Rudern", desc: "Hantel oder Band", sets: "3×12" },
    ],
    gym: [
      { name: "Shruggs", desc: "Mit Langhantel", sets: "4×15" },
      { name: "Facepulls", desc: "Kabelzug", sets: "3×15" },
    ],
  },
  abs: {
    free: [
      { name: "Crunches", desc: "Bodyweight", sets: "4×20" },
      { name: "Beinheben", desc: "Im Liegen", sets: "3×15" },
    ],
    equipment: [
      { name: "Woodchoppers", desc: "Hantel oder Band", sets: "3×12" },
      { name: "Weighted Sit-ups", desc: "Mit Gewicht", sets: "3×15" },
    ],
    gym: [
      { name: "Crunch-Maschine", desc: "Bauchmaschine", sets: "4×15" },
      { name: "Beinheben hängend", desc: "An der Stange", sets: "3×12" },
    ],
  },
  calf: {
    free: [
      { name: "Wadenheben einbeinig", desc: "Im Stehen", sets: "3×15" },
      { name: "Wadenheben sitzend", desc: "Ohne Gewicht", sets: "3×20" },
    ],
    equipment: [
      { name: "Wadenheben stehend", desc: "Hanteln in den Händen", sets: "4×15" },
      { name: "Wadenheben sitzend", desc: "Hantel auf Knien", sets: "3×20" },
    ],
    gym: [
      { name: "Wadenheben Beinpresse", desc: "An der Beinpresse", sets: "4×20" },
      { name: "Stehendes Wadenheben", desc: "Maschine", sets: "4×15" },
    ],
  },
  ham: {
    free: [
      { name: "Glute Bridge", desc: "Beckenheben", sets: "4×15" },
      { name: "Nordic Hamstring Curls", desc: "Füße fixiert", sets: "3×8" },
    ],
    equipment: [
      { name: "Rumänisches Kreuzheben", desc: "Mit Hantel", sets: "4×10" },
      { name: "Hamstring Curls", desc: "Mit Widerstandsband", sets: "3×15" },
    ],
    gym: [
      { name: "Beinbeuger-Maschine", desc: "Liegend oder sitzend", sets: "4×12" },
      { name: "Kreuzheben", desc: "Mit Langhantel", sets: "4×6" },
    ],
  },
};

const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const CATS = [
  { id: "free", label: "Frei", icon: "🤸", desc: "Nur Bodyweight" },
  { id: "equipment", label: "Equipment", icon: "🏋️", desc: "Hanteln & Bänder" },
  { id: "gym", label: "Gym", icon: "🏟️", desc: "Maschinen & Kabel" },
];export default function App() {
  const [tab, setTab] = useState("exercises");
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedCat, setSelectedCat] = useState("free");
  const [selectedDay, setSelectedDay] = useState("Mo");
  const [plan, setPlan] = useState({ Mo: [], Di: [], Mi: [], Do: [], Fr: [], Sa: [], So: [] });
  const [flash, setFlash] = useState(null);

  const addToPlan = (exercise, muscle) => {
    const key = `${muscle.id}-${exercise.name}`;
    if (plan[selectedDay].find(e => e.key === key)) return;
    setPlan(p => ({ ...p, [selectedDay]: [...p[selectedDay], { ...exercise, key, muscleId: muscle.id, muscleName: muscle.name, muscleColor: muscle.color, muscleIcon: muscle.icon, category: selectedCat }] }));
    setFlash(key);
    setTimeout(() => setFlash(null), 800);
  };

  const removeFromPlan = (day, key) => {
    setPlan(p => ({ ...p, [day]: p[day].filter(e => e.key !== key) }));
  };

  const totalCount = Object.values(plan).flat().length;

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", minHeight: "100vh", background: "#f5f3ef", color: "#1c1c1c", maxWidth: 430, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:0}
        button{font-family:'Sora',sans-serif;cursor:pointer}
        input{font-family:'Sora',sans-serif}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
        .fadein{animation:fadeUp .3s ease both}
        .popping{animation:pop .35s ease}
        .muscle-pill:hover{filter:brightness(.93);transform:translateY(-1px)}
        .muscle-pill{transition:all .15s ease}
        .ex-row:hover .add-circle{opacity:1!important}
        .add-circle{transition:all .15s ease}
        .day-tab:hover{opacity:.75}
        .day-tab{transition:opacity .1s}
      `}</style>

      {/* INSTAGRAM BANNER */}
      <div style={{ textAlign: 'center', padding: '24px 20px 16px', background: '#fff', borderBottom: '1px solid #f0ede8' }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: '#1c1c1c', marginBottom: 12 }}>Cateno Athletics</h2>
        <img src="/instagram-qr.png" alt="Instagram QR Code" style={{ width: '140px', height: '140px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginBottom: 12 }} />
        <div>
          <a href="https://www.instagram.com/cateno_athletics?igsh=MXEzaXZtN2l1d29vNw=="
             target="_blank"
             rel="noopener noreferrer"
             style={{ display: 'inline-block', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#fff', padding: '10px 22px', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: 13 }}>
            @cateno_athletics auf Instagram
          </a>
        </div>
      </div>

      {/* TOP BAR */}
      <div style={{ background: "#fff", padding: "20px 22px 0", borderBottom: "1px solid #ece9e3" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#b0a898", fontWeight: 600, marginBottom: 4 }}>Deine</p>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, lineHeight: 1, color: "#1c1c1c" }}>Fitness<br /><em style={{ fontStyle: "italic", fontWeight: 300 }}>App</em></h1>
          </div>
          {totalCount > 0 && (
            <div style={{ background: "#1c1c1c", color: "#fff", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 700, marginTop: 4 }}>
              {totalCount} im Plan
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 0 }}>
          {[["exercises", "Übungen"], ["plan", "Wochenplan"]].map(([t, l]) => (
            <button key={t} className="day-tab" onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px 0", background: "none", border: "none",
              borderBottom: tab === t ? "2.5px solid #1c1c1c" : "2.5px solid transparent",
              fontWeight: tab === t ? 700 : 400, fontSize: 14,
              color: tab === t ? "#1c1c1c" : "#a0988e",
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 22px 110px", overflowY: "auto", maxHeight: "calc(100vh - 280px)" }}>
        {tab === "exercises" && (
          <div className="fadein">
            <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCat(cat.id)} style={{
                  flex: 1, padding: "10px 4px", borderRadius: 14, border: "none",
                  background: selectedCat === cat.id ? "#1c1c1c" : "#fff",
                  color: selectedCat === cat.id ? "#fff" : "#888",
                  fontSize: 12, fontWeight: 700,
                  boxShadow: selectedCat === cat.id ? "0 4px 16px rgba(0,0,0,.18)" : "0 1px 4px rgba(0,0,0,.06)",
                  transition: "all .15s ease",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{cat.icon}</div>
                  <div>{cat.label}</div>
                  <div style={{ fontSize: 10, opacity: .6, fontWeight: 400, marginTop: 1 }}>{cat.desc}</div>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, background: "#fff", padding: "10px 14px", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              <span style={{ fontSize: 12, color: "#a0988e", fontWeight: 500, marginRight: 4 }}>→</span>
              {DAYS.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)} style={{
                  flex: 1, padding: "5px 0", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 700,
                  background: selectedDay === d ? "#1c1c1c" : "transparent",
                  color: selectedDay === d ? "#fff" : "#aaa",
                  transition: "all .12s ease",
                }}>{d}</button>
              ))}
            </div>
            {!selectedMuscle ? (
              <div>
                <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#b0a898", fontWeight: 600, marginBottom: 14 }}>Muskelgruppe wählen</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {MUSCLES.map((m, i) => (
                    <button key={m.id} className="muscle-pill fadein" onClick={() => setSelectedMuscle(m)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                        background: "#fff", borderRadius: 16, border: "none", textAlign: "left",
                        boxShadow: "0 2px 8px rgba(0,0,0,.05)", animationDelay: `${i * 0.04}s`,
                      }}>
                      <div style={{ width: 46, height: 46, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: m.color + "18", flexShrink: 0 }}>{m.icon}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 15 }}>{m.name}</p>
                        <p style={{ fontSize: 11, color: "#b0a898", marginTop: 2, fontStyle: "italic" }}>{m.latin}</p>
                      </div>
                      <span style={{ color: "#ccc", fontSize: 18 }}>›</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="fadein">
                <button onClick={() => setSelectedMuscle(null)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888", marginBottom: 16, padding: 0, fontWeight: 600 }}>‹ Zurück</button>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 15, background: selectedMuscle.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{selectedMuscle.icon}</div>
                  <div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600 }}>{selectedMuscle.name}</h2>
                    <p style={{ fontSize: 11, color: "#b0a898", fontStyle: "italic" }}>{selectedMuscle.latin}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {EXERCISES[selectedMuscle.id][selectedCat].map((ex, i) => {
                    const key = `${selectedMuscle.id}-${ex.name}`;
                    const added = plan[selectedDay].find(e => e.key === key);
                    return (
                      <div key={i} className="ex-row fadein" style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", borderRadius: 16, padding: "16px", boxShadow: "0 2px 10px rgba(0,0,0,.05)", opacity: added ? .5 : 1 }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, fontSize: 15 }}>{ex.name}</p>
                          <p style={{ fontSize: 12, color: "#a0988e", marginTop: 3 }}>{ex.desc}</p>
                          <div style={{ marginTop: 8, display: "inline-block", background: selectedMuscle.color + "18", color: selectedMuscle.color, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{ex.sets}</div>
                        </div>
                        <button className={`add-circle ${flash === key ? "popping" : ""}`}
                          onClick={() => addToPlan(ex, selectedMuscle)}
                          disabled={!!added}
                          style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: added ? "#f0ede8" : selectedMuscle.color, color: added ? "#ccc" : "#fff", fontSize: 22, fontWeight: 300, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {added ? "✓" : "+"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "plan" && (
          <div className="fadein">
            <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
              {DAYS.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)} style={{
                  flex: 1, padding: "10px 0", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 700,
                  background: selectedDay === d ? "#1c1c1c" : "#fff",
                  color: selectedDay === d ? "#fff" : "#aaa",
                  boxShadow: selectedDay === d ? "0 4px 14px rgba(0,0,0,.2)" : "0 1px 4px rgba(0,0,0,.06)",
                  transition: "all .12s ease",
                }}>
                  {d}
                  {plan[d].length > 0 && <div style={{ width: 5, height: 5, borderRadius: "50%", background: selectedDay === d ? "#ffffff80" : "#e85d3a", margin: "3px auto 0" }} />}
                </button>
              ))}
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              {selectedDay === "Mo" ? "Montag" : selectedDay === "Di" ? "Dienstag" : selectedDay === "Mi" ? "Mittwoch" : selectedDay === "Do" ? "Donnerstag" : selectedDay === "Fr" ? "Freitag" : selectedDay === "Sa" ? "Samstag" : "Sonntag"}
            </h2>
            <p style={{ fontSize: 13, color: "#b0a898", marginBottom: 20 }}>
              {plan[selectedDay].length === 0 ? "Noch leer — geh zu Übungen" : `${plan[selectedDay].length} Übung${plan[selectedDay].length > 1 ? "en" : ""} geplant`}
            </p>
            {plan[selectedDay].length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 18, padding: "48px 24px", textAlign: "center", border: "1.5px dashed #e0dbd3" }}>
                <div style={{ fontSize: 44, marginBottom: 14 }}>📋</div>
                <p style={{ fontSize: 14, color: "#c0b8ae", lineHeight: 1.7 }}>Geh zu <strong style={{ color: "#1c1c1c" }}>Übungen</strong>,<br />wähle eine Muskelgruppe und<br />füge Übungen zum Tag hinzu.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan[selectedDay].map((ex, i) => (
                  <div key={ex.key} className="fadein" style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: ex.muscleColor + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ex.muscleIcon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, fontSize: 14 }}>{ex.name}</p>
                      <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
                        <span style={{ fontSize: 11, background: ex.muscleColor + "18", color: ex.muscleColor, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{ex.muscleName}</span>
                        <span style={{ fontSize: 11, color: "#c0b8ae" }}>{ex.category === "free" ? "🤸" : ex.category === "equipment" ? "🏋️" : "🏟️"} {ex.sets}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromPlan(selectedDay, ex.key)} style={{ background: "none", border: "none", fontSize: 16, color: "#d0c8be", padding: "4px 6px" }}>✕</button>
                  </div>
                ))}
              </div>
            )}
            {totalCount > 0 && (
              <div style={{ marginTop: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#b0a898", fontWeight: 600, marginBottom: 12 }}>Woche im Überblick</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {DAYS.map(d => (
                    <div key={d} onClick={() => setSelectedDay(d)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fff", borderRadius: 12, cursor: "pointer", border: selectedDay === d ? "1.5px solid #1c1c1c" : "1.5px solid transparent" }}>
                      <span style={{ fontWeight: 800, fontSize: 12, width: 22, color: plan[d].length ? "#1c1c1c" : "#d0c8be" }}>{d}</span>
                      {plan[d].length === 0
                        ? <span style={{ fontSize: 12, color: "#d0c8be" }}>Ruhetag</span>
                        : <div style={{ flex: 1, display: "flex", gap: 5, flexWrap: "wrap" }}>
                          {plan[d].map(ex => (
                            <span key={ex.key} style={{ fontSize: 13, background: ex.muscleColor + "20", padding: "2px 6px", borderRadius: 6 }}>{ex.muscleIcon}</span>
                          ))}
                        </div>}
                      {plan[d].length > 0 && <span style={{ fontSize: 11, color: "#b0a898", fontWeight: 700 }}>{plan[d].length}×</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
                          }
