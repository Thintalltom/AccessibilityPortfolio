import React from "react";
import { CheckCircle2Icon, CircleDotIcon, MinusCircleIcon, WrenchIcon } from "lucide-react";
import type { FindingStatus } from "../../types/finding";
import { statusLabels } from "../../utils/findings";
import { Badge } from "../ui/Badge";
import type { BadgeTone } from "../ui/Badge";

const config: Record<FindingStatus, {tone: BadgeTone;Icon: typeof WrenchIcon;}> = {
  open: { tone: "danger", Icon: CircleDotIcon },
  fixed: { tone: "cyan", Icon: WrenchIcon },
  retested: { tone: "success", Icon: CheckCircle2Icon },
  "not-reproduced": { tone: "neutral", Icon: MinusCircleIcon }
};

export function StatusBadge({ status }: {status: FindingStatus;}) {
  const { tone, Icon } = config[status];
  return (
    <Badge tone={tone} icon={<Icon aria-hidden="true" className="h-3.5 w-3.5" />}>
      <span className="sr-only">Status: </span>
      {statusLabels[status]}
    </Badge>);

}