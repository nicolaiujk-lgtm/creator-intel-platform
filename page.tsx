"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Bookmark,
  CalendarDays,
  ChevronRight,
  Filter,
  Gamepad2,
  Globe2,
  History,
  Languages,
  LayoutDashboard,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tags,
  TrendingUp,
  Wand2
} from "lucide-react";
import { useMemo, useState } from "react";

type Creator = {
  name: string;
  handle: string;
  platform: "YouTube";
  flag: string;
  region: string;
  language: string;
  followers: string;
  avgViews: string;
  engagement: string;
  tags: string[];
  lastUpload: string;
  score: number;
  description: string;
  trend: number[];
  overlap: number;
  audience: string;
};

const navItems = [
  { label: "数据看板", icon: LayoutDashboard, active: true },
  { label: "博主检索", icon: Search },
  { label: "相似博主", icon: Sparkles },
  { label: "已收藏博主", icon: Bookmark },
  { label: "合作记录", icon: History },
  { label: "设置", icon: Settings }
];

const creators: Creator[] = [
  {
    name: "LunaPlay BR",
    handle: "@lunaplaybr",
    platform: "YouTube",
    flag: "🇧🇷",
    region: "巴西",
    language: "葡萄牙语",
    followers: "2.8M",
    avgViews: "684K",
    engagement: "7.9%",
    tags: ["Roblox", "沙盒", "移动游戏"],
    lastUpload: "3小时前",
    score: 94,
    description: "高增长 Roblox YouTube 博主，在巴西与葡语市场拥有高密度青少年受众。",
    trend: [42, 54, 49, 68, 74, 83],
    overlap: 78,
    audience: "13-20"
  },
  {
    name: "Mika Quest",
    handle: "@mikaquest",
    platform: "YouTube",
    flag: "🇺🇸",
    region: "美国",
    language: "英语",
    followers: "1.4M",
    avgViews: "312K",
    engagement: "5.8%",
    tags: ["二次元游戏", "MMORPG", "模拟经营"],
    lastUpload: "11小时前",
    score: 89,
    description: "专注二次元 RPG 深度评测、上线攻略与长线内容运营的 YouTube 长视频博主。",
    trend: [36, 45, 58, 61, 59, 70],
    overlap: 66,
    audience: "18-27"
  },
  {
    name: "Falcon MENA",
    handle: "@falconmena",
    platform: "YouTube",
    flag: "🇦🇪",
    region: "中东",
    language: "阿拉伯语",
    followers: "780K",
    avgViews: "96K",
    engagement: "9.4%",
    tags: ["移动游戏", "MMORPG", "沙盒"],
    lastUpload: "1天前",
    score: 87,
    description: "阿语游戏 YouTube 博主，评论区互动黏性强，并具备移动游戏上线推广经验。",
    trend: [31, 44, 46, 53, 64, 69],
    overlap: 71,
    audience: "16-24"
  },
  {
    name: "Nara BuildLab",
    handle: "@narabuildlab",
    platform: "YouTube",
    flag: "🇮🇩",
    region: "印度尼西亚",
    language: "英语",
    followers: "940K",
    avgViews: "188K",
    engagement: "6.6%",
    tags: ["模拟经营", "沙盒", "Roblox"],
    lastUpload: "6小时前",
    score: 84,
    description: "设计感突出的 YouTube 建造类内容博主，覆盖模拟经营、沙盒与玩家创作世界。",
    trend: [28, 36, 48, 46, 58, 62],
    overlap: 63,
    audience: "15-23"
  }
];

const suggestions = ["Roblox 巴西", "二次元移动游戏", "阿语游戏博主"];
const trendingTags = ["Roblox", "移动游戏", "MMORPG", "沙盒", "模拟经营", "二次元游戏"];
const filters = {
  地区: ["巴西", "中东", "美国", "印度尼西亚", "欧洲"],
  语言: ["葡萄牙语", "阿拉伯语", "英语", "西班牙语"]
};

