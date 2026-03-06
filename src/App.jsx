import React, { useState, useRef, useEffect } from 'react';
import { Play, Image, User, Mail, ExternalLink, Clock, ChevronRight, FileText, Send, Github, MessageSquare, Monitor, Sparkles, Heart, Star, Coffee, Leaf, Sprout, Wrench, Award } from 'lucide-react';

/**
 * 💡 终极全适配版优化：
 * 1. PDF 修复：增加了移动端判断，手机上显示“简历卡片”，点击跳转，完美解决 iframe 白屏。
 * 2. 移动端适配：深度优化了各个模块在小屏下的边距和字体大小。
 * 3. 资源链接：保持腾讯云 COS 全速调用。
 */

const COS_BASE = "https://hyf-portfolio-video-1391627738.cos.ap-shanghai.myqcloud.com";

const UE_PROJECTS = [
  {
    id: 'ue-comm',
    category: '已上线商业化PV',
    title: '元梦之星-农场商业化PV',
    videoUrl: `${COS_BASE}/SP01.mp4`, 
    thumbnail: './images/cover01.jpg', 
    description: '从方案设计到最终资源优化全流程参与。【一共11个案例】',
    timestamps: [
      { time: 0, label: 'PV1-小天使', icon: '①' }, { time: 16, label: 'PV2-嘿，乐队 ', icon: '②' },
      { time: 34, label: 'PV3-奶茶鼠', icon: '③' }, { time: 50, label: 'PV4-森林啾啾', icon: '④' },
      { time: 66, label: 'PV5-是煎饼侠', icon: '⑤' }, { time: 81, label: 'PV6-鲨鱼钓鱼', icon: '⑥' },
      { time: 102, label: 'PV7-水豚lulu', icon: '⑦' }, { time: 118, label: 'PV8-万圣小幽灵', icon: '⑧' },
      { time: 133, label: 'PV9-惊喜礼盒', icon: '⑨' }, { time: 150, label: 'PV10-雪球精灵', icon: '⑩' },
      { time: 165, label: 'PV11-发财蛇', icon: '⑪' },
    ]
  },
  {
    id: 'ue-official',
    category: '已上线宣传PV',
    title: '元梦之星-奇迹农场宣传PV',
    videoUrl: `${COS_BASE}/SP02.mp4`,
    thumbnail: './images/cover02.jpg',
    description: '从故事设计到最终上线全流程负责。【肝到头秃】',
    timestamps: [{ time: 0, label: '精彩开始', icon: '💡' }]
  },
  {
    id: 'ue-personal',
    category: '个人地编作品',
    title: 'UE场景练习',
    videoUrl: `${COS_BASE}/SP03.mp4`,
    thumbnail: './images/cover03.jpg',
    description: '是各种风格的尝试与探索。',
    timestamps: [
      { time: 0, label: '国风武侠', icon: '①' }, { time: 5, label: '火山', icon: '②' },
      { time: 9, label: '爆破', icon: '③' }, { time: 18, label: '写实山体1', icon: '④' },
      { time: 22, label: '写实山体2', icon: '⑤' }, { time: 29, label: '机械战警', icon: '⑥' },
      { time: 31, label: '风格化街景', icon: '⑦' }, { time: 40, label: '夜景练习', icon: '⑧' },
      { time: 45, label: '最后生还者', icon: '⑨' }, { time: 68, label: '自然洞穴', icon: '⑩' },
      { time: 77, label: '雪景练习', icon: '⑪' }, { time: 82, label: 'motion design小熊', icon: '⑫' },
    ]
  },
  {
    id: 'ue-practice',
    category: 'UE综合练习',
    title: '综合练习：全流程探索',
    videoUrl: `${COS_BASE}/SP04.mp4`,
    thumbnail: './images/cover04.jpg',
    description: '新的从想法到成品的流程化探索。',
    timestamps: [{ time: 0, label: '流程展示', icon: '💡' }]
  }
];

