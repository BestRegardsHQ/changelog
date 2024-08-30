import { Button, Stack } from "@mantine/core";
import { motion } from "framer-motion";
import useTimelineStore from "lib/state/use-timeline-store";
import { useRouter } from "next/router";

const TimeSelectionTabs = () => {
  const router = useRouter();
  const buttonGroup: Array<"weeks" | "months" | "years"> = ["weeks", "months", "years"];

  const timeline = useTimelineStore();

  const changeTimelineView = (view: "weeks" | "months" | "years") => {
    if (
      (router.pathname.includes("/page/") || router.pathname.includes("/years/")) &&
      timeline.view !== view
    ) {
      router.push(`/page/0#${view}`);
      timeline.setView(view);
    } else if (timeline.view === view) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      if (timeline.view !== view) {
        router.push(`#${view}`);
        timeline.setView(view);
      }
    }
  };

  return (
    <motion.div>
      <Stack>
        <Button.Group>
          {buttonGroup.map((view, index) => (
            <Button
              key={view}
              h="full"
              size="md"
              style={
                timeline.view === view
                  ? {
                      background: "transparent",
                      color: "#0D131B",
                      fontWeight: "semiBold",
                    }
                  : {}
              }
              // onClick={() => timeline.setView(view)}
              onClick={() => changeTimelineView(view)}
              // isActive={timeline.view === view}
              sx={{
                position: "relative",
                textTransform: "capitalize",
                ":hover": {
                  color: "#0D131B",
                },
              }}
            >
              {timeline.view === view && (
                <motion.div
                  layoutId="tab-selector"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#FFFFFF",
                    borderRadius: "9999px",
                    boxShadow: "0px 0.636364px 2.24px rgba(33, 40, 54, 0.16)",
                    zIndex: 5,
                  }}
                  transition={{ type: "linear", duration: 0.3 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 10 }}>{view}</span>
            </Button>
          ))}
        </Button.Group>
      </Stack>
    </motion.div>
  );
};

export default TimeSelectionTabs;
