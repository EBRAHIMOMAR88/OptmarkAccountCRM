import { Communication } from "@/lib/communications";
import { format, parseISO } from "date-fns";
import { Mail, Phone, Calendar, CheckCircle2, Clock, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityTimelineProps {
  communications: Communication[];
}

export function ActivityTimeline({ communications }: ActivityTimelineProps) {
  const getIcon = (type: string) => {
    switch(type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <BadgeIcon className="h-4 w-4" />;
    }
  };

  const getIconBg = (type: string) => {
    switch(type) {
      case 'email': return 'bg-blue-100 text-blue-600';
      case 'call': return 'bg-green-100 text-green-600';
      case 'meeting': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {communications.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No communications recorded yet.
        </p>
      ) : (
        <div className="space-y-3">
          {communications.map((comm, idx) => (
            <div key={comm.id} className="flex gap-3 pb-4 relative">
              {/* Timeline line */}
              {idx < communications.length - 1 && (
                <div className="absolute left-[17px] top-12 bottom-0 w-px bg-border" />
              )}
              
              {/* Timeline dot */}
              <div className={cn("h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", getIconBg(comm.type))}>
                {getIcon(comm.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{comm.subject}</p>
                    {comm.description && (
                      <p className="text-xs text-muted-foreground mt-1">{comm.description}</p>
                    )}
                  </div>
                  <Badge variant="outline" className="flex-shrink-0 capitalize text-[10px]">
                    {comm.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{format(parseISO(comm.date), "MMM d, yyyy")}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    {comm.status === 'completed' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 text-amber-500" />
                        {comm.status.replace('_', ' ')}
                      </>
                    )}
                  </span>
                  <span>•</span>
                  <span>{comm.createdBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
