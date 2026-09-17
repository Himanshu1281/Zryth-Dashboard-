const BehaviorGreetings = () => {
  return (
    <>

{/* SIDEBAR (Fixed w-64, dark bg-[#101012] with border-r border-white/10) */}
<aside className="fixed left-0 top-0 h-full w-64 bg-[#101012] border-r border-white/10 z-50 flex flex-col justify-between select-none">
<div className="flex flex-col">
{/* Top Brand Header */}
<div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.06]">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20">
<span className="material-symbols-outlined text-[20px]">graphic_eq</span>
</div>
<div className="flex flex-col">
<span className="font-bold text-base leading-tight tracking-tight text-white">Zryth</span>
<span className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase">MAYA AI VOICE</span>
</div>
</div>
<span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.06] text-emerald-400 border border-emerald-500/20">v2.4</span>
</div>
{/* Navigation Section 1: PLATFORM */}
<div className="px-3 pt-5">
<span className="uppercase text-[10px] tracking-wider text-neutral-500 font-semibold mb-2 px-3 block">PLATFORM</span>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">dashboard</span>
<span className="font-medium text-sm">Analytics</span>
</a>
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">phone_in_talk</span>
<span className="font-medium text-sm">All Calls</span>
</a>
{/* Active state */}
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md shadow-blue-600/20" href="#">
<span className="material-symbols-outlined text-[19px]">tune</span>
<span className="font-medium text-sm">Behavior &amp; Greetings</span>
</a>
</nav>
</div>
{/* Navigation Section 2: KNOWLEDGE & DATA */}
<div className="px-3 pt-4">
<span className="uppercase text-[10px] tracking-wider text-neutral-500 font-semibold mt-2 mb-2 px-3 block">KNOWLEDGE &amp; DATA</span>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">menu_book</span>
<span className="font-medium text-sm">Knowledge Base</span>
</a>
</nav>
</div>
{/* Navigation Section 3: SYSTEM */}
<div className="px-3 pt-4">
<span className="uppercase text-[10px] tracking-wider text-neutral-500 font-semibold mt-2 mb-2 px-3 block">SYSTEM</span>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">settings</span>
<span className="font-medium text-sm">Settings</span>
</a>
</nav>
</div>
</div>
{/* Sidebar Footer */}
<div className="p-3 border-t border-white/[0.06] flex flex-col gap-1">
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">help_outline</span>
<span className="font-medium text-sm">Support</span>
</a>
<a className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors" href="#">
<span className="material-symbols-outlined text-[19px]">logout</span>
<span className="font-medium text-sm">Sign Out</span>
</a>
<div className="mt-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
</span>
<span className="font-mono text-[11px] text-neutral-300">Telemetry Stream: OK</span>
</div>
</div>
</aside>
{/* MAIN WRAPPER (Offset by w-64) */}
<div className="pl-64 flex flex-col min-h-screen">
{/* TOP BAR */}
<header className="h-16 border-b border-white/10 bg-[#111113]/90 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
{/* Search Input */}
<div className="flex items-center gap-3 flex-1 max-w-md">

</div><div className="hidden lg:flex items-center justify-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-neutral-400"><span className="">Workspace</span><span className="text-neutral-600">/</span><span className="text-neutral-200 font-medium">Agent Behavior Config</span><span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1"></span></div>
{/* Right Actions */}
<div className="flex items-center gap-3">
{/* Workspace Breadcrumb Indicator */}



<button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition-all" id="saveChangesBtn">
<span className="material-symbols-outlined text-[16px]">save</span>
<span className="">Save Changes</span>
</button>
{/* User Avatar */}
<div className="pl-2 border-l border-white/10 flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-semibold text-xs">
            EO
          </div>
