import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronRight, Clock3, GraduationCap, MapPin, Menu, MessageCircle, Phone, Scissors, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/beauty-bar-logo.jpg.asset.json";
import salonAsset from "@/assets/beauty-bar-salon-interior.jpg.asset.json";

const phone = "+919625505613";
const mapsUrl = "https://maps.app.goo.gl/E6buGavAMGP13usP7";
const address = "3, X Block, Plot No., Opposite Vishal Mega Mart, New Roshanpura, Najafgarh, Delhi – 110043";
const nav = ["About", "Services", "Academy", "Gallery", "Contact"];
const serviceGroups = {
  Hair: ["Haircut", "Hair Styling", "Hair Wash", "Hair Spa", "Hair Treatment", "Hair Coloring"],
  Beauty: ["Facial", "Skin Care", "Beauty Services", "Makeup"],
  Grooming: ["Men's Grooming", "Beard Styling", "Styling & Grooming"],
};
const bookingServices = ["Hair", "Beauty", "Grooming", "Makeup", "Academy / Course Enquiry", "Other"];
const times = ["10:00 AM", "11:30 AM", "1:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Beauty Bar Salon & Academy | Salon in Najafgarh, Delhi" },
      { name: "description", content: "The Beauty Bar Salon & Academy in New Roshanpura, Najafgarh, Delhi offers salon, beauty, grooming and academy services. Book on WhatsApp." },
      { property: "og:title", content: "The Beauty Bar Salon & Academy | Najafgarh" },
      { property: "og:description", content: "Salon artistry, beauty and professional learning under one roof in Najafgarh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [serviceTab, setServiceTab] = useState<keyof typeof serviceGroups>("Hair");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const startBooking = (service?: string) => {
    setMenuOpen(false); setBookingOpen(true);
    window.setTimeout(() => window.dispatchEvent(new CustomEvent("booking-service", { detail: service })), 0);
  };

  return <main className="bg-background text-foreground">
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-background/95 text-foreground shadow-lg backdrop-blur-md" : "text-primary-foreground"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="The Beauty Bar home">
          <img src={logoAsset.url} alt="" className="h-12 w-12 rounded-full border border-champagne/60 object-cover" />
          <span className="hidden text-xs font-semibold uppercase leading-relaxed sm:block">The Beauty Bar<br/><span className="font-normal">Salon & Academy</span></span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold uppercase transition-opacity hover:opacity-60">{item}</a>)}
          <Button variant={scrolled ? "luxury" : "champagne"} onClick={() => startBooking()}>Book now</Button>
        </nav>
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="lg:hidden"><Menu /></Button>
      </div>
    </header>

    {menuOpen && <div className="fixed inset-0 z-50 flex flex-col bg-espresso p-6 text-primary-foreground lg:hidden">
      <div className="flex items-center justify-between"><span className="font-display text-2xl">The Beauty Bar</span><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button></div>
      <nav className="my-auto flex flex-col gap-5">{nav.map((item, i) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="font-display text-5xl"><span className="mr-4 font-sans text-xs text-champagne">0{i+1}</span>{item}</a>)}</nav>
      <Button variant="champagne" size="lg" onClick={() => startBooking()}>Book an appointment</Button>
    </div>}

    <section id="home" className="relative min-h-[92svh] overflow-hidden bg-espresso text-primary-foreground">
      <img src={salonAsset.url} alt="The Beauty Bar salon interior with illuminated mirrors and styling chairs" className="hero-image absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-espresso/65 lg:bg-espresso/50" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--espresso),transparent_72%)] opacity-80" />
      <div className="hero-copy relative mx-auto flex min-h-[92svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-36 lg:px-8 lg:pb-32">
        <p className="editorial-rule mb-5 text-xs font-semibold uppercase text-champagne">Salon & Academy · Najafgarh</p>
        <h1 className="max-w-4xl text-6xl font-medium leading-[0.9] sm:text-7xl lg:text-8xl">Where Beauty Becomes <em className="font-normal text-champagne">Your Signature.</em></h1>
        <p className="mt-7 max-w-lg text-sm leading-7 text-primary-foreground/80 sm:text-base">Salon artistry, beauty and professional learning — all under one roof in Najafgarh.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button variant="champagne" size="lg" onClick={() => startBooking()}>Book an appointment <ArrowRight /></Button><Button variant="glass" size="lg" asChild><a href="https://wa.me/919625505613?text=Hello%20The%20Beauty%20Bar%20Salon%20%26%20Academy%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp us</a></Button></div>
      </div>
      <a href="#about" className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase text-primary-foreground/70">Scroll to discover <ArrowDown className="h-4 w-4"/></a>
    </section>

    <section id="about" className="relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div className="relative min-h-[420px] lg:min-h-[620px]">
          <img src={salonAsset.url} alt="Styling stations inside The Beauty Bar" className="absolute left-0 top-0 h-[82%] w-[82%] object-cover shadow-2xl" />
          <img src={logoAsset.url} alt="The Beauty Bar Salon and Academy logo" className="absolute bottom-0 right-0 aspect-square w-[46%] rounded-full border-[10px] border-background object-cover shadow-2xl" />
          <span className="absolute -right-2 top-8 font-display text-8xl text-champagne/40">B</span>
        </div>
        <div className="flex flex-col justify-center lg:pl-10">
          <p className="editorial-rule text-xs font-semibold uppercase text-wine">Our story</p>
          <h2 className="mt-5 text-6xl leading-none sm:text-7xl">More Than<br/>A Salon.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">A space created for beauty, confidence, creativity and professional learning.</p>
          <p className="mt-5 max-w-xl leading-7 text-muted-foreground">The Beauty Bar brings salon services and beauty learning together in a modern local space—whether you are here for your next look or to explore a professional skill.</p>
          <div className="mt-9 flex items-center gap-5 border-t border-border pt-7"><Sparkles className="h-8 w-8 text-champagne"/><p className="text-sm uppercase leading-6">Beauty services<br/>and learning opportunities</p></div>
        </div>
      </div>
    </section>

    <section id="services" className="bg-espresso py-24 text-primary-foreground lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-8 border-b border-primary-foreground/20 pb-10 lg:grid-cols-2"><div><p className="editorial-rule text-xs font-semibold uppercase text-champagne">The salon menu</p><h2 className="mt-5 text-6xl leading-none">Designed around<br/><em className="text-champagne">your look.</em></h2></div><p className="self-end text-sm leading-7 text-primary-foreground/65 lg:max-w-md lg:justify-self-end">Choose a category to explore our service menu. Contact the salon for current options and pricing.</p></div>
        <div className="grid lg:grid-cols-[.36fr_.64fr]">
          <div className="border-b border-primary-foreground/20 py-8 lg:border-b-0 lg:border-r lg:pr-10">
            {(Object.keys(serviceGroups) as Array<keyof typeof serviceGroups>).map((group, i) => <Button key={group} variant="ghost" onClick={() => setServiceTab(group)} className={`flex h-auto w-full justify-between rounded-none border-b border-primary-foreground/15 px-0 py-5 font-display text-3xl ${serviceTab === group ? "text-champagne" : "text-primary-foreground/50"}`}><span><small className="mr-4 font-sans text-[10px]">0{i+1}</small>{group}</span><ChevronRight/></Button>)}
          </div>
          <div className="py-8 lg:pl-14 lg:py-12"><p className="mb-6 text-xs uppercase text-champagne">{serviceTab} services</p><div className="grid sm:grid-cols-2">{serviceGroups[serviceTab].map((service, i) => <button key={service} onClick={() => startBooking(serviceTab)} className="group flex min-h-20 items-center justify-between border-b border-primary-foreground/15 py-4 text-left transition-colors hover:text-champagne"><span className="font-display text-2xl">{service}</span><span className="text-xs text-primary-foreground/40">{String(i+1).padStart(2,"0")}</span></button>)}</div><Button variant="champagne" className="mt-9" onClick={() => startBooking(serviceTab)}>Book {serviceTab}<ArrowRight/></Button></div>
        </div>
      </div>
    </section>

    <section id="academy" className="relative overflow-hidden bg-rose/15 py-24 lg:py-36">
      <div className="absolute -right-10 top-0 font-display text-[18rem] leading-none text-wine/5">A</div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div><div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-wine/30"><GraduationCap className="text-wine"/></div><p className="editorial-rule mt-10 text-xs font-semibold uppercase text-wine">The Beauty Bar Academy</p><h2 className="mt-5 text-6xl leading-[.95] sm:text-7xl">Turn Your Passion for Beauty Into a Skill.</h2><p className="mt-7 max-w-lg leading-7 text-muted-foreground">Explore practical learning in salon artistry. Course details, schedules and fees are available directly from the academy.</p><Button variant="luxury" size="lg" className="mt-8" onClick={() => startBooking("Academy / Course Enquiry")}>Enquire about courses<ArrowRight/></Button></div>
        <div className="self-center border-y border-wine/20">{["Hair Styling", "Hair Cutting", "Hair Coloring", "Makeup", "Beauty & Skin Care", "Professional Salon Skills"].map((course, i) => <div key={course} className="flex items-center justify-between border-b border-wine/15 py-5 last:border-b-0"><span className="font-display text-2xl sm:text-3xl">{course}</span><span className="text-xs text-wine/50">0{i+1}</span></div>)}</div>
      </div>
    </section>

    <section id="gallery" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-10 flex items-end justify-between"><div><p className="editorial-rule text-xs font-semibold uppercase text-wine">Inside the space</p><h2 className="mt-4 text-6xl">A polished setting.</h2></div><p className="hidden max-w-xs text-sm text-muted-foreground md:block">Real photographs of The Beauty Bar Salon & Academy.</p></div>
        <button onClick={() => setGalleryOpen(true)} className="group relative block h-[58vh] min-h-[440px] w-full overflow-hidden text-left"><img src={salonAsset.url} alt="View The Beauty Bar salon gallery" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-espresso/15"/><span className="absolute bottom-6 right-6 flex h-24 w-24 items-center justify-center rounded-full bg-background font-display text-lg text-foreground shadow-xl">View<br/>image</span></button>
      </div>
    </section>

    <section className="bg-muted py-20 lg:py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="editorial-rule text-xs font-semibold uppercase text-wine">Why The Beauty Bar</p><div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">{[["Unisex Beauty","Beauty and grooming for different needs."],["Personalized Experience","Services shaped around your desired look."],["Salon + Academy","Beauty services combined with learning opportunities."],["Local & Convenient","Located in New Roshanpura, Najafgarh."]].map(([title,copy],i)=><div key={title} className="bg-muted p-7 lg:p-9"><span className="text-xs text-wine">0{i+1}</span><h3 className="mt-14 text-3xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div></section>

    <section id="contact" className="grid bg-espresso text-primary-foreground lg:grid-cols-2">
      <div className="relative min-h-[480px]"><img src={salonAsset.url} alt="The Beauty Bar salon in New Roshanpura" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-espresso/35"/><div className="absolute bottom-7 left-7 bg-background p-5 text-foreground shadow-xl"><MapPin className="mb-3 text-wine"/><p className="max-w-xs text-sm leading-6">Opposite Vishal Mega Mart<br/>New Roshanpura, Najafgarh</p></div></div>
      <div className="flex flex-col justify-center p-8 py-20 sm:p-14 lg:p-20"><p className="editorial-rule text-xs font-semibold uppercase text-champagne">Visit us</p><h2 className="mt-5 text-6xl leading-none">Ready For<br/>Your Next Look?</h2><p className="mt-6 max-w-md leading-7 text-primary-foreground/65">Book your visit or speak with The Beauty Bar Salon & Academy today.</p><p className="mt-8 max-w-md text-sm leading-7">{address}</p><a href={`tel:${phone}`} className="mt-2 font-display text-3xl text-champagne">+91 96255 05613</a><div className="mt-9 flex flex-wrap gap-3"><Button variant="champagne" onClick={() => startBooking()}>Book appointment</Button><Button variant="glass" asChild><a href={mapsUrl} target="_blank" rel="noreferrer"><MapPin/>Get directions</a></Button></div></div>
    </section>

    <footer className="bg-background px-5 pb-28 pt-14 lg:px-8 lg:pb-12"><div className="mx-auto flex max-w-7xl flex-col gap-9 md:flex-row md:items-end md:justify-between"><div className="flex items-center gap-4"><img src={logoAsset.url} alt="The Beauty Bar logo" className="h-20 w-20 rounded-full object-cover"/><div><p className="font-display text-3xl">The Beauty Bar</p><p className="text-[10px] uppercase">Salon & Academy · Najafgarh</p></div></div><div className="flex flex-wrap gap-5 text-xs uppercase">{nav.map(item=><a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}<a href={mapsUrl} target="_blank" rel="noreferrer">Google Profile</a></div><p className="text-xs text-muted-foreground">© 2026 The Beauty Bar</p></div></footer>

    <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 gap-1 bg-background p-1 shadow-2xl lg:hidden"><Button variant="ghost" asChild><a href={`tel:${phone}`}><Phone/>Call</a></Button><Button variant="ghost" asChild><a href="https://wa.me/919625505613" target="_blank" rel="noreferrer"><MessageCircle/>WhatsApp</a></Button><Button variant="luxury" onClick={() => startBooking()}><CalendarDays/>Book</Button></div>
    {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)}/>} 
    {galleryOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/95 p-4" role="dialog" aria-modal="true" aria-label="Salon gallery"><Button variant="glass" size="icon" onClick={() => setGalleryOpen(false)} className="absolute right-5 top-5" aria-label="Close gallery"><X/></Button><img src={salonAsset.url} alt="The Beauty Bar interior" className="max-h-[85vh] max-w-full object-contain"/></div>}
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":["BeautySalon","LocalBusiness"],name:"The Beauty Bar Salon & Academy",telephone:"+91 9625505613",address:{"@type":"PostalAddress",streetAddress:"3, X Block, Plot No., Opposite Vishal Mega Mart, New Roshanpura",addressLocality:"Najafgarh",addressRegion:"Delhi",postalCode:"110043",addressCountry:"IN"},sameAs:[mapsUrl]})}} />
  </main>;
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => { const handler = (event: Event) => { const value=(event as CustomEvent<string>).detail; if(value){setService(value); setStep(2);} }; window.addEventListener("booking-service",handler); return()=>window.removeEventListener("booking-service",handler); },[]);
  const minDate = useMemo(() => new Date().toISOString().slice(0,10), []);
  const ready = step===1 ? !!service : step===2 ? !!date : step===3 ? !!time : step===4 ? !!name && !!contact : true;
  const whatsAppText = encodeURIComponent(`Hello The Beauty Bar Salon & Academy, I would like to request an appointment.\n\nName: ${name}\nService: ${service}\nDate: ${date}\nTime: ${time}\nContact: ${contact}${message ? `\nRequest: ${message}` : ""}`);
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/70 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="booking-title"><div className="max-h-[94svh] w-full max-w-3xl overflow-y-auto bg-background shadow-2xl sm:max-h-[90vh]">
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-5 py-4 sm:px-8"><div><p className="text-[10px] font-semibold uppercase text-wine">Appointment request · Step {step} of 5</p><div className="mt-2 flex gap-1">{[1,2,3,4,5].map(n=><span key={n} className={`h-1 w-8 ${n<=step?"bg-wine":"bg-muted"}`}/>)}</div></div><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close booking"><X/></Button></div>
    <div className="min-h-[410px] p-5 sm:p-9">
      {step===1&&<><p className="editorial-rule text-xs uppercase text-wine">Choose a category</p><h2 id="booking-title" className="mt-3 text-5xl">What brings you in?</h2><div className="mt-8 grid gap-2 sm:grid-cols-2">{bookingServices.map(item=><Button key={item} variant={service===item?"luxury":"outline"} onClick={()=>setService(item)} className="h-14 justify-between rounded-none">{item}<ChevronRight/></Button>)}</div></>}
      {step===2&&<><p className="editorial-rule text-xs uppercase text-wine">Choose a date</p><h2 className="mt-3 text-5xl">When would you like to visit?</h2><p className="mt-4 text-sm text-muted-foreground">This is a preferred date, not a real-time availability confirmation.</p><label className="mt-10 block text-xs font-semibold uppercase">Preferred date<input type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)} className="mt-3 h-14 w-full border border-input bg-background px-4 text-lg outline-none focus:ring-2 focus:ring-ring"/></label></>}
      {step===3&&<><p className="editorial-rule text-xs uppercase text-wine">Choose a time</p><h2 className="mt-3 text-5xl">What time suits you?</h2><p className="mt-4 text-sm text-muted-foreground">The salon will confirm your requested time directly.</p><div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">{times.map(item=><Button key={item} variant={time===item?"luxury":"outline"} onClick={()=>setTime(item)} className="h-14 rounded-none"><Clock3/>{item}</Button>)}</div></>}
      {step===4&&<><p className="editorial-rule text-xs uppercase text-wine">Your details</p><h2 className="mt-3 text-5xl">Almost there.</h2><div className="mt-8 grid gap-4"><label className="text-xs font-semibold uppercase">Full name<input value={name} onChange={e=>setName(e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base normal-case outline-none focus:ring-2 focus:ring-ring"/></label><label className="text-xs font-semibold uppercase">Phone / WhatsApp<input type="tel" value={contact} onChange={e=>setContact(e.target.value)} className="mt-2 h-12 w-full border border-input bg-background px-4 text-base normal-case outline-none focus:ring-2 focus:ring-ring"/></label><label className="text-xs font-semibold uppercase">Special request<textarea value={message} onChange={e=>setMessage(e.target.value)} rows={3} className="mt-2 w-full border border-input bg-background p-4 text-base normal-case outline-none focus:ring-2 focus:ring-ring"/></label></div></>}
      {step===5&&<div className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wine text-primary-foreground"><Check/></div><h2 className="mt-6 text-5xl">Your Appointment Request Is Ready!</h2><div className="mx-auto mt-7 max-w-md border-y border-border py-5 text-left text-sm leading-8"><p><b>Name:</b> {name}</p><p><b>Service:</b> {service}</p><p><b>Date:</b> {date}</p><p><b>Time:</b> {time}</p><p><b>Contact:</b> {contact}</p></div><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button variant="luxury" size="lg" asChild><a href={`https://wa.me/919625505613?text=${whatsAppText}`} target="_blank" rel="noreferrer"><MessageCircle/>Confirm via WhatsApp</a></Button><Button variant="outline" size="lg" asChild><a href={`tel:${phone}`}><Phone/>Call salon</a></Button></div></div>}
    </div>
    {step<5&&<div className="sticky bottom-0 flex justify-between border-t border-border bg-background px-5 py-4 sm:px-9"><Button variant="ghost" onClick={()=>setStep(v=>Math.max(1,v-1))} disabled={step===1}><ArrowLeft/>Back</Button><Button variant="luxury" onClick={()=>setStep(v=>Math.min(5,v+1))} disabled={!ready}>Continue<ArrowRight/></Button></div>}
  </div></div>;
}
