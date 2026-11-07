import React from "react";
import { AlertCircleIcon, AlertOctagonIcon, AlertTriangleIcon, InfoIcon } from "lucide-react";
import type { Severity } from "../../types/finding";
import { severityLabels } from "../../utils/findings";
import { Badge } from "../ui/Badge";
import type { BadgeTone } from "../ui/Badge";

const config: Record<Severity, {tone: BadgeTone;Icon: typeof InfoIcon;}> = {
  critical: { tone: "danger", Icon: AlertOctagonIcon },
  high: { tone: "warning", Icon: AlertTriangleIcon },
  medium: { tone: "info", Icon: AlertCircleIcon },
  low: { tone: "neutral", Icon: InfoIcon }
};

export function SeverityBadge({ severity }: {severity: Severity;}) {
  const { tone, Icon } = config[severity];
  return (
    <Badge tone={tone} icon={<Icon aria-hidden="true" className="h-3.5 w-3.5" />}>
      <span className="sr-only">Severity: </span>
      {severityLabels[severity]}
    </Badge>);

}