</div>
</div>
</header>
{/* TOAST NOTIFICATION */}
<div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-neutral-900 border border-emerald-500/30 text-white px-4 py-3 rounded-xl shadow-2xl translate-y-20 opacity-0" id="toast">
<span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
<div>
<p className="text-xs font-semibold text-white" id="toastTitle">Simulation Initialized</p>
<p className="text-[11px] text-neutral-400 font-mono" id="toastDesc">Dialing test SIP trunk via browser WebRTC channel...</p>
</div>
</div>
{/* MAIN CONTENT */}
<main className="flex-1 px-8 py-7 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
{/* Top Title & Action Bar */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">
<span className="material-symbols-outlined text-[15px]">record_voice_over</span>
<span className="">Deterministic Prompt Topology</span>
</div>
<h1 className="text-2xl font-bold text-white tracking-tight">Agent Utterances &amp; Behavior Rules</h1>
<p className="text-sm text-neutral-400 mt-1 max-w-3xl">
            Configure the initial greeting utterances and behavioral directives dictating what your AI voice agent executes during live customer interactions.
          </p>
</div>
<div className="flex items-center gap-3">


</div>
</div>
{/* QUICK INLINE ADDITION DRAWER / CREATION BAR */}
<div className="bg-[#16161a] border border-white/10 rounded-xl p-4 transition-all" id="quickAddCard">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-blue-400 text-[18px]">add_circle</span>
<span className="text-xs font-semibold text-white uppercase tracking-wider">Quick Inline Row Creator</span>
<span className="text-[11px] text-neutral-400 font-mono ml-2">Directly inject or draft a new trigger scenario</span>
</div>
<span className="text-[11px] text-neutral-500 font-mono">Press Add Rule to append to table</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
{/* Col 1: Trigger / Scenario (3 cols) */}
<div className="md:col-span-3 flex flex-col gap-1.5"><div className="flex items-center justify-between"><label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">Trigger / Agent Tool</label></div><div className="relative"><select className="w-full bg-[#1e1e24] border border-white/10 focus:border-blue-500 text-xs rounded-lg px-3 py-2 text-white focus:outline-none transition-colors cursor-pointer appearance-none pr-8" id="newTriggerInput"><option className="bg-[#1a1a20] text-white" value="Tool Calling: Knowledge Base Search">Tool Calling: Knowledge Base Search</option><option className="bg-[#1a1a20] text-white" value="Tool Calling: Send SMS / Webhook">Tool Calling: Send SMS / Webhook</option><option className="bg-[#1a1a20] text-white" value="Tool Calling: Warm Transfer / SIP">Tool Calling: Warm Transfer / SIP</option><option className="bg-[#1a1a20] text-white" value="Tool Calling: Check Availability / Calendar">Tool Calling: Check Availability / Calendar</option><option className="bg-[#1a1a20] text-white" value="Custom Trigger / Intent">Custom Trigger / Intent</option></select><div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400"><span className="material-symbols-outlined text-[18px]">expand_more</span></div></div><div className="flex items-center gap-1.5 mt-1"></div></div>
{/* Col 2: Spoken Utterance (4 cols) */}
<div className="md:col-span-4 flex flex-col gap-1.5">
<div className="flex items-center justify-between">
<label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">First Spoken Utterance</label>
<div className="flex gap-1">
<button className="text-[10px] text-blue-400 hover:bg-blue-500/20 px-1 rounded transition-colors font-mono" onClick={() => {}} type="button">{"{customer_name}"}</button>
<button className="text-[10px] text-blue-400 hover:bg-blue-500/20 px-1 rounded transition-colors font-mono" onClick={() => {}} type="button">{"{agent_name}"}</button>
</div>
</div>
<textarea className="w-full bg-[#1e1e24] border border-white/10 focus:border-blue-500 text-xs rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none resize-none leading-relaxed transition-colors" id="newUtteranceInput" placeholder="Exact first sentence the agent verbalizes immediately..." rows={2}></textarea>
</div>
{/* Col 3: Agent Behavior (4 cols) */}
<div className="md:col-span-4 flex flex-col gap-1.5">
<label className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">Agent Behavior / What the Agent Will Do</label>
<textarea className="w-full bg-[#1e1e24] border border-white/10 focus:border-blue-500 text-xs rounded-lg px-3 py-2 text-white placeholder-neutral-500 focus:outline-none resize-none leading-relaxed transition-colors" id="newBehaviorInput" placeholder="Directives, constraints, knowledge retrieval, and boundary rules..." rows={2}></textarea>
</div>
{/* Col 4: Submit Button (1 col) */}
<div className="md:col-span-1 flex flex-col justify-end pt-5">
<button className="w-full h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-md shadow-blue-600/20 transition-all" id="addRuleSubmitBtn">
<span className="material-symbols-outlined text-[18px]">add</span>
<span className="hidden md:inline">Add</span>
</button>
</div>
</div>
</div>
{/* ENTERPRISE DATA TABLE */}
<div className="bg-[#141417] border border-white/10 rounded-xl overflow-hidden shadow-xl">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse" id="behaviorRulesTable">
<thead>
<tr className="border-b border-white/10 bg-[#19191e] text-[11px] font-mono uppercase text-neutral-400 tracking-wider">
<th className="py-3 px-4 font-semibold w-12 text-center">#</th>
<th className="py-3 px-4 font-semibold w-56">Trigger / Scenario</th>
<th className="py-3 px-4 font-semibold min-w-[320px]">First Spoken Utterance</th>
<th className="py-3 px-4 font-semibold min-w-[340px]">Agent Behavior &amp; Directives</th>
<th className="py-3 px-4 font-semibold w-24 text-center">Status</th>
<th className="py-3 px-4 font-semibold w-28 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-white/[0.06] text-xs" id="tableBody">
{/* ROW 1: Initial Greeting */}
<tr className="hover:bg-white/[0.02] transition-colors group" data-row-id="1">
<td className="py-4 px-4 text-center text-neutral-500 font-mono text-[11px]">01</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 font-semibold text-white text-xs">
<span className="material-symbols-outlined text-blue-400 text-[16px]">waving_hand</span>
<span className="scenario-name">Initial Greeting (Inbound)</span>
</div>
<span className="text-[11px] font-mono text-neutral-400">Default Call Trigger</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 w-max mt-1">
                      System Priority #1
                    </span>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<div className="relative">
<textarea className="rule-utterance-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Hello! Thank you for calling Zryth Realty. My name is Maya, your AI assistant. How can I assist you with your property inquiry or appointment today?</textarea>
</div>
<div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
<div className="flex items-center gap-1">
<span className="text-[10px] text-neutral-400">Variables:</span>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{customer_name}">{"{customer_name}"}</button>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{agent_alias}">{"{agent_alias}"}</button>
</div>
<span className="char-count text-neutral-400">138 chars • ~7.2s</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<textarea className="rule-behavior-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Greet caller warmly. Inquire whether caller is looking for residential sales, commercial leasing, or urgent maintenance. Limit speech to &lt;2 sentences per conversational turn.</textarea>
<div className="flex items-center gap-2">
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Tone: Friendly &amp; Concise</span>
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">Max Latency: 320ms</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top text-center">
<button className="toggle-status relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none bg-neutral-700" data-active="false" type="button">
<span className="inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow-sm translate-x-0.5"></span>
</button>
</td>
<td className="py-4 px-4 align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="play-preview-btn p-1.5 rounded-lg hover:bg-blue-500/10 text-neutral-400 hover:text-blue-400 transition-colors" title="Preview Audio Utterance">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="copy-row-btn p-1.5 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 transition-colors" title="Duplicate Rule">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="delete-row-btn p-1.5 rounded-lg hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete Rule">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* ROW 2: Property Inquiry */}
<tr className="hover:bg-white/[0.02] transition-colors group" data-row-id="2">
<td className="py-4 px-4 text-center text-neutral-500 font-mono text-[11px]">02</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 font-semibold text-white text-xs">
<span className="material-symbols-outlined text-purple-400 text-[16px]">apartment</span>
<span className="scenario-name">Real Estate Property Inquiry</span>
</div>
<span className="text-[11px] font-mono text-neutral-400">Intent: Listing Search</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20 w-max mt-1">
                      RAG Vector Ingestion
                    </span>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<div className="relative">
<textarea className="rule-utterance-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>I can certainly pull up our current MLS listings for you. Are you looking in Downtown, Westside, or the Financial District?</textarea>
</div>
<div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
<div className="flex items-center gap-1">
<span className="text-[10px] text-neutral-400">Variables:</span>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{preferred_city}">{"{preferred_city}"}</button>
</div>
<span className="char-count text-neutral-400">127 chars • ~6.5s</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<textarea className="rule-behavior-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Query Knowledge Base embeddings for verified available units. Extract bedroom count, budget ceiling, and move-in timeline. Never state firm mortgage estimates without a licensed broker disclaimer.</textarea>
<div className="flex items-center gap-2">
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Knowledge Base Attached</span>
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">Guardrail: Strict</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top text-center">
<button className="toggle-status relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none" data-active="true" type="button">
<span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow-sm"></span>
</button>
</td>
<td className="py-4 px-4 align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="play-preview-btn p-1.5 rounded-lg hover:bg-blue-500/10 text-neutral-400 hover:text-blue-400 transition-colors" title="Preview Audio Utterance">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="copy-row-btn p-1.5 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 transition-colors" title="Duplicate Rule">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="delete-row-btn p-1.5 rounded-lg hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete Rule">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* ROW 3: Pricing & Quotation */}
<tr className="hover:bg-white/[0.02] transition-colors group" data-row-id="3">
<td className="py-4 px-4 text-center text-neutral-500 font-mono text-[11px]">03</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 font-semibold text-white text-xs">
<span className="material-symbols-outlined text-emerald-400 text-[16px]">attach_money</span>
<span className="scenario-name">Pricing &amp; Quotation</span>
</div>
<span className="text-[11px] font-mono text-neutral-400">Intent: Cost Inquiry</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 w-max mt-1">
                      Compliance Checked
                    </span>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<div className="relative">
<textarea className="rule-utterance-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Our 1-bedroom units in {"{property_name}"} begin at $2,450 per month, inclusive of parking and fitness club access.</textarea>
</div>
<div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
<div className="flex items-center gap-1">
<span className="text-[10px] text-neutral-400">Variables:</span>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{property_name}">{"{property_name}"}</button>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{price_starting}">{"{price_starting}"}</button>
</div>
<span className="char-count text-neutral-400">114 chars • ~5.8s</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<textarea className="rule-behavior-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Quote price range solely from verified catalog. Ask if they want a breakdown sent via SMS or email. If caller requests discounts, redirect to leasing director schedule.</textarea>
<div className="flex items-center gap-2">
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">Action: SMS Dispatch Trigger</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top text-center">
<button className="toggle-status relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none" data-active="true" type="button">
<span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow-sm"></span>
</button>
</td>
<td className="py-4 px-4 align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="play-preview-btn p-1.5 rounded-lg hover:bg-blue-500/10 text-neutral-400 hover:text-blue-400 transition-colors" title="Preview Audio Utterance">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="copy-row-btn p-1.5 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 transition-colors" title="Duplicate Rule">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="delete-row-btn p-1.5 rounded-lg hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete Rule">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* ROW 4: After-Hours Voicemail */}
<tr className="hover:bg-white/[0.02] transition-colors group" data-row-id="4">
<td className="py-4 px-4 text-center text-neutral-500 font-mono text-[11px]">04</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 font-semibold text-white text-xs">
<span className="material-symbols-outlined text-amber-400 text-[16px]">nightlight</span>
<span className="scenario-name">After-Hours Voicemail</span>
</div>
<span className="text-[11px] font-mono text-neutral-400">Schedule: 19:00 - 08:00</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20 w-max mt-1">
                      Time-Conditioned
                    </span>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<div className="relative">
<textarea className="rule-utterance-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>You have reached Zryth Realty after hours. I'm Maya, available 24/7 to record maintenance emergencies or book tomorrow's tours. What is your property address?</textarea>
</div>
<div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
<div className="flex items-center gap-1">
<span className="text-[10px] text-neutral-400">Variables:</span>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{current_time_of_day}">{"{current_time_of_day}"}</button>
</div>
<span className="char-count text-neutral-400">165 chars • ~8.4s</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<textarea className="rule-behavior-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Determine if call is urgent maintenance (flooding, HVAC failure, security lock) or standard inquiry. If urgent, dispatch SMS payload to on-call supervisor immediately.</textarea>
<div className="flex items-center gap-2">
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Urgent Dispatch Webhook</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top text-center">
<button className="toggle-status relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none" data-active="true" type="button">
<span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow-sm"></span>
</button>
</td>
<td className="py-4 px-4 align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="play-preview-btn p-1.5 rounded-lg hover:bg-blue-500/10 text-neutral-400 hover:text-blue-400 transition-colors" title="Preview Audio Utterance">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="copy-row-btn p-1.5 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 transition-colors" title="Duplicate Rule">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="delete-row-btn p-1.5 rounded-lg hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete Rule">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
{/* ROW 5: Escalation to Human */}
<tr className="hover:bg-white/[0.02] transition-colors group" data-row-id="5">
<td className="py-4 px-4 text-center text-neutral-500 font-mono text-[11px]">05</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 font-semibold text-white text-xs">
<span className="material-symbols-outlined text-rose-400 text-[16px]">support_agent</span>
<span className="scenario-name">Escalation to Human</span>
</div>
<span className="text-[11px] font-mono text-neutral-400">Trigger: Sentiment / Override</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 w-max mt-1">
                      Live SIP Transfer
                    </span>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<div className="relative">
<textarea className="rule-utterance-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>I understand completely. Let me transfer you directly to our senior leasing supervisor right now. Please hold for just a few seconds.</textarea>
</div>
<div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
<div className="flex items-center gap-1">
<span className="text-[10px] text-neutral-400">Variables:</span>
<button className="var-btn px-1.5 py-0.5 rounded bg-white/[0.05] hover:bg-blue-500/20 text-blue-400 text-[10px] transition-colors" data-var="{supervisor_extension}">{"{supervisor_extension}"}</button>
</div>
<span className="char-count text-neutral-400">135 chars • ~7.0s</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top">
<div className="flex flex-col gap-2">
<textarea className="rule-behavior-input w-full bg-[#1a1a20] hover:bg-[#1f1f26] focus:bg-[#1f1f26] border border-white/10 focus:border-blue-500 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none leading-relaxed transition-all resize-y" rows={2}>Trigger warm SIP referral to queue +1-800-555-0199. Send full conversation summary, customer phone number, and identified intent to operator console.</textarea>
<div className="flex items-center gap-2">
<span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">SIP Trunk Hand-off</span>
</div>
</div>
</td>
<td className="py-4 px-4 align-top text-center">
<button className="toggle-status relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none" data-active="true" type="button">
<span className="translate-x-4 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-0.5 ml-0.5 shadow-sm"></span>
</button>
</td>
<td className="py-4 px-4 align-top text-right">
<div className="flex items-center justify-end gap-1">
<button className="play-preview-btn p-1.5 rounded-lg hover:bg-blue-500/10 text-neutral-400 hover:text-blue-400 transition-colors" title="Preview Audio Utterance">
<span className="material-symbols-outlined text-[18px]">volume_up</span>
</button>
<button className="copy-row-btn p-1.5 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-200 transition-colors" title="Duplicate Rule">
<span className="material-symbols-outlined text-[18px]">content_copy</span>
</button>
<button className="delete-row-btn p-1.5 rounded-lg hover:bg-rose-500/10 text-neutral-400 hover:text-rose-400 transition-colors" title="Delete Rule">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
{/* Table Footer / Stats bar */}
<div className="px-5 py-3 border-t border-white/10 bg-[#16161a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
<div className="flex items-center gap-2 font-mono text-[11px]">
<span className="material-symbols-outlined text-[16px] text-emerald-400">verified_user</span>
<span className="">Deterministic engine: 100% test coverage passed</span>
</div>
<div className="flex items-center gap-4">
<span className="font-mono text-[11px]">All changes auto-validated against Zryth Policy Schema v2.4</span>
<button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1" id="addBottomBtn">


</button>
</div>
</div>
</div>
</main>
</div>
{/* INTERACTION JAVASCRIPT */}




    </>
  );
};

export default BehaviorGreetings;
