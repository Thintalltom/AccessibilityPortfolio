/** Colour pairs reviewed for the portfolio. Ratios are calculated at runtime from these hex values. */
export const contrastPairs: {use: string;fg: string;fgToken: string;bg: string;bgToken: string;required: number;}[] = [
{ use: "Body text on page", fg: "#F3F5F9", fgToken: "text-primary", bg: "#0B0D12", bgToken: "bg", required: 4.5 },
{ use: "Secondary text on cards", fg: "#B4BDCC", fgToken: "text-secondary", bg: "#151B26", bgToken: "surface", required: 4.5 },
{ use: "Muted metadata on cards", fg: "#929DB0", fgToken: "text-muted", bg: "#151B26", bgToken: "surface", required: 4.5 },
{ use: "Muted text on hovered cards", fg: "#929DB0", fgToken: "text-muted", bg: "#1B2433", bgToken: "surface-hover", required: 4.5 },
{ use: "Accent links on page", fg: "#A78BFA", fgToken: "accent", bg: "#0B0D12", bgToken: "bg", required: 4.5 },
{ use: "Accent links on cards", fg: "#A78BFA", fgToken: "accent", bg: "#151B26", bgToken: "surface", required: 4.5 },
{ use: "Primary button label", fg: "#0B0D12", fgToken: "text-inverse", bg: "#A78BFA", bgToken: "accent", required: 4.5 },
{ use: "Danger text on cards", fg: "#FDA4AF", fgToken: "danger", bg: "#151B26", bgToken: "surface", required: 4.5 },
{ use: "Focus ring against page", fg: "#67E8F9", fgToken: "accent-secondary", bg: "#0B0D12", bgToken: "bg", required: 3 },
{ use: "Input boundary (original token)", fg: "#46536A", fgToken: "border-strong", bg: "#0B0D12", bgToken: "bg", required: 3 },
{ use: "Input boundary (adjusted token)", fg: "#6B7890", fgToken: "border-input", bg: "#10141C", bgToken: "surface-muted", required: 3 }];