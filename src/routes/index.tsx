import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers,
  Wallet,
  LineChart,
  Menu,
} from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/exora-logo.jpg.asset.json";
import heroGlass from "@/assets/hero-glass.jpg";
import { GlassButton } from "@/components/site/GlassButton";
import { MiniChart } from "@/components/site/MiniChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Exora — Crypto Trading Terminal" },
      {
        name: "description",
        content:
          "Trade 300+ crypto markets on Exora: real-time charts, deep liquidity, 0.02% fees and a liquid-glass trading terminal.",
      },
      { property: "og:title", content: "Exora — Crypto Trading Terminal" },
      {
        property: "og:description",
        content:
          "Real-time charts, deep liquidity and a liquid-glass trading terminal for 300+ crypto markets.",
      },
    ],
  }),
  component: Index,
});

const markets = [
  { pair: "BTC / USDT", price: "68 412.20", change: "+3.42%", up: true, points: [4, 6, 5, 8, 7, 10, 9, 13, 12, 16] },
  { pair: "ETH / USDT", price: "3 584.90", change: "+1.86%", up: true, points: [8, 7, 9, 8, 11, 10, 12, 11, 14, 15] },
  { pair: "SOL / USDT", price: "182.44", change: "-0.94%", up: false, points: [14, 15, 13, 14, 11, 12, 10, 11, 9, 8] },
  { pair: "TON / USDT", price: "7.28", change: "+5.11%", up: true, points: [3, 5, 4, 7, 9, 8, 12, 14, 13, 17] },
  { pair: "XRP / USDT", price: "0.6142", change: "+0.72%", up: true, points: [9, 9, 10, 9, 11, 10, 11, 12, 11, 13] },
];

const ticker = [
  "BTC 68 412.20 +3.42%",
  "ETH 3 584.90 +1.86%",
  "SOL 182.44 -0.94%",
  "TON 7.28 +5.11%",
  "BNB 604.10 +0.38%",
  "AVAX 34.72 +2.15%",
  "XRP 0.6142 +0.72%",
  "ADA 0.4488 -1.20%",
];

const features = [
  {
    icon: Zap,
    title: "8 ms matching engine",
    body: "Orders fill before the candle closes. Colocated engines across three regions.",
  },
  {
    icon: ShieldCheck,
    title: "Segregated custody",
    body: "Cold-storage reserves with monthly proof-of-reserve attestation.",
  },
  {
    icon: Layers,
    title: "Unified margin",
    body: "Spot, perps and earn positions share one collateral pool.",
  },
  {
    icon: LineChart,
    title: "Pro charting",
    body: "120+ indicators, multi-chart layouts and replay mode built in.",
  },
];

