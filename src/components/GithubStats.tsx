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
  availableYears: number[];
}

export default function GithubStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | number>('default');
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    async function fetchGithubStats() {
      setLoading(true);
      try {
        const response = await fetch(`/api/github?year=${selectedYear}`);
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub data');
        }
        const json = await response.json();
        setData(json);
        
        // Cache available years so the sidebar doesn't disappear
        if (availableYears.length === 0 && json.availableYears) {
          setAvailableYears(json.availableYears);
        }
      } catch (err) {
        console.error(err);
        setError('UNABLE_TO_CONNECT_TO_GITHUB_API');
      } finally {
        setLoading(false);
      }
    }
    fetchGithubStats();
  }, [selectedYear]);

  useGSAP(
    () => {
      if (window.matchMedia("(max-width: 768px)").matches) return;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || loading || data === null) return;

      // Only trigger entrance animation once (when data is first loaded)
      // Since selectedYear changes only trigger a re-render without unmounting, 
      // we can rely on GSAP's fromTo to play if we haven't already animated them in.
      // We'll use a simple attribute check to prevent re-animating on every year click.
      if (!containerRef.current?.getAttribute('data-animated')) {
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
            onComplete: () => {
              containerRef.current?.setAttribute('data-animated', 'true');
            }
          }
        );
      }
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

        {error ? (
          <div className="w-full p-6 border-4 border-black bg-brutal-pink flex items-center justify-center shadow-brutal font-mono font-black text-lg text-black">
            {error}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            
            {/* Stat Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              
              <div className="github-stat-card border-4 border-black bg-brutal-green p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white px-2 py-1 border-2 border-black">TOTAL_COMMITS</span>
                  <Activity className="w-6 h-6 group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block">
                    {data?.totalContributions || 0}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">
                    {selectedYear === 'default' ? 'IN THE LAST 365 DAYS' : `IN ${selectedYear}`}
                  </span>
                </div>
              </div>

              <div className="github-stat-card border-4 border-black bg-brutal-yellow p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white px-2 py-1 border-2 border-black">CURRENT_STREAK</span>
                  <Flame className="w-6 h-6 text-black group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block">
                    {data?.currentStreak || 0} <span className="text-2xl">DAYS</span>
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">
                    {selectedYear === 'default' ? 'ACTIVE DAY RUN' : `AT END OF ${selectedYear}`}
                  </span>
                </div>
              </div>

              <div className="github-stat-card border-4 border-black bg-brutal-purple p-6 shadow-brutal flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition-transform group text-white">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-sm font-black bg-white text-black px-2 py-1 border-2 border-black">LONGEST_STREAK</span>
                  <Trophy className="w-6 h-6 text-white group-hover:scale-125 transition-transform" />
                </div>
                <div className="mt-4">
                  <span className="text-5xl lg:text-7xl font-black tracking-tighter leading-none block text-white">
                    {data?.longestStreak || 0} <span className="text-2xl text-white">DAYS</span>
                  </span>
                  <span className="font-mono text-xs font-bold uppercase mt-2 block opacity-80">
                    {selectedYear === 'default' ? 'MAXIMUM RECORD' : `MAXIMUM IN ${selectedYear}`}
                  </span>
                </div>
              </div>

            </div>

            {/* Heatmap and Year Selector Container */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              
              {/* Heatmap */}
              <div className="github-heatmap-container border-4 border-black bg-brutal-light p-6 shadow-brutal rotate-[0.5deg] flex-grow w-full md:w-[calc(100%-150px)] max-w-full overflow-hidden relative">
                <div className="flex justify-between items-center mb-4 border-b-2 border-black border-dashed pb-2">
                  <span className="font-mono text-sm font-black uppercase">CONTRIBUTION_MATRIX.EXE</span>
                  {loading && <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5 animate-pulse">FETCHING_DATA...</span>}
                </div>
                
                <div className={`w-full overflow-x-auto pb-4 scrollbar-brutal flex transition-opacity duration-300 ${loading ? 'opacity-30' : 'opacity-100'}`}>
                  
                  {/* Day Labels */}
                  <div className="flex flex-col gap-1 mr-2 text-[10px] font-mono font-bold text-gray-500 mt-1 shrink-0">
                    <div className="h-5"></div> {/* Spacer for month row */}
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1"></span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1">Mon</span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1"></span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1">Wed</span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1"></span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1">Fri</span>
                    <span className="h-3 md:h-4 flex items-center justify-end pr-1"></span>
                  </div>

                  {/* Matrix Grid */}
                  <div className="flex gap-1 min-w-max">
                    {data && (() => {
                      const weeks = [];
                      const numWeeks = Math.ceil(data.contributionDays.length / 7);
                      let lastMonth = -1;

                      for (let w = 0; w < numWeeks; w++) {
                        const weekDays = [];
                        let monthName = null;
                        
                        for (let d = 0; d < 7; d++) {
                          const dayData = data.contributionDays[w * 7 + d];
                          weekDays.push(dayData);
                          if (dayData && monthName === null) {
                            const date = new Date(dayData.date);
                            if (date.getMonth() !== lastMonth) {
                               monthName = date.toLocaleString('default', { month: 'short' });
                               lastMonth = date.getMonth();
                            }
                          }
                        }
                        weeks.push({ monthName, days: weekDays });
                      }

                      return weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-1">
                          {/* Month Label Row */}
                          <div className="h-5 flex items-end pb-1 text-[10px] font-mono font-bold text-gray-800">
                            <span className="whitespace-nowrap absolute z-10">{week.monthName || ''}</span>
                          </div>
                          
                          {/* 7 Days of the week */}
                          {week.days.map((dayData, dIdx) => {
                            if (!dayData) return <div key={dIdx} className="w-3 h-3 md:w-4 md:h-4 opacity-0" />;
                            return (
                              <div
                                key={dayData.date}
                                title={`${dayData.contributionCount} contributions on ${dayData.date}`}
                                className={`w-3 h-3 md:w-4 md:h-4 border border-black/40 hover:border-black hover:scale-150 transition-all cursor-crosshair ${getContributionColor(dayData.contributionCount)} relative z-20`}
                              />
                            );
                          })}
                        </div>
                      ));
                    })()}
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

              {/* Year Selector Sidebar */}
              {availableYears.length > 0 && (
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-[120px] overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-brutal shrink-0 rotate-[-0.5deg]">
                   <button 
                     onClick={() => setSelectedYear('default')}
                     disabled={loading}
                     className={`px-3 py-2 md:py-3 font-mono font-black text-xs md:text-sm border-4 border-black transition-all whitespace-nowrap cursor-pointer hover:bg-black hover:text-white ${selectedYear === 'default' ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-brutal-yellow text-black shadow-brutal-sm'}`}
                   >
                     LAST 365
                   </button>
                   {availableYears.map(year => (
                     <button 
                       key={year}
                       onClick={() => setSelectedYear(year)}
                       disabled={loading}
                       className={`px-3 py-2 md:py-3 font-mono font-black text-xs md:text-sm border-4 border-black transition-all cursor-pointer hover:bg-black hover:text-white ${selectedYear === year ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' : 'bg-white text-black shadow-brutal-sm'}`}
                     >
                       {year}
                     </button>
                   ))}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