const GALLERY_CONFIG = [
  { ext: 'jpg', title: '圆凳比赛' }, { ext: 'jpg', title: 'logos' },
  { ext: 'jpg', title: '龙舌兰' }, { ext: 'jpg', title: '银灰' },
  { ext: 'jpg', title: '椒花颂声' }, { ext: 'jpg', title: '不是cp' },
  { ext: 'png', title: '兔年吉祥' }, { ext: 'png', title: '赛博京剧' },
  { ext: 'png', title: '随笔人物' }, { ext: 'png', title: '微光森林' },
  { ext: 'jpg', title: '随笔遗迹' }, { ext: 'jpg', title: '国风建筑' },
  { ext: 'png', title: '甜品屋' }, { ext: 'jpg', title: '致力于更快的故勒顿' },
];

const GALLERY = GALLERY_CONFIG.map((item, i) => ({
  id: i + 1,
  url: `${COS_BASE}/gallery/art${(i + 1).toString().padStart(2, '0')}.${item.ext}`,
  title: item.title
}));

const App = () => {
  const [showHero, setShowHero] = useState(true);
  const [isExiting, setIsExiting] = useState(false); 
  const [activeTab, setActiveTab] = useState('about'); 
  const [selectedVideo, setSelectedVideo] = useState(UE_PROJECTS[0]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const videoRef = useRef(null);

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
      if (window.innerWidth < 768) {
        window.scrollTo({ top: 150, behavior: 'smooth' });
      }
    }
  };

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      setShowHero(false);
      setIsExiting(false);
    }, 800); 
  };

  return (
    <div className="min-h-screen bg-[#0d0f0e] text-emerald-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden text-left">
      
      {/* 动态背景 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-soft-stars-green opacity-[0.1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(16,185,129,0.06),_transparent_50%)]"></div>
      </div>

      {/* Hero 开场屏 */}
      {showHero && (
        <div className={`fixed inset-0 z-[100] bg-[#0d0f0e] flex flex-col items-center justify-center transition-all duration-[800ms] ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/5 rounded-full blur-[100px] md:blur-[140px] animate-float"></div>
          
          <div className="z-10 text-center space-y-8 px-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 animate-bounce-slow">
                <Leaf className="text-emerald-400" size={16} />
                <h2 className="text-emerald-300 font-mono tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs uppercase font-bold opacity-70">May good fortune be with you.</h2>
                <Leaf className="text-emerald-400" size={16} />
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-50 via-emerald-200 to-emerald-500 tracking-tighter leading-tight md:leading-none uppercase italic pr-4">
                欢迎光临
              </h1>
              <p className="text-emerald-100/40 max-w-xl mx-auto text-xs md:text-sm font-medium tracking-widest text-center">
                感谢来访，欢迎交个朋友。
              </p>
            </div>
            <button 
              onClick={handleEnter}
              className="group relative px-10 py-4 md:px-12 md:py-5 bg-emerald-600 text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/10 overflow-hidden mx-auto block"
            >
              <span className="relative z-10 flex items-center gap-3 font-bold tracking-widest text-sm md:text-base uppercase">
                里面请 ENTER <Sprout size={18} className="fill-white" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>
      )}

      {/* 网站主体 */}
      {!showHero && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out text-left">
          <header className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 md:px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-3 md:py-2.5 bg-[#141816]/90 backdrop-blur-2xl border border-white/5 rounded-3xl md:rounded-full shadow-2xl">
              <div className="py-1 flex items-center gap-3 group cursor-pointer" onClick={() => setShowHero(true)}>
                <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center font-black text-base md:text-lg shadow-lg group-hover:scale-110 transition-all text-center">H</div>
                <div className="text-left text-emerald-50">
                  <h1 className="text-sm md:text-base font-black tracking-tight uppercase leading-none">自己做的网页</h1>
                  <p className="text-[9px] md:text-[10px] text-emerald-400/70 font-bold uppercase tracking-widest leading-none mt-1 text-left">不足之处多多包涵</p>
                </div>
              </div>
              <nav className="flex overflow-x-auto w-full md:w-auto no-scrollbar gap-1 mt-3 md:mt-0 justify-center">
                {[
                  { id: 'about', label: '简介', icon: User },
                  { id: 'projects', label: '作品', icon: Monitor },
                  { id: 'gallery', label: '随笔', icon: Image },
                  { id: 'contact', label: '联系', icon: Mail },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 transition-all rounded-full whitespace-nowrap ${
                      activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10' : 'text-emerald-100/40 hover:text-emerald-200 hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={14} />
                    <span className="text-[10px] md:text-xs font-bold tracking-wider uppercase">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </header>

          <main className="pt-32 md:pt-36 pb-20 max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-emerald-50 text-left">
            
            {activeTab === 'about' && (
              <div className="max-w-6xl mx-auto animate-in fade-in duration-1000 ease-out text-left">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
                  <div className="md:col-span-4 space-y-6 md:space-y-8 text-center md:text-left px-2">
                    <div className="relative aspect-square w-48 md:w-full mx-auto rounded-[2.5rem] md:rounded-[3.5rem] border-4 border-white/5 overflow-hidden shadow-2xl transition-transform hover:rotate-1">
                        <img src="./images/avatar.jpg" className="w-full h-full object-cover brightness-105 transition-all" alt="Profile" />
                    </div>
                    <div className="space-y-2">
                       <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-white leading-tight">何雨菲</h2>
                       <p className="text-emerald-400 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">视频设计师 / UE地编 / AI研究</p>
                    </div>
                    <div className="p-5 md:p-6 bg-white/5 rounded-[2rem] border border-emerald-900/10 space-y-4 text-left">
                       <h4 className="text-[9px] md:text-[10px] font-black text-emerald-300/30 uppercase tracking-widest border-b border-white/5 pb-2 text-left">SKILLS 工具箱</h4>
                       <div className="flex flex-wrap gap-2">
                         {['UE', 'Blender', 'AI', 'Ps', 'Pr', 'Ae', 'Houdini'].map(tag => (
                           <span key={tag} className="px-3 py-1.5 bg-emerald-500/5 text-emerald-300 text-[9px] md:text-[10px] font-bold rounded-full border border-emerald-500/10">{tag}</span>
                         ))}
                       </div>
                    </div>
                  </div>

                  <div className="md:col-span-8 px-2 text-left">
                     <div className="bg-[#141816] rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border border-white/5 text-left">
                        <div className="px-6 md:px-8 py-4 md:py-5 bg-white/5 border-b border-white/5 flex justify-between items-center text-left">
                           <span className="text-[10px] md:text-xs font-bold text-emerald-200/30 uppercase tracking-widest italic truncate max-w-[150px] md:max-w-none">
                             <FileText size={14} className="inline mr-2 text-emerald-400" /> RESUME_HYF_2026.PDF
                           </span>
                           <a href="./resume.pdf" download className="text-[9px] md:text-[10px] font-black bg-emerald-600 text-white px-4 md:px-5 py-2 rounded-full shadow-lg uppercase whitespace-nowrap">Download 下载</a>
                        </div>
                        {/* 💡 手机端 PDF 智能修复逻辑 */}
                        <div className="aspect-[1/1.4] bg-[#fafcfb] overflow-hidden shadow-inner h-[500px] md:h-auto flex flex-col items-center justify-center p-6 text-center">
                           <div className="hidden md:block w-full h-full">
                             <iframe src="./resume.pdf#toolbar=0" className="w-full h-full border-none" title="Resume Preview" />
                           </div>
                           <div className="md:hidden flex flex-col items-center gap-6">
                              <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 shadow-inner">
                                <FileText size={40} />
                              </div>
                              <div className="space-y-2">
                                <p className="text-slate-900 font-black text-lg">简历预览已就绪</p>
                                <p className="text-slate-400 text-xs font-medium px-4">由于移动端浏览器限制，请点击下方按钮全屏查看完整简历</p>
                              </div>
                              <a
                                href="./resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-4 bg-emerald-600 text-white rounded-full font-black shadow-xl shadow-emerald-500/20 active:scale-95 transition-transform uppercase tracking-widest text-sm"
                              >
                                全屏浏览简历
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out text-left text-emerald-50 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-[#141816]/60 p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] border border-emerald-900/10 shadow-2xl backdrop-blur-sm">
                  <div className="lg:col-span-3 space-y-4 md:space-y-6">
                    <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl flex items-center justify-center min-h-[250px] md:min-h-[450px] max-h-[75vh] ring-1 ring-white/5">
                      <video
                        key={selectedVideo.id}
                        ref={videoRef}
                        src={selectedVideo.videoUrl}
                        controls
                        preload="metadata"
                        className="max-w-full max-h-full object-contain"
                        poster={selectedVideo.thumbnail}
                      />
                    </div>
                    <div className="px-2 md:px-6 space-y-2 text-left">
                      <div className="flex items-center gap-2 text-emerald-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-left">
                        <Sparkles size={12} /> {selectedVideo.category}
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight uppercase italic text-left">{selectedVideo.title}</h2>
                      <p className="text-emerald-100/50 text-sm md:text-base font-medium max-w-3xl leading-relaxed text-left">{selectedVideo.description}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-1 bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 flex flex-col gap-6 border border-white/5 text-left">
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-black text-emerald-300/40 uppercase tracking-widest border-b border-white/5 pb-4 text-left">
                      <Clock size={16} /> 场景快传点
                    </div>
                    <div className="space-y-2 overflow-y-auto custom-scrollbar pr-2 max-h-[300px] md:max-h-[450px]">
                      {selectedVideo.timestamps.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => seekTo(item.time)}
                          className="w-full flex items-center justify-between p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white/5 hover:bg-emerald-600 text-emerald-100 hover:text-white transition-all text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="text-[11px] md:text-xs font-bold tracking-tight">{item.label}</span>
                          </div>
                          <span className="text-[9px] md:text-[10px] font-mono opacity-40 bg-black/20 px-2 py-1 rounded-full">{Math.floor(item.time / 60)}:{(item.time % 60).toString().padStart(2, '0')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 px-1 md:px-4 text-left">
                  {UE_PROJECTS.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className={`group cursor-pointer relative rounded-2xl md:rounded-[2rem] overflow-hidden border transition-all duration-500 ${
                        selectedVideo.id === video.id ? 'border-emerald-500 shadow-2xl ring-4 ring-emerald-500/10' : 'border-white/5 hover:border-emerald-400/30 bg-[#141816]'
                      }`}
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt={video.title} loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f0e] via-transparent to-transparent"></div>
                      </div>
                      <div className="p-3 md:p-5 text-left">
                        <h4 className="font-bold text-white text-[10px] md:text-sm tracking-tight leading-tight text-left">{video.title}</h4>
                        <p className="text-[8px] md:text-[10px] text-emerald-400/50 mt-1 font-bold uppercase truncate text-left">{video.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out text-left text-emerald-50">
                 <div className="flex items-center gap-4 mb-4 md:mb-10 px-2 md:px-4 text-left">
                   <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase text-emerald-100 italic text-left">🍃 不正经的随笔画廊</h3>
                   <div className="h-0.5 flex-grow bg-gradient-to-r from-emerald-500/20 to-transparent rounded-full text-left"></div>
                 </div>
                 <div className="columns-2 lg:columns-3 gap-4 md:gap-8 px-2 md:px-4 text-left">
                    {GALLERY.map((img, idx) => (
                      <div
                        key={idx}
                        className="mb-4 md:mb-8 relative group cursor-zoom-in rounded-2xl md:rounded-[2rem] border border-white/5 bg-[#141816] overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-500 text-left"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img src={img.url} alt={img.title} className="w-full h-auto opacity-75 group-hover:opacity-100 transition-all duration-700" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 md:p-6 flex items-end">
                          <p className="text-white text-[9px] md:text-xs font-black tracking-widest uppercase italic text-left">🌿 {img.title}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-700 px-4 py-8 md:py-12 text-emerald-50 text-center">
                 <div className="text-center space-y-10 md:space-y-12">
                   <div className="space-y-4 text-center">
                     <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white italic text-center">Grow together</h2>
                     <p className="text-emerald-100/40 font-medium max-w-2xl mx-auto leading-relaxed text-center underline decoration-emerald-500/20 underline-offset-8 text-xs md:text-base text-center text-center">如果您对我的作品感兴趣，或者想合作，欢迎联系我。</p>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto text-center">
                      <div className="flex flex-col items-center gap-4 md:gap-6 p-8 md:p-10 bg-[#141816] rounded-[2.5rem] border border-emerald-900/10 group hover:bg-emerald-500/5 transition-all shadow-lg text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner text-center"><Mail size={32}/></div>
                        <div className="text-center">
                          <p className="text-[10px] md:text-[12px] text-emerald-300/40 uppercase font-black tracking-[0.2em] mb-1 text-center text-center">Email 邮箱</p>
                          <p className="text-lg md:text-xl font-bold text-emerald-100 text-center text-center">1905878535@qq.com</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-4 md:gap-6 p-8 md:p-10 bg-[#141816] rounded-[2.5rem] border border-emerald-900/10 group hover:bg-emerald-500/5 transition-all shadow-lg text-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner text-center"><MessageSquare size={32}/></div>
                        <div className="text-center">
                          <p className="text-[10px] md:text-[12px] text-emerald-300/40 uppercase font-black tracking-[0.2em] mb-1 text-center text-center text-center">WeChat 微信</p>
                          <p className="text-lg md:text-xl font-bold text-emerald-100 text-center text-center text-center">15800955272</p>
                        </div>
                      </div>
                   </div>
                 </div>
              </div>
            )}
          </main>

          <footer className="border-t border-white/5 py-12 md:py-16 relative z-10 bg-[#0d0f0e]/50 text-center md:text-left text-emerald-50 text-left">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
              <div className="flex items-center gap-4 text-left">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-emerald-600 text-white text-xs font-black flex items-center justify-center rounded-full shadow-lg shadow-emerald-500/10 text-left">H</div>
                <span className="text-[9px] md:text-[10px] font-mono text-emerald-200/20 uppercase tracking-[0.3em] text-left">HE YU FEI // Portfolio 2026</span>
              </div>
              <div className="flex gap-6 md:gap-10 items-center opacity-50 text-left">
                 <a href="./resume.pdf" download className="text-[9px] md:text-[10px] font-black hover:text-emerald-400 transition-colors tracking-[0.2em] uppercase underline decoration-emerald-500/50 underline-offset-4 text-left">Resume</a>
                 <a href="#" className="text-[9px] md:text-[10px] font-black hover:text-emerald-400 transition-colors tracking-[0.2em] uppercase text-left">ArtStation</a>
                 <a href="#" className="text-[9px] md:text-[10px] font-black hover:text-emerald-400 transition-colors tracking-[0.2em] uppercase text-left">LinkedIn</a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300 text-emerald-50 text-center" onClick={() => setLightboxImage(null)}>
          <div className="relative max-w-5xl w-full text-center">
            <img src={lightboxImage.url} className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] border-4 border-white/5 shadow-2xl text-center" alt="Preview" />
            <div className="absolute -bottom-10 md:-bottom-14 left-0 right-0 text-center text-center text-center">
              <span className="text-emerald-200 font-black tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-xs flex items-center justify-center gap-3 text-center">
                 <Star size={14} fill="currentColor" /> {lightboxImage.title} <Star size={14} fill="currentColor" />
              </span>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(16, 185, 129, 0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.3); border-radius: 10px; transition: background 0.3s ease; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.6); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .bg-soft-stars-green {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%2310b981' opacity='0.1'/%3E%3C/svg%3E");
          background-size: 150px 150px;
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.02); } }
      ` }} />
    </div>
  );
};

export default App;
