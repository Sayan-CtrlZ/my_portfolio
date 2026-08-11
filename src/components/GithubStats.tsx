import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Activity, Flame, Trophy, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface GithubData {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  contributionDays: ContributionDay[];
}

export default function GithubStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError('UNABLE_TO_CONNECT_TO_GITHUB_API');
      } finally {
        setLoading(false);
      }
    }
    fetchGithubStats();
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 768px)").matches) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || loading) return;

      gsap.fromTo(
        ".github-stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
      
      gsap.fromTo(
        ".github-heatmap-container",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [loading] }
  );

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count < 4) return 'bg-brutal-yellow';
    if (count < 8) return 'bg-brutal-orange';
    if (count < 12) return 'bg-brutal-pink';
    return 'bg-brutal-purple text-white';
  };

  return (
    <section
      id="github-stats"
      ref={containerRef}
      className="py-20 px-6 md:px-12 lg:px-24 bg-white border-b-4 border-black relative overflow-hidden"
    >
      <div className="absolute inset-0 brutal-scratches opacity-10 pointer-events-none mix-blend-multiply"></div>

      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="bg-brutal-cyan text-black border-2 border-black font-mono font-bold text-xs px-3 py-1 uppercase shadow-brutal-sm rotate-[-1.5deg] inline-block mb-3">
              OPEN SOURCE ACTIVITY
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-brutal-dark leading-none flex items-center gap-4">
              GITHUB_STATS <Github className="w-10 h-10 md:w-14 md:h-14" />
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-64 border-4 border-black bg-brutal-light flex items-center justify-center shadow-brutal font-mono font-black text-xl animate-pulse">
            LOADING_GITHUB_DATA...
          </div>
        ) : error ? (
          <div className="w-full p-6 border-4 border-black bg-brutal-pink flex items-center justify-center shadow-brutal font-mono font-black text-lg text-black">
            {error}
          </div>
        ) : data ? (
          <div className="flex flex-col gap-8">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="github-stat-card border-4 border-black bg-brutal-green p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white px-2 py-1 border-2 border-black">TOTAL_COMMITS</span>
                  <Activity className="w-6 h-6 group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block">
                    {data.totalContributions}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">IN THE LAST 365 DAYS</span>
                </div>
              </div>

              <div className="github-stat-card border-4 border-black bg-brutal-yellow p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white px-2 py-1 border-2 border-black">CURRENT_STREAK</span>
                  <Flame className="w-6 h-6 text-black group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block">
                    {data.currentStreak} <span className="text-2xl">DAYS</span>
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">ACTIVE DAY RUN</span>
                </div>
              </div>

              <div className="github-stat-card border-4 border-black bg-brutal-purple p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group text-white">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white text-black px-2 py-1 border-2 border-black">LONGEST_STREAK</span>
                  <Trophy className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block text-white">
                    {data.longestStreak} <span className="text-2xl text-white">DAYS</span>
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">MAXIMUM RECORD</span>
                </div>
              </div>

            </div>

            {/* Heatmap */}
            <div className="github-heatmap-container border-4 border-black bg-brutal-light p-6 shadow-brutal rotate-[0.5deg]">
              <div className="flex justify-between items-center mb-4 border-b-2 border-black border-dashed pb-2">
                <span className="font-mono text-sm font-black uppercase">CONTRIBUTION_MATRIX.EXE</span>
              </div>
              
              <div className="w-full overflow-x-auto pb-4 scrollbar-brutal">
                <div className="min-w-[800px] flex flex-col gap-1">
                  {/* Create 7 rows for days of the week, mapping the linear data back into a grid */}
                  {Array.from({ length: 7 }).map((_, dayOfWeek) => (
                    <div key={dayOfWeek} className="flex gap-1">
                      {/* The linear data is sorted from 365 days ago to today. We want it column by column. */}
                      {/* We'll just map the chunks of 7. It's actually safer to just render column by column natively. */}
                      {/* Data is typically returned week by week if we didn't flatten it, but since we flattened it, we group by 7 */}
                      {Array.from({ length: Math.ceil(data.contributionDays.length / 7) }).map((_, weekIndex) => {
                        const dayIndex = weekIndex * 7 + dayOfWeek;
                        const dayData = data.contributionDays[dayIndex];
                        if (!dayData) return <div key={weekIndex} className="w-3 h-3 md:w-4 md:h-4 opacity-0" />;
                        
                        return (
                          <div
                            key={dayData.date}
                            title={`${dayData.contributionCount} contributions on ${dayData.date}`}
                            className={`w-3 h-3 md:w-4 md:h-4 border border-black/40 hover:border-black hover:scale-150 transition-all cursor-crosshair ${getContributionColor(dayData.contributionCount)}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 font-mono text-xs font-bold justify-end">
                <span>LESS</span>
                <div className="flex gap-1">
                  {[0, 2, 5, 10, 15].map(val => (
                    <div key={val} className={`w-3 h-3 md:w-4 md:h-4 border border-black ${getContributionColor(val)}`}></div>
                  ))}
                </div>
                <span>MORE</span>
              </div>
            </div>

          </div>
        ) : null}

      </div>
    </section>
  );
}