const steps = [
  { n: "01", t: "Create account", d: "Email or wallet. Verification in under two minutes." },
  { n: "02", t: "Fund balance", d: "Card, bank transfer or on-chain deposit in 40+ assets." },
  { n: "03", t: "Start trading", d: "Spot and perpetuals with up to 50x on the same balance." },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Markets", "Platform", "Fees", "Docs"];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-3xl px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Exora"
            width={112}
            height={28}
            className="h-6 w-auto mix-blend-screen sm:h-7"
          />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#markets"
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <GlassButton variant="ghost" size="sm">
            Log in
          </GlassButton>
          <GlassButton variant="lime" size="sm">
            Open app
          </GlassButton>
        </div>

        <GlassButton
          variant="ghost"
          size="sm"
          className="md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="size-5" />
        </GlassButton>
      </nav>

      {open ? (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-3 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l}
                href="#markets"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l}
              </a>
            ))}
            <GlassButton variant="lime" size="md" className="mt-2 w-full">
              Open app
            </GlassButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-16 sm:px-6 sm:pt-40 lg:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Pilot release · v0.9
          </span>

          <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
            Trade crypto on a
            <span className="text-lime-gradient"> liquid glass</span> terminal.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Exora brings spot, perpetuals and earn into one interface — with
            institutional depth, 0.02% maker fees and charts that never lag.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <GlassButton variant="lime" size="lg">
              Start trading
              <ArrowUpRight className="size-5" />
            </GlassButton>
            <GlassButton variant="glass" size="lg">
              View live markets
            </GlassButton>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-3">
            {[
              ["$4.2B", "24h volume"],
              ["320+", "Markets"],
              ["1.4M", "Traders"],
            ].map(([v, k]) => (
              <div key={k} className="glass rounded-2xl px-4 py-4">
                <dt className="font-display text-xl font-bold sm:text-2xl">{v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <img
            src={heroGlass}
            alt="Exora trading terminal rendered as floating glass panels"
            width={1280}
            height={1280}
            className="animate-float mix-blend-screen mx-auto w-full max-w-md drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
          />
          <div className="glass absolute -bottom-2 left-0 w-56 rounded-3xl p-4 sm:left-4">
            <p className="text-xs text-muted-foreground">Portfolio</p>
            <p className="font-display mt-1 text-2xl font-bold">$128 940</p>
            <p className="mt-1 text-xs text-primary">+12.8% this week</p>
            <MiniChart
              points={[4, 6, 5, 9, 8, 12, 11, 15]}
              className="mt-3 h-10 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="glass-soft relative overflow-hidden border-x-0 py-3">
      <div className="animate-marquee flex w-max gap-10 pr-10">
        {[...ticker, ...ticker].map((t, i) => (
          <span
            key={i}
            className="font-mono text-xs whitespace-nowrap text-muted-foreground"
          >
            <span className="text-foreground">{t.split(" ")[0]}</span>{" "}
            {t.split(" ").slice(1).join(" ")}
          </span>
        ))}
      </div>
    </div>
  );
}

function Markets() {
  return (
    <section id="markets" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Live markets</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prices shown are sample data for this pilot build.
            </p>
          </div>
          <div className="glass-soft flex rounded-full p-1">
            {["Spot", "Perps", "Earn"].map((t, i) => (
              <button
                key={t}
                className={
                  i === 0
                    ? "rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                    : "rounded-full px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass mt-8 overflow-hidden rounded-3xl">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] gap-4 border-b border-white/10 px-6 py-4 text-xs text-muted-foreground sm:grid">
            <span>Market</span>
            <span className="text-right">Price</span>
            <span className="text-right">24h</span>
            <span className="text-right">Chart</span>
            <span className="w-20" />
          </div>

          {markets.map((m) => (
            <div
              key={m.pair}
              className="grid grid-cols-2 items-center gap-4 border-b border-white/5 px-4 py-4 transition-colors last:border-0 hover:bg-white/5 sm:grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] sm:px-6"
            >
              <div className="flex items-center gap-3">
                <span className="glass-soft grid size-9 place-items-center rounded-full text-xs font-semibold text-primary">
                  {m.pair.slice(0, 1)}
                </span>
                <span className="text-sm font-semibold">{m.pair}</span>
              </div>
              <span className="text-right font-mono text-sm sm:text-right">
                {m.price}
              </span>
              <span
                className={`text-right font-mono text-xs sm:text-sm ${m.up ? "text-primary" : "text-destructive"}`}
              >
                {m.change}
              </span>
              <MiniChart
                points={m.points}
                up={m.up}
                className="hidden h-8 w-full sm:block"
              />
              <GlassButton size="sm" className="hidden w-20 sm:inline-flex">
                Trade
              </GlassButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="platform" className="relative px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto size-96 rounded-full bg-primary/10 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          Built for traders who watch the tape.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article
              key={f.title}
              className="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="glass-soft grid size-11 place-items-center rounded-2xl text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="glass rounded-3xl p-6">
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <div className="glass glow-lime mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12 lg:py-20">
        <span className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
          <Wallet className="size-3.5 text-primary" />
          No deposit fees during the pilot
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold sm:text-5xl">
          Your next position is one tap away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
          Join the Exora pilot and trade the full market list with zero maker
          fees for the first 90 days.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <GlassButton variant="lime" size="lg">
            Create account
          </GlassButton>
          <GlassButton size="lg">Talk to sales</GlassButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <img
          src={logoAsset.url}
          alt="Exora"
          width={96}
          height={24}
          loading="lazy"
          className="h-6 w-auto mix-blend-screen"
        />
        <p className="text-xs text-muted-foreground">
          © 2026 Exora. Pilot build — sample market data.
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#markets" className="hover:text-foreground">
            Terms
          </a>
          <a href="#markets" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#markets" className="hover:text-foreground">
            Status
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Markets />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
