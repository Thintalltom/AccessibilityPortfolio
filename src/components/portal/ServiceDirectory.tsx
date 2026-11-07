import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertCircleIcon, Loader2Icon, SearchXIcon } from "lucide-react";
import type { DemoVariant, ServiceCategory } from "../../types/portal";
import { portalServices } from "../../data/portal";
import { cn } from "../../utils/cn";

type ServiceDirectoryProps = {variant: DemoVariant;onBook?: (serviceId: string) => void;};

const categories: ServiceCategory[] = ["Advising", "Wellbeing", "Academic", "Administration"];

export function ServiceDirectory({ variant, onBook }: ServiceDirectoryProps) {
  const isFixed = variant === "fixed";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [loadState, setLoadState] = useState<"loading" | "error" | "ready">("loading");
  const [attempt, setAttempt] = useState(0);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const failRef = useRef(simulateFailure);
  failRef.current = simulateFailure;
  const searchId = useId();
  const categoryId = useId();
  const failId = useId();

  useEffect(() => {
    setLoadState("loading");
    const timer = window.setTimeout(() => setLoadState(failRef.current ? "error" : "ready"), 600);
    return () => window.clearTimeout(timer);
  }, [attempt]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portalServices.filter(
      (s) =>
      (category === "all" || s.category === category) && (
      !q || s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q))
    );
  }, [query, category]);

  // Intentional defect ALD-004 in the flawed build: focus outlines suppressed.
  const noFocus = !isFixed && "focus:outline-none focus-visible:outline-none";
  const control = cn("block min-h-[42px] w-full rounded-md border border-portal-muted bg-white px-3 text-[15px] text-portal-ink", noFocus);
  const smallBtn = cn("min-h-[38px] rounded-md px-3 text-sm font-semibold", noFocus);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2 rounded-md border border-dashed border-portal-muted bg-portal-subtle px-3 py-2 text-sm text-portal-muted">
        <input
          id={failId}
          type="checkbox"
          checked={simulateFailure}
          onChange={(e) => {
            setSimulateFailure(e.target.checked);
            setAttempt((a) => a + 1);
          }}
          className="h-4 w-4" />
        
        <label htmlFor={failId}>Demo control: simulate a failed request</label>
      </div>

      {isFixed ? <h3 className="text-xl font-semibold">Find a service</h3> : <div className="text-xl font-semibold">Find a service</div>}

      <div className="mt-4 grid gap-3 sm:grid-cols-[2fr_1fr]">
        <div>
          {isFixed &&
          <label htmlFor={searchId} className="mb-1 block text-sm font-semibold">
              Search services
            </label>
          }
          <input
            id={isFixed ? searchId : undefined}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isFixed ? "Service or department" : "Search…"}
            className={cn(control, "placeholder:text-portal-muted")} />
          
        </div>
        <div>
          {isFixed &&
          <label htmlFor={categoryId} className="mb-1 block text-sm font-semibold">
              Category
            </label>
          }
          <select
            id={isFixed ? categoryId : undefined}
            value={category}
            onChange={(e) => setCategory(e.target.value as ServiceCategory | "all")}
            className={control}>
            
            <option value="all">{isFixed ? "All categories" : "All"}</option>
            {categories.map((c) =>
            <option key={c} value={c}>
                {c}
              </option>
            )}
          </select>
        </div>
      </div>

      <div className="mt-5">
        {loadState === "loading" &&
        <p {...isFixed ? { role: "status" } : {}} className="flex items-center gap-2 py-8 text-[15px] text-portal-muted">
            <Loader2Icon aria-hidden="true" className="h-5 w-5 animate-spin" /> Loading services…
          </p>
        }

        {loadState === "error" &&
        <div {...isFixed ? { role: "alert" } : {}} className="rounded-md border border-portal-danger bg-white p-4">
            <p className="flex items-center gap-2 font-semibold text-portal-danger">
              <AlertCircleIcon aria-hidden="true" className="h-5 w-5" /> We couldn’t load services.
            </p>
            <p className="mt-1 text-[15px] text-portal-muted">The request failed. Untick the demo control and try again.</p>
            <button type="button" onClick={() => setAttempt((a) => a + 1)} className={cn(smallBtn, "mt-3 bg-portal-brand text-white hover:bg-portal-brand-hover")}>
              Retry
            </button>
          </div>
        }

        {loadState === "ready" &&
        <>
            {/* Intentional defect ALD-006 in the flawed build: no status role on the count. */}
            <p {...isFixed ? { role: "status" } : {}} className="text-sm text-portal-muted">
              {results.length} {results.length === 1 ? "service" : "services"} found
            </p>
            {results.length === 0 ?
          <div className="mt-3 flex flex-col items-start gap-3 rounded-md border border-portal-line p-5">
                <p className="flex items-center gap-2 font-semibold">
                  <SearchXIcon aria-hidden="true" className="h-5 w-5 text-portal-muted" /> No services match your search.
                </p>
                <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className={cn(smallBtn, "border border-portal-muted hover:bg-portal-subtle")}>
              
                  Clear search
                </button>
              </div> :

          <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {results.map((service) => {
              const detailsId = `${searchId}-${service.id}-details`;
              const open = expanded === service.id;
              return (
                <li key={service.id} className="flex flex-col rounded-lg border border-portal-line p-4">
                      {isFixed ?
                  <h4 className="font-semibold">{service.name}</h4> :

                  <div className="font-semibold">{service.name}</div>
                  }
                      <p className="mt-0.5 text-sm text-portal-muted">
                        {service.department} · {service.format} · {service.durationMins} min
                      </p>
                      {isFixed &&
                  <p id={detailsId} hidden={!open} className="mt-2 text-[15px] text-portal-ink">
                          {service.description}
                        </p>
                  }
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                        {isFixed ?
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={detailsId}
                      onClick={() => setExpanded(open ? null : service.id)}
                      className={cn(smallBtn, "border border-portal-muted hover:bg-portal-subtle")}>
                      
                            {open ? "Hide details" : "Details"}
                            <span className="sr-only"> about {service.name}</span>
                          </button> :

                    <a href="#" onClick={(e) => e.preventDefault()} className={cn("text-sm font-semibold text-portal-brand underline", noFocus)}>
                            Read more
                          </a>
                    }
                        {onBook &&
                    <button
                      type="button"
                      onClick={() => onBook(service.id)}
                      className={cn(smallBtn, "bg-portal-brand text-white hover:bg-portal-brand-hover")}>
                      
                            Book{isFixed && <span className="sr-only"> {service.name}</span>}
                          </button>
                    }
                      </div>
                    </li>);

            })}
              </ul>
          }
          </>
        }
      </div>
    </div>);

}