export default function Home() {
  const [query, setQuery] = useState("Roblox 巴西");
  const [selectedCreator, setSelectedCreator] = useState<Creator>(creators[0]);

  const filteredCreators = useMemo(() => {
    const normalized = query.toLowerCase();
    if (!normalized.trim()) return creators;

    return creators.filter((creator) =>
      [
        creator.name,
        creator.handle,
        creator.platform,
        creator.region,
        creator.language,
        ...creator.tags
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized.split(" ")[0])
    );
  }, [query]);

  return (
    <main className="min-h-screen lg:pl-72">
      <Sidebar />
      <section className="mx-auto flex w-full max-w-[1480px] flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
        <Hero query={query} setQuery={setQuery} setSelectedCreator={setSelectedCreator} />
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <FilterPanel />
          <SearchResults creators={filteredCreators} setSelectedCreator={setSelectedCreator} />
        </div>
        <RecommendationPanel creator={selectedCreator} />
      </section>
    </main>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-navy/95 px-4 py-3 backdrop-blur-xl lg:inset-y-0 lg:left-0 lg:right-auto lg:w-72 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
      <div className="flex items-center justify-between lg:block">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-indigo-500/25">
            <Gamepad2 className="size-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">CreatorIntel</p>
            <p className="text-xs text-slate-400">游戏博主智能检索平台</p>
          </div>
        </div>
        <button className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden" aria-label="打开菜单">
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      <nav className="mt-0 hidden gap-2 lg:mt-10 lg:flex lg:flex-col">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              item.active
                ? "bg-white text-navy shadow-lg shadow-indigo-500/10"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 hidden rounded-lg border border-white/10 bg-white/10 p-4 lg:block">
        <div className="flex items-center gap-3">
          <ShieldCheck className="size-5 text-success" />
          <div>
            <p className="text-sm font-semibold text-white">上线可用数据</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">博主信号每 24 小时自动同步更新。</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Hero({
  query,
  setQuery,
  setSelectedCreator
}: {
  query: string;
  setQuery: (value: string) => void;
  setSelectedCreator: (creator: Creator) => void;
}) {
  return (
    <section className="overflow-hidden rounded-none pt-20 lg:pt-0">
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.98] p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              V1 博主发现中枢
            </span>
            <span className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Activity className="size-4 text-success" />
              已索引 43K 游戏博主
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
            为你的新游戏快速找到合适博主
          </h1>
          <p className="mt-4 text-lg text-slate-600">通过搜索、标签筛选和相似推荐，快速发现高匹配度博主。</p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-2 shadow-inner">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex min-h-14 flex-1 items-center gap-3 rounded-md bg-white px-4 shadow-sm">
                <Search className="size-5 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="按博主、游戏、标签或关键词搜索"
                  className="w-full border-0 bg-transparent text-base font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </label>
              <button className="flex min-h-14 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-secondary px-6 font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:translate-y-[-1px]">
                <SlidersHorizontal className="size-5" />
                检索博主
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <SuggestionGroup title="搜索建议" items={suggestions} onPick={setQuery} />
            <SuggestionGroup title="热门标签" items={trendingTags} onPick={setQuery} colorful />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.98] p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-950">最近查看的博主</h2>
            <ChevronRight className="size-5 text-slate-400" />
          </div>
          <div className="mt-5 space-y-3">
            {creators.slice(0, 3).map((creator) => (
              <button
                key={creator.handle}
                onClick={() => setSelectedCreator(creator)}
                className="group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-card"
              >
                <Avatar creator={creator} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-950">{creator.name}</p>
                  <p className="text-xs text-slate-500">{creator.platform} · {creator.region}</p>
                </div>
                <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-semibold text-success">
                  {creator.score}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SuggestionGroup({
  title,
  items,
  onPick,
  colorful = false
}: {
  title: string;
  items: string[];
  onPick: (item: string) => void;
  colorful?: boolean;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item}
            onClick={() => onPick(item)}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
              colorful
                ? ["border-emerald-200 bg-emerald-50 text-emerald-700", "border-amber-200 bg-amber-50 text-amber-700", "border-indigo-200 bg-indigo-50 text-indigo-700"][index % 3]
                : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterPanel() {
  return (
    <aside className="rounded-lg border border-white/10 bg-white p-5 shadow-card xl:sticky xl:top-8 xl:self-start">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">筛选面板</p>
          <p className="mt-1 text-xs text-slate-500">按上线匹配度精准筛选博主</p>
        </div>
        <Filter className="size-5 text-primary" />
      </div>

      <div className="thin-scrollbar mt-5 max-h-none space-y-6 overflow-auto xl:max-h-[720px]">
        {Object.entries(filters).map(([label, options]) => (
          <FilterGroup key={label} label={label} options={options} />
        ))}

        <RangeBlock label="粉丝量" value="10K - 10M" />
        <RangeBlock label="互动率" value="3% - 12%" />
        <RangeBlock label="平均播放" value="50K - 800K" />

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <CalendarDays className="size-4 text-slate-400" />
            最近活跃时间
          </label>
          <select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary">
            <option>近 7 天</option>
            <option>近 30 天</option>
            <option>近 90 天</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <TrendingUp className="size-4 text-slate-400" />
            更新频率
          </label>
          <select className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary">
            <option>每周 3 次以上</option>
            <option>每周更新</option>
            <option>每月更新</option>
          </select>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({ label, options }: { label: string; options: string[] }) {
  const iconMap: Record<string, typeof Globe2> = {
    地区: Globe2,
    语言: Languages
  };
  const Icon = iconMap[label] ?? Tags;

  return (
    <div>
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <Icon className="size-4 text-slate-400" />
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <input defaultChecked={index < 2} type="checkbox" className="size-4 accent-primary" />
            <span className="min-w-0 truncate">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function RangeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">{label}</p>
        <p className="text-xs font-semibold text-primary">{value}</p>
      </div>
      <input className="range-track w-full" type="range" min="0" max="100" defaultValue="72" />
    </div>
  );
}

function SearchResults({
  creators,
  setSelectedCreator
}: {
  creators: Creator[];
  setSelectedCreator: (creator: Creator) => void;
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">博主检索</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">按上线匹配度排序的博主结果</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
          {["匹配度", "触达量", "活跃度"].map((item, index) => (
            <button
              key={item}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                index === 0 ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {creators.map((creator) => (
          <CreatorCard key={creator.handle} creator={creator} setSelectedCreator={setSelectedCreator} />
        ))}
      </div>
    </section>
  );
}

function CreatorCard({
  creator,
  setSelectedCreator
}: {
  creator: Creator;
  setSelectedCreator: (creator: Creator) => void;
}) {
  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-lift sm:p-5"
    >
      <div className="grid gap-5 xl:grid-cols-[1fr_310px]">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Avatar creator={creator} large />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-950">{creator.name}</h3>
              <PlatformBadge platform={creator.platform} />
              <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">{creator.flag}</span>
            </div>
            <p className="mt-1 text-sm font-medium text-slate-500">{creator.handle}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{creator.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {creator.tags.map((tag, index) => (
                <button
                  key={tag}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition hover:-translate-y-0.5 ${
                    index === 0
                      ? "bg-indigo-50 text-primary"
                      : index === 1
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-3 gap-2">
            <Metric label="粉丝量" value={creator.followers} />
            <Metric label="平均播放" value={creator.avgViews} />
            <Metric label="互动率" value={creator.engagement} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500">最近更新</p>
              <p className="mt-1 text-sm font-semibold text-slate-950">{creator.lastUpload}</p>
            </div>
            <div className="rounded-lg bg-gradient-to-br from-indigo-50 to-blue-50 p-3">
              <p className="text-xs font-medium text-slate-500">相似度</p>
              <p className="mt-1 text-sm font-semibold text-primary">{creator.score}% 匹配</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton label="查看主页" icon={BarChart3} />
            <ActionButton label="查找相似博主" icon={Wand2} primary onClick={() => setSelectedCreator(creator)} />
            <ActionButton label="收藏博主" icon={Bookmark} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function RecommendationPanel({ creator }: { creator: Creator }) {
  const similar = creators.filter((item) => item.handle !== creator.handle);

  return (
    <section className="rounded-lg border border-white/10 bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">相似博主推荐</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">与 {creator.name} 相近的 YouTube 博主</h2>
        </div>
        <p className="text-sm text-slate-500">轻量推荐，便于快速查看主页。</p>
      </div>

      <div className="thin-scrollbar mt-5 grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        {similar.map((item) => (
          <motion.article
            key={item.handle}
            layout
            whileHover={{ y: -3 }}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-card"
          >
            <div className="flex items-start gap-3">
              <Avatar creator={item} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-semibold text-slate-950">{item.name}</p>
                  <PlatformBadge platform={item.platform} />
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.region}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Metric label="粉丝量" value={item.followers} />
              <Metric label="平均播放" value={item.avgViews} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>

            <button className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-primary">
              <BarChart3 className="size-4" />
              查看主页
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Avatar({ creator, large = false }: { creator: Creator; large?: boolean }) {
  const initials = creator.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`grid shrink-0 place-items-center rounded-lg bg-gradient-to-br from-slate-900 via-primary to-secondary font-bold text-white shadow-lg shadow-indigo-500/20 ${
        large ? "size-20 text-xl" : "size-12 text-sm"
      }`}
      aria-label={`${creator.name} profile picture`}
    >
      {initials}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: Creator["platform"] }) {
  const colorMap = {
    YouTube: "bg-red-50 text-red-600"
  };

  return <span className={`rounded-md px-2 py-1 text-xs font-bold ${colorMap[platform]}`}>{platform}</span>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  icon: Icon,
  primary = false,
  onClick
}: {
  label: string;
  icon: typeof Search;
  primary?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
        primary
          ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
          : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200"
      }`}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
