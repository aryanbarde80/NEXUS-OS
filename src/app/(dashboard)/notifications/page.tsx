"use client";

import { useMemo, useState } from "react";
import { Bell, Check, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

const filters = [
  { label: "All", types: [] },
  { label: "Tasks", types: ["task_assigned", "task_completed"] },
  { label: "AI", types: ["agent_completed"] },
  { label: "System", types: ["system"] },
  { label: "Achievements", types: ["achievement_unlocked"] },
];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const notifications = useAppStore((state) => state.notifications);
  const markNotificationRead = useAppStore((state) => state.markNotificationRead);
  const markAllNotificationsRead = useAppStore((state) => state.markAllNotificationsRead);
  const clearNotifications = useAppStore((state) => state.clearNotifications);

  const filtered = useMemo(() => {
    const filter = filters.find((item) => item.label === activeFilter);
    if (!filter || filter.types.length === 0) {
      return notifications;
    }

    return notifications.filter((notification) => filter.types.includes(notification.type));
  }, [activeFilter, notifications]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">A real inbox for workspace activity, not a disconnected static list.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllNotificationsRead}>
            <Check className="mr-2 h-4 w-4" /> Mark all read
          </Button>
          <Button variant="outline" size="sm" onClick={clearNotifications}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear all
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.label}
            variant={filter.label === activeFilter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter.label)}
          >
            {filter.label}
            {filter.label === "All" && unreadCount > 0 ? (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            ) : null}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length ? (
          filtered.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:border-violet-500/50 ${
                notification.read ? "" : "border-violet-500/30 bg-violet-500/5"
              }`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.read ? "bg-muted" : "bg-violet-500"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <Badge variant="outline">{notification.type.replace("_", " ")}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.content}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center text-muted-foreground">
              <Bell className="mx-auto mb-3 h-10 w-10 opacity-40" />
              <p>No notifications in this filter yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
