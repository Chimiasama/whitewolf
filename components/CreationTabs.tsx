import React, { useId, useEffect, useRef } from "react";
export function CreationTabs({
  items,
  active,
  onChange,
  children,
}: {
  items: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
  children: (id: string) => React.ReactNode;
}) {
  const uid = useId();
  const stripRef=useRef<HTMLDivElement>(null);
  const selected = items.some((i) => i.id === active) ? active : items[0]?.id;
  useEffect(()=>{
    const strip=stripRef.current;
    const reveal=()=>{const button=document.getElementById(`${uid}-${selected}`);if(!strip||!button)return;const b=button.getBoundingClientRect(),s=strip.getBoundingClientRect();if(b.right>s.right)strip.scrollLeft+=b.right-s.right+2;else if(b.left<s.left)strip.scrollLeft-=s.left-b.left+2;};
    reveal();if(!strip)return;const observer=new ResizeObserver(reveal);observer.observe(strip);return()=>observer.disconnect();
  },[selected,uid]);
  return (
    <section className="creation-tabs space-y-5">
      <div
        ref={stripRef}
        role="tablist"
        aria-label="Seções da etapa"
        className="flex flex-wrap gap-2 border-b border-gray-700 pb-3"
      >
        {items.map((item, i) => (
          <button
            type="button"
            key={item.id}
            id={`${uid}-${item.id}`}
            role="tab"
            aria-selected={selected === item.id}
            aria-controls={`${uid}-panel`}
            tabIndex={selected === item.id ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? items.length - 1
                      : (i + (e.key === "ArrowRight" ? 1 : -1) + items.length) %
                        items.length;
                onChange(items[next].id);
                document.getElementById(`${uid}-${items[next].id}`)?.focus();
              }
            }}
            className={`rounded-lg px-4 py-2 text-sm ${selected === item.id ? "bg-gray-700 text-white" : "bg-gray-950 text-gray-300 hover:bg-gray-800"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-${selected}`}
      >
        {children(selected)}
      </div>
    </section>
  );
}
