import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const GuideButton = () => (
  <Button variant="ghost" size="sm" asChild className="shrink-0">
    <Link to="/guide">guide</Link>
  </Button>